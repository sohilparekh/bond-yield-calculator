'use client';

import { useEffect } from 'react';
import { scan } from 'react-scan';

export function ReactScanProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize React Scan for development performance monitoring
      // This will help identify performance bottlenecks in React components
      scan({
        enabled: true,
        // Additional configuration options can be added here
      });
      console.log('React Scan initialized for development');
    }
  }, []);

  return <>{children}</>;
}
