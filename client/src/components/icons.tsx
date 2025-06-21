import React from 'react';

// Cool, Modern PersonaIcon - Represents AI, personality, and documentation
export const PersonaIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer ring - representing knowledge boundary */}
    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>

    {/* Core personality sphere with gradient effect */}
    <circle cx="16" cy="16" r="11" fill="currentColor" opacity="0.1"/>
    <circle cx="16" cy="16" r="8" fill="currentColor" opacity="0.2"/>
    <circle cx="16" cy="16" r="5" fill="currentColor" opacity="0.4"/>

    {/* Neural network pattern - AI intelligence */}
    <g opacity="0.8">
      {/* Central hub */}
      <circle cx="16" cy="16" r="2" fill="currentColor"/>

      {/* Connection nodes */}
      <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="22" cy="10" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="10" cy="22" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="22" cy="22" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="16" cy="8" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="8" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>
      <circle cx="24" cy="16" r="1.5" fill="currentColor" opacity="0.7"/>

      {/* Connection lines */}
      <path d="M10 10L16 16L22 10" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M10 22L16 16L22 22" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M16 8L16 16L16 24" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <path d="M8 16L16 16L24 16" stroke="currentColor" strokeWidth="1" opacity="0.4"/>

      {/* Diagonal connections */}
      <path d="M10 10L22 22" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      <path d="M22 10L10 22" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    </g>

    {/* Data flow indicators - representing documentation streams */}
    <g opacity="0.5">
      <path d="M4 16C4 16 6 14 8 16C10 18 12 14 14 16" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M18 16C20 14 22 18 24 16C26 14 28 16 28 16" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M16 4C16 4 14 6 16 8C18 10 14 12 16 14" stroke="currentColor" strokeWidth="1" fill="none"/>
      <path d="M16 18C14 20 18 22 16 24C14 26 16 28 16 28" stroke="currentColor" strokeWidth="1" fill="none"/>
    </g>
  </svg>
);

// Other custom icons used in the app
export const BrainIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 2C13.1 2 14 2.9 14 4C14 4.74 13.6 5.39 13 5.73C13.6 6.27 14 7.11 14 8C14 8.74 13.6 9.39 13 9.73C13.6 10.27 14 11.11 14 12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12C10 11.11 10.4 10.27 11 9.73C10.4 9.39 10 8.74 10 8C10 7.11 10.4 6.27 11 5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2ZM16 6C17.1 6 18 6.9 18 8C18 8.74 17.6 9.39 17 9.73C17.6 10.27 18 11.11 18 12C18 13.1 17.1 14 16 14C15.45 14 14.95 13.8 14.59 13.41C15.28 12.72 15.28 11.28 14.59 10.59C15.28 9.72 15.28 8.28 14.59 7.59C14.95 7.2 15.45 7 16 6ZM8 6C8.55 6 9.05 6.2 9.41 6.59C8.72 7.28 8.72 8.72 9.41 9.41C8.72 10.28 8.72 11.72 9.41 12.41C9.05 12.8 8.55 13 8 13C6.9 13 6 12.1 6 11C6 10.11 6.4 9.27 7 8.73C6.4 8.39 6 7.74 6 7C6 5.9 6.9 5 8 5V6Z" fill="currentColor"/>
  </svg>
);

export const PackageIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12.89 1.45L20.89 5.79C21.2 5.99 21.4 6.34 21.4 6.73V17.27C21.4 17.66 21.2 18.01 20.89 18.21L12.89 22.55C12.33 22.85 11.67 22.85 11.11 22.55L3.11 18.21C2.8 18.01 2.6 17.66 2.6 17.27V6.73C2.6 6.34 2.8 5.99 3.11 5.79L11.11 1.45C11.67 1.15 12.33 1.15 12.89 1.45Z" stroke="currentColor" strokeWidth="2"/>
    <polyline points="7.5,10 12,12.5 16.5,10" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="12.5" x2="12" y2="21.5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SparklesIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M12 0L14.09 8.26L22 9L14.09 9.74L12 18L9.91 9.74L2 9L9.91 8.26L12 0Z" fill="currentColor"/>
    <path d="M19 3L20.5 7.5L25 9L20.5 10.5L19 15L17.5 10.5L13 9L17.5 7.5L19 3Z" fill="currentColor"/>
    <path d="M5 3L6.5 7.5L11 9L6.5 10.5L5 15L3.5 10.5L-1 9L3.5 7.5L5 3Z" fill="currentColor"/>
  </svg>
);

export const FileIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M13 2H6C5.45 2 4.95 2.2 4.59 2.59C4.2 2.95 4 3.45 4 4V20C4 20.55 4.2 21.05 4.59 21.41C4.95 21.8 5.45 22 6 22H18C18.55 22 19.05 21.8 19.41 21.41C19.8 21.05 20 20.55 20 20V9L13 2Z" stroke="currentColor" strokeWidth="2"/>
    <polyline points="13,2 13,9 20,9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ClockIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const TrashIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2"/>
    <path d="M19 6V20C19 20.5 18.8 21 18.4 21.4C18 21.8 17.5 22 17 22H7C6.5 22 6 21.8 5.6 21.4C5.2 21 5 20.5 5 20V6M8 6V4C8 3.5 8.2 3 8.6 2.6C9 2.2 9.5 2 10 2H14C14.5 2 15 2.2 15.4 2.6C15.8 3 16 3.5 16 4V6" stroke="currentColor" strokeWidth="2"/>
    <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2"/>
    <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const PlusIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/>
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ArrowLeftIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,19 5,12 12,5" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ArrowRightIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2"/>
    <polyline points="12,5 19,12 12,19" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const SaveIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M19 21H5C4.45 21 3.95 20.8 3.59 20.41C3.2 20.05 3 19.55 3 19V5C3 4.45 3.2 3.95 3.59 3.59C3.95 3.2 4.45 3 5 3H16L21 8V19C21 19.55 20.8 20.05 20.41 20.41C20.05 20.8 19.55 21 19 21Z" stroke="currentColor" strokeWidth="2"/>
    <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" strokeWidth="2"/>
    <polyline points="7,3 7,8 15,8" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const AlertCircleIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const CheckCircleIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M22 11.08V12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C13.85 2 15.55 2.55 16.96 3.5" stroke="currentColor" strokeWidth="2"/>
    <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const ImageIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const CloseIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const UploadIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M21 15V19C21 19.5 20.8 20 20.4 20.4C20 20.8 19.5 21 19 21H5C4.5 21 4 20.8 3.6 20.4C3.2 20 3 19.5 3 19V15" stroke="currentColor" strokeWidth="2"/>
    <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2"/>
    <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2"/>
  </svg>
);
