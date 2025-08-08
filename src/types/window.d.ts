import type { Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  interface Window extends KeplrWindow {
    leap?: any;
    cosmostation?: {
      cosmos: {
        request: (args: any) => Promise<any>;
      };
      providers: {
        keplr: {
          getOfflineSigner: (chainId: string) => any;
        };
      };
    };
  }
}