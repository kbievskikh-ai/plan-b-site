'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { properties as fallbackProperties, Property } from '@/data/properties';
import { fetchProperties } from '@/lib/api';
import PropertyModal from './PropertyModal';
import PropertyFilters, { FilterState } from './PropertyFilters';
import { useLanguage } from '@/lib/i18n';

type CategoryTab = 'all' | 'residential' | 'investment' | 'vacation';

const PROPERTIES_PER_TAB = 8;

export default function FeaturedProperties() {
  const { t, language } = useLanguage();
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [loaded, setLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: '',
    type: '',
    region: '',
  });
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [showAll, setShowAll] = useState(false);

  // Reset showAll when tab changes
  const handleTabChange = (tab: CategoryTab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

  const tabs: { id: CategoryTab; label: string; labelRu: string }[] = [
    { id: 'all',         label: 'All',           labelRu: 'Все' },
    { id: 'residential', label: 'For Sale',       labelRu: 'Продажа' },
    { id: 'investment',  label: 'For Investment', labelRu: 'Инвестиции' },
    { id: 'vacation',    label: 'For Rent',       labelRu: 'Аренда' },
  ];

  // Fetch properties from API on mount
  useEffect(() => {
    fetchProperties().then(props => {
      setAllProperties(props);
      setLoaded(true);
    }).catch(() => {
      setAllProperties(fallbackProperties);
      setLoaded(true);
    });
  }, []);

  // Filter properties based on selected filters + active tab
  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      // Tab filter
      if (activeTab !== 'all' && property.type !== activeTab) return false;

      // Price range filter
      if (filters.priceRange) {
        if (filters.priceRange === '2000000+') {
          if (property.priceUsdNum <= 2000000) return false;
        } else {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (property.priceUsdNum < min || (max && property.priceUsdNum > max)) return false;
        }
      }

      // Type filter (from PropertyFilters)
      if (filters.type && property.type !== filters.type) return false;

      // Region filter
      if (filters.region && property.region !== filters.region) return false;

      return true;
    });
  }, [filters, allProperties, activeTab]);

  // Visible properties: cap at 8 unless showAll
  const visibleProperties = useMemo(() => {
    if (showAll) return filteredProperties;
    return filteredProperties.slice(0, PROPERTIES_PER_TAB);
  }, [filteredProperties, showAll]);

  const hasMore = filteredProperties.length > PROPERTIES_PER_TAB && !showAll;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const isRu = language === 'ru';

  return (
    <section id="properties" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-gold-500" />
            <span className="text-gold-500 text-sm tracking-[0.3em] uppercase">{t('properties.portfolio')}</span>
            <div className="w-8 h-[1px] bg-gold-500" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-navy-900 mb-4 [text-wrap:balance]">
            {t('properties.title')}
          </h2>
          <p className="text-navy-900/50 max-w-2xl mx-auto text-lg">
            {t('properties.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-5 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-200 rounded-full border ${
                activeTab === tab.id
                  ? 'bg-gold-500 border-gold-500 text-white shadow-md shadow-gold-500/20'
                  : 'border-navy-900/20 text-navy-900/60 hover:border-gold-400 hover:text-gold-600'
              }`}
            >
              {isRu ? tab.labelRu : tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        {loaded && <PropertyFilters filters={filters} onFilterChange={setFilters} />}

        {/* Results count */}
        <div className="mb-8">
          <p className="text-navy-900/60 text-sm">
            {t('properties.showing')} {visibleProperties.length} {t('properties.of')} {filteredProperties.length} {t('properties.propertiesCount')}
          </p>
        </div>

        {/* Property Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
          key={activeTab}
        >
          {visibleProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={item}
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedProperty(property)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden mb-4 rounded-lg">
                {property.images?.[0]?.startsWith('http') ? (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${property.gradient} group-hover:scale-110 transition-transform duration-700`}
                  />
                )}
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
                    {t('common.viewDetails')}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <svg className="w-3.5 h-3.5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
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
                  <span>{property.beds} {t('properties.beds')}</span>
                  <span>{property.baths} {t('properties.baths')}</span>
                  <span>{property.area}</span>
                </div>

                {/* Expected ROI */}
                {property.expectedROI && (
                  <div className="mb-3">
                    <span className="text-gold-600 text-xs font-medium">
                      {t('properties.expectedRoi')}: {property.expectedROI}
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="pt-3 border-t border-navy-900/10 flex items-baseline justify-between mt-auto">
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
            <h3 className="font-heading text-xl text-navy-900 mb-2">
              {t('properties.noResults')}
            </h3>
            <p className="text-navy-900/50 mb-6">{t('properties.noResultsDesc')}</p>
            <button 
              onClick={() => { setFilters({ priceRange: '', type: '', region: '' }); setActiveTab('all'); }}
              className="btn-outline"
            >
              {t('properties.clearFilters')}
            </button>
          </div>
        )}

        {/* View All / Show Less CTAs */}
        {filteredProperties.length > 0 && (
          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            {hasMore && (
              <motion.button
                onClick={() => setShowAll(true)}
                className="btn-gold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {isRu ? 'Посмотреть все объекты' : 'View All Properties'}
              </motion.button>
            )}
            {showAll && filteredProperties.length > PROPERTIES_PER_TAB && (
              <motion.button
                onClick={() => setShowAll(false)}
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {isRu ? 'Свернуть' : 'Show Less'}
              </motion.button>
            )}
            <motion.a 
              href="#contact" 
              className="btn-outline inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {isRu ? 'Запросить консультацию' : 'Request Consultation'}
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
