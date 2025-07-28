import { 
  Controller, 
  Get, 
  Post, 
  UseGuards, 
  Req, 
  Res, 
  Query,
  Logger,
  HttpStatus,
  UnauthorizedException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { AuthService, AuthResult } from './auth.service';
import { GitHubService } from './github.service';
import { UserEntity } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly githubService: GitHubService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github/initiate')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ 
    summary: 'Initiate GitHub OAuth flow',
    description: 'Redirects to GitHub for OAuth authorization'
  })
  @ApiQuery({ 
    name: 'redirect_uri', 
    required: false, 
    description: 'Client redirect URI after successful authentication' 
  })
  @ApiResponse({ status: 302, description: 'Redirect to GitHub OAuth' })
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 requests per minute
  initiateGitHubAuth(
    @Query('redirect_uri') redirectUri?: string,
    @Req() req?: Request,
  ) {
    // Store redirect URI in session for callback
    if (redirectUri && req?.session) {
      (req.session as any).redirectUri = redirectUri;
    }
    this.logger.log('GitHub OAuth flow initiated');
    // Passport will handle the redirect
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({ 
    summary: 'GitHub OAuth callback',
    description: 'Handles GitHub OAuth callback and issues JWT token'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Successful authentication with JWT token',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            githubUsername: { type: 'string' },
            githubDisplayName: { type: 'string' },
            githubEmail: { type: 'string' },
            githubAvatarUrl: { type: 'string' },
          },
        },
        accessToken: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Authentication failed' })
  async githubCallback(
    @Req() req: Request & { user: AuthResult },
    @Res() res: Response,
  ) {
    try {
      if (!req.user) {
        this.logger.error('No user data in GitHub callback');
        throw new UnauthorizedException('Authentication failed');
      }

      const { user, accessToken } = req.user;
      this.logger.log(`GitHub OAuth success for user: ${user.githubUsername}`);

      // Get redirect URI from session
      const redirectUri = (req.session as any)?.redirectUri;
      
      if (redirectUri) {
        // Redirect to client with token
        const url = new URL(redirectUri);
        url.searchParams.set('token', accessToken);
        url.searchParams.set('success', 'true');
        
        // Clear redirect URI from session
        delete (req.session as any).redirectUri;
        
        return res.redirect(url.toString());
      } else {
        // Return JSON response
        return res.status(HttpStatus.OK).json({
          success: true,
          user: {
            id: user.id,
            githubUsername: user.githubUsername,
            githubDisplayName: user.githubDisplayName,
            githubEmail: user.githubEmail,
            githubAvatarUrl: user.githubAvatarUrl,
          },
          accessToken,
        });
      }
    } catch (error) {
      this.logger.error(`GitHub callback failed: ${error.message}`, error.stack);
      
      const redirectUri = (req.session as any)?.redirectUri;
      if (redirectUri) {
        const url = new URL(redirectUri);
        url.searchParams.set('success', 'false');
        url.searchParams.set('error', 'authentication_failed');
        return res.redirect(url.toString());
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          success: false,
          error: 'Authentication failed',
        });
      }
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get current user profile',
    description: 'Returns the authenticated user profile'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'User profile data',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        githubUsername: { type: 'string' },
        githubDisplayName: { type: 'string' },
        githubEmail: { type: 'string' },
        githubAvatarUrl: { type: 'string' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Throttle({ default: { limit: 30, ttl: 60000 } }) // 30 requests per minute
  getProfile(@Req() req: Request & { user: UserEntity }) {
    const user = req.user;
    this.logger.debug(`Profile requested for user: ${user.githubUsername}`);

    return {
      id: user.id,
      githubUsername: user.githubUsername,
      githubDisplayName: user.githubDisplayName,
      githubEmail: user.githubEmail,
      githubAvatarUrl: user.githubAvatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Get('github/contributions')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Get GitHub contribution statistics',
    description: 'Retrieves detailed GitHub contribution data for the authenticated user'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'GitHub contribution statistics',
    schema: {
      type: 'object',
      properties: {
        totalCommits: { type: 'number' },
        totalRepositories: { type: 'number' },
        totalPullRequests: { type: 'number' },
        totalIssues: { type: 'number' },
        totalStars: { type: 'number' },
        totalForks: { type: 'number' },
        languages: { type: 'array', items: { type: 'string' } },
        contributionScore: { type: 'number' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Throttle({ default: { limit: 10, ttl: 300000 } }) // 10 requests per 5 minutes
  async getGitHubContributions(@Req() req: Request & { user: UserEntity }) {
    if (!req.user.githubAccessToken) {
      throw new UnauthorizedException('GitHub access token not available');
    }

    this.logger.log(`Fetching GitHub contributions for user: ${req.user.githubUsername}`);
    
    return this.githubService.calculateContributionStats(
      req.user.githubAccessToken,
      req.user.githubUsername,
    );
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Logout user',
    description: 'Invalidates the current JWT token (client-side action)'
  })
  @ApiResponse({ status: 200, description: 'Successful logout' })
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 requests per minute
  logout(@Req() req: Request & { user: UserEntity }) {
    this.logger.log(`User logged out: ${req.user.githubUsername}`);
    return { success: true, message: 'Logout successful' };
  }
}