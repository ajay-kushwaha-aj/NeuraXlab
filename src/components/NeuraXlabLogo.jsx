import React from 'react';
import neuraxlabLogo from '../assets/neuraxlab_logo.png';

/**
 * NeuraXlabLogo Component
 * Renders the official NeuraXlab emblem: Dual-hemisphere brain (Navy & UoH Crimson)
 * with the central golden "X" synapse junction and gut-microbiota axis.
 */
export default function NeuraXlabLogo({ className = "w-12 h-12", alt = "NeuraXlab Logo", withFrame = false }) {
  if (withFrame) {
    return (
      <div className={`flex items-center justify-center ${className} rounded-xl overflow-hidden border-2 border-[#C59B27] bg-white shadow-xl hover:scale-105 transition-transform duration-300 shrink-0 p-1.5`}>
        <img
          src={neuraxlabLogo}
          alt={alt}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={neuraxlabLogo}
      alt={alt}
      className={`${className} object-contain shrink-0`}
    />
  );
}
