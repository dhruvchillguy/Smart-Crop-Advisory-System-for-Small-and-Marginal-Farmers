import React from 'react';

const svgProps = (size = 18, color = 'currentColor', className = '') => ({
  xmlns: 'http://www.w3.org/2000/svg',
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className,
  style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 },
});

export const SproutIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 1 4 2c-.5 2.1-1.8 3.5-3.8 4.2-.3-1.4-.4-2.8.2-4.2z" />
  </svg>
);

export const DashboardIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
);

export const CropIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M12 2v20" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const WeatherIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

export const SoilIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M2 17c3-1 6-1 9 0s6 1 9 0" />
    <path d="M2 12c3-1 6-1 9 0s6 1 9 0" />
    <path d="M2 7c3-1 6-1 9 0s6 1 9 0" />
  </svg>
);

export const FertilizerIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M10 2v7.31a2 2 0 0 1-.5 1.34L4.2 16.5c-1 1.1-.2 2.9 1.3 2.9h13c1.5 0 2.3-1.8 1.3-2.9l-5.3-5.85a2 2 0 0 1-.5-1.34V2" />
    <path d="M8.5 2h7" />
    <path d="M7 16h10" />
  </svg>
);

export const ProfileIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const SavedIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

export const HelpIcon = ({ size = 18, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const CheckIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const AlertTriangleIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const InfoIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const TrashIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

export const EditIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export const SaveIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

export const AreaIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

export const LocationIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const WaterIcon = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

export const CalendarIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const CloseIcon = ({ size = 16, color = 'currentColor', className = '' }) => (
  <svg {...svgProps(size, color, className)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
