'use client';

import { useState } from 'react';
import { Property } from '@/data/properties';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !property) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-navy-900/90" onClick={onClose} />
        
        <div className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-navy-900" />
          </button>

          {/* Image gallery */}
          <div className="relative aspect-[16/9] bg-gray-100">
            {/* Placeholder for images */}
            <div className={`absolute inset-0 bg-gradient-to-br ${property.gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/60 text-lg">Property Image {currentImageIndex + 1}</span>
            </div>
            
            {/* Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-navy-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
                >
                  <ChevronRightIcon className="w-6 h-6 text-navy-900" />
                </button>
              </>
            )}

            {/* Image indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span className="text-navy-900/60 text-sm tracking-wider uppercase">
                    {property.location}
                  </span>
                  <span className="bg-gold-500 text-white text-xs tracking-wide uppercase px-2 py-1">
                    {property.tag}
                  </span>
                </div>
                <h2 className="font-heading text-3xl text-navy-900 mb-2">
                  {property.title}
                </h2>
                <div className="flex items-baseline gap-4">
                  <span className="text-navy-900 font-heading text-2xl">{property.price}</span>
                  <span className="text-navy-900/50">{property.priceUsd}</span>
                  {property.expectedROI && (
                    <span className="text-gold-600 font-medium text-sm">
                      ROI: {property.expectedROI}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Property details grid */}
            <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-navy-900 font-heading text-2xl mb-1">{property.beds}</div>
                <div className="text-navy-900/60 text-sm uppercase tracking-wider">Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-navy-900 font-heading text-2xl mb-1">{property.baths}</div>
                <div className="text-navy-900/60 text-sm uppercase tracking-wider">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="text-navy-900 font-heading text-2xl mb-1">{property.area}</div>
                <div className="text-navy-900/60 text-sm uppercase tracking-wider">Total Area</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-navy-900 mb-4">Description</h3>
              <p className="text-navy-900/70 leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-navy-900 mb-4">Features</h3>
              <div className="flex flex-wrap gap-2">
                {property.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button className="btn-gold flex-1">
                Request Details
              </button>
              <button className="btn-outline flex-1">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}