'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { properties, Property } from '@/data/properties';
import PropertyModal from './PropertyModal';
import PropertyFilters, { FilterState } from './PropertyFilters';

export default function FeaturedProperties() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: '',
    type: '',
    region: '',
  });

  // Filter properties based on selected filters
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Price range filter
      if (filters.priceRange) {
        if (filters.priceRange === '2000000+') {
          if (property.priceUsdNum <= 2000000) return false;
        } else {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (property.priceUsdNum < min || (max && property.priceUsdNum > max)) return false;
        }
      }

      // Type filter
      if (filters.type && property.type !== filters.type) return false;

      // Region filter
      if (filters.region && property.region !== filters.region) return false;

      return true;
    });
  }, [filters]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="properties" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">Portfolio</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
            Hand-picked investment opportunities across Santa Catarina&apos;s most
            prestigious coastal destinations.
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters filters={filters} onFilterChange={setFilters} />

        {/* Results count */}
        <div className="mb-8">
          <p className="text-navy-900/60 text-sm">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
        </div>

        {/* Property Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={item}
              className="group cursor-pointer"
              onClick={() => setSelectedProperty(property)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-lg">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${property.gradient} group-hover:scale-110 transition-transform duration-700`}
                />
                {/* Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gold-500 text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 font-medium">
                    {property.tag}
                  </span>
                </div>
                {/* Type badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-navy-900/80 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-1 font-medium capitalize">
                    {property.type}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm tracking-widest uppercase">
                    View Details
                  </span>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  </svg>
                  <span className="text-navy-900/40 text-xs tracking-wider uppercase">
                    {property.location}
                  </span>
                </div>
                <h3 className="font-heading text-lg text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                  {property.title}
                </h3>

                {/* Details */}
                <div className="flex gap-4 text-navy-900/40 text-xs mb-3">
                  <span>{property.beds} Beds</span>
                  <span>{property.baths} Baths</span>
                  <span>{property.area}</span>
                </div>

                {/* Expected ROI */}
                {property.expectedROI && (
                  <div className="mb-3">
                    <span className="text-gold-600 text-xs font-medium">
                      Expected ROI: {property.expectedROI}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="pt-3 border-t border-navy-900/10 flex items-baseline justify-between">
                  <span className="text-navy-900 font-heading text-xl">{property.price}</span>
                  <span className="text-navy-900/30 text-sm">{property.priceUsd}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <h3 className="font-heading text-xl text-navy-900 mb-2">No properties found</h3>
            <p className="text-navy-900/50 mb-6">Try adjusting your filters to see more options.</p>
            <button 
              onClick={() => setFilters({ priceRange: '', type: '', region: '' })}
              className="btn-outline"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* View All CTA */}
        {filteredProperties.length > 0 && filteredProperties.length === properties.length && (
          <div className="text-center mt-12">
            <motion.a 
              href="#contact" 
              className="btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              View All {properties.length}+ Properties
            </motion.a>
          </div>
        )}
      </div>

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          isOpen={true}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}