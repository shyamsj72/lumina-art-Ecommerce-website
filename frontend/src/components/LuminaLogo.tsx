import React from 'react';

interface LuminaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Exact replica of the official Lumina Art company logo from the provided design:
 * "Lumina Art."
 * - L: Blue (#1A73E8)
 * - u: Red (#E5252A)
 * - m: Yellow (#FBBC05)
 * - i: Blue (#1A73E8)
 * - n: Green (#16A34A)
 * - a: Red (#E5252A)
 * - A: Stylized Open Chevron / Inverted 'V' without crossbar, in Blue (#1A73E8)
 * - r: Green (#16A34A)
 * - t: Yellow (#FBBC05)
 * - .: Red (#E5252A)
 */
export const LuminaLogo: React.FC<LuminaLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xl tracking-tight',
    md: 'text-2xl sm:text-[26px] tracking-tight',
    lg: 'text-3xl sm:text-4xl tracking-tight',
  }[size];

  const chevronSize = {
    sm: { width: '0.68em', height: '0.84em', stroke: '3.8' },
    md: { width: '0.70em', height: '0.86em', stroke: '4.2' },
    lg: { width: '0.72em', height: '0.88em', stroke: '4.6' },
  }[size];

  return (
    <div
      className={`inline-flex items-baseline font-bold select-none leading-none whitespace-nowrap ${sizeClasses} ${className}`}
      style={{ fontFamily: "'Quicksand', 'Comfortaa', -apple-system, sans-serif" }}
      aria-label="Lumina Art."
    >
      {/* Lumina */}
      <span style={{ color: '#1A73E8' }}>L</span>
      <span style={{ color: '#E5252A' }}>u</span>
      <span style={{ color: '#FBBC05' }}>m</span>
      <span style={{ color: '#1A73E8' }}>i</span>
      <span style={{ color: '#16A34A' }}>n</span>
      <span style={{ color: '#E5252A' }}>a</span>

      {/* Space between Lumina and Art */}
      <span className="w-[0.34em] inline-block" />

      {/* Stylized 'A' - Open Chevron / Inverted 'V' with rounded apex & feet, no crossbar */}
      <svg
        viewBox="0 0 24 28"
        className="inline-block relative -bottom-[0.02em] mr-[0.04em]"
        style={{ width: chevronSize.width, height: chevronSize.height }}
        aria-hidden="true"
      >
        <path
          d="M 3.8 24.5 L 12 4.5 L 20.2 24.5"
          stroke="#1A73E8"
          strokeWidth={chevronSize.stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* rt. */}
      <span style={{ color: '#16A34A' }}>r</span>
      <span style={{ color: '#FBBC05' }}>t</span>
      <span style={{ color: '#E5252A' }}>.</span>
    </div>
  );
};
