'use client';

import { useEffect } from 'react';
import { scan } from 'react-scan';

export function ReactScanProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_NODE_ENV === 'development'
    ) {
      scan({
        enabled: true,
        log: true,
        showToolbar: true,
        // Additional configuration options
      });
    }
  }, []);

  return <>{children}</>;
}
