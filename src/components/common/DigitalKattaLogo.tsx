import React, { useState } from 'react';
import officialLogoImg from '../../assets/images/digital_katta_logo_1789295617453.jpg';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'image' | 'badge' | 'icon';
  onClick?: () => void;
}

export const DigitalKattaLogo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  variant = 'image',
  onClick
}) => {
  const [imgError, setImgError] = useState(false);

  // Height mappings for pristine optical balance
  const sizeClasses = {
    xs: 'h-8 max-w-[110px]',
    sm: 'h-12 max-w-[160px]',
    md: 'h-20 max-w-[240px]',
    lg: 'h-28 max-w-[320px]',
    xl: 'h-40 max-w-[420px]'
  };

  const containerPadding = {
    xs: 'p-0.5',
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3',
    xl: 'p-4'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {variant === 'badge' ? (
        <div
          className={`bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-center ${containerPadding[size]}`}
        >
          <img
            src={officialLogoImg}
            alt="Digital कट्टा Logo"
            className={`object-contain ${sizeClasses[size]}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </div>
      ) : variant === 'icon' ? (
        <div
          className={`bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex items-center justify-center ${
            size === 'xs' ? 'w-8 h-8 p-0.5' : size === 'sm' ? 'w-10 h-10 p-1' : 'w-14 h-14 p-1.5'
          }`}
        >
          <img
            src={officialLogoImg}
            alt="Digital कट्टा"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <div className="relative flex flex-col items-center">
          <img
            src={officialLogoImg}
            alt="Digital कट्टा - ठिकाण एक, सुविधा अनेक..!"
            className={`object-contain transition-transform duration-200 ${sizeClasses[size]}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
          {/* Subtle Tagline reinforcement if requested on custom layout */}
          {showTagline && !imgError && size === 'xl' && (
            <p
              className="text-[#8A0028] font-bold text-xs tracking-wider mt-1 text-center"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              ठिकाण एक, सुविधा अनेक..!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

