import * as React from 'react';

import { cn } from '../lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-input ui:bg-background ui:px-3 ui:py-2 ui:text-sm ui:ring-offset-background ui:file:border-0 ui:file:bg-transparent ui:file:text-sm ui:file:font-medium ui:placeholder:text-muted-foreground ui:dark:border-gray-700 ui:dark:bg-gray-800 ui:dark:text-gray-100 ui:dark:placeholder:text-gray-400 ui:focus-visible:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2 ui:disabled:cursor-not-allowed ui:disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
