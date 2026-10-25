import React from 'react';
import { X, ZoomIn } from 'lucide-react';

export default function ImageLightboxModal({ isOpen, imageSrc, title, caption, onClose }) {
  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-[#0F2537] rounded-2xl overflow-hidden border border-[#C59B27]/40 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#081521] border-b border-white/10 text-white">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-5 h-5 text-[#C59B27]" />
            <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
              {title || 'Scientific Diagram / Gallery View'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 bg-black/40 flex items-center justify-center max-h-[75vh] overflow-hidden">
          <img
            src={imageSrc}
            alt={title || 'Enlarged visualization'}
            className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {caption && (
          <div className="px-6 py-4 bg-[#0F2537] text-white/90 border-t border-white/10 text-sm sm:text-base leading-relaxed">
            <p>{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
