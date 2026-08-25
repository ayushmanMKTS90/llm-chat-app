'use client';

import * as React from 'react';
import { cn } from '../utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-pill px-2 py-0.5 text-caption-sm font-medium',
          {
            'bg-canvas-soft text-body': variant === 'default',
            'bg-success-soft text-success': variant === 'success',
            'bg-warning-soft text-warning': variant === 'warning',
            'bg-error-soft text-error': variant === 'error',
          },
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };