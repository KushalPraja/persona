import React from 'react';
import { cn } from '@/lib/utils';

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 500,
  mainCircleOpacity = 0.24,
  numCircles = 20,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)] select-none',
        className,
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 200; // Increased gap from 70 to 100
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = 'solid';

        return (
          <div
            key={i}
            className={`absolute rounded-full border border-black shadow-xl`} // Removed bg-foreground/25
            style={{
              '--i': i,
              width: `${size}px`,
              height: `${size}px`,
              opacity,
              animationDelay,
              borderStyle,
              borderWidth: '1px',
              borderColor: `var(--foreground)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) scale(1)',
            }}
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = 'Ripple';
