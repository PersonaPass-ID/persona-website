'use client';

// 🏥 BACKEND HEALTH MONITORING COMPONENT
// Real-time backend connectivity monitoring for PersonaPass

import { useState, useEffect, useCallback } from 'react';
import { unifiedApiClient, type HealthStatus } from '@/lib/unified-api-client';

interface HealthIndicatorProps {
  status: 'up' | 'down' | 'unknown';
  serviceName: string;
  responseTime?: number;
  error?: string;
}

const HealthIndicator: React.FC<HealthIndicatorProps> = ({ 
  status, 
  serviceName, 
  responseTime, 
  error 
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'up': return '✅';
      case 'down': return '❌';
      case 'unknown': return '⚠️';
      default: return '⚪';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'unknown': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="glass-card p-3 hover:bg-white/5 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getStatusIcon()}</span>
          <div>
            <div className={`font-medium capitalize ${getStatusColor()}`}>
              {serviceName.replace('-', ' ')}
            </div>
            {responseTime && (
              <div className="text-xs text-white/60">
                {responseTime}ms
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-sm font-medium ${getStatusColor()}`}>
          {status.toUpperCase()}
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-red-400 bg-red-500/10 rounded px-2 py-1">
          {error}
        </div>
      )}
    </div>
  );
};

interface HealthMonitorProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
  showDetails?: boolean;
  compact?: boolean;
  className?: string;
}

const HealthMonitor: React.FC<HealthMonitorProps> = ({
  autoRefresh = true,
  refreshInterval = 30000, // 30 seconds
  showDetails = true,
  compact = false,
  className = ""
}) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const checkHealth = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    try {
      const status = await unifiedApiClient.checkHealth(forceRefresh);
      setHealthStatus(status);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial health check
  useEffect(() => {
    checkHealth(true);
  }, [checkHealth]);

  // Auto-refresh health status
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      checkHealth(false); // Use cached if recent
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, checkHealth]);

  const getOverallStatusColor = () => {
    if (!healthStatus) return 'text-gray-400';
    switch (healthStatus.status) {
      case 'healthy': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'unhealthy': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getOverallStatusIcon = () => {
    if (loading) return '🔄';
    if (!healthStatus) return '⚪';
    switch (healthStatus.status) {
      case 'healthy': return '💚';
      case 'degraded': return '🟡';
      case 'unhealthy': return '🔴';
      default: return '⚪';
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-lg">{getOverallStatusIcon()}</span>
        <span className={`text-sm font-medium ${getOverallStatusColor()}`}>
          {healthStatus?.status.toUpperCase() || 'CHECKING...'}
        </span>
        {loading && <span className="text-xs text-white/60">Updating...</span>}
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getOverallStatusIcon()}</span>
          <div>
            <h3 className="text-xl font-bold text-white">Backend Status</h3>
            <p className={`text-sm font-medium ${getOverallStatusColor()}`}>
              {healthStatus?.status.toUpperCase() || 'CHECKING...'}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => checkHealth(true)}
          disabled={loading}
          className="btn-secondary text-sm px-3 py-1 disabled:opacity-50"
        >
          {loading ? '🔄 Checking...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Service Details */}
      {showDetails && healthStatus && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white/80 mb-2">Service Status:</h4>
          {Object.entries(healthStatus.services).map(([serviceName, serviceStatus]) => (
            <HealthIndicator
              key={serviceName}
              status={serviceStatus.status}
              serviceName={serviceName}
              responseTime={serviceStatus.responseTime}
              error={serviceStatus.error}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/60">
          {lastRefresh ? `Last checked: ${lastRefresh.toLocaleTimeString()}` : 'Never checked'}
        </div>
        <div className="text-xs text-white/60">
          v{healthStatus?.version || '2.0.0'}
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;