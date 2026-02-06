'use client';

import { regions } from '@/data/properties';
import { useLanguage } from '@/lib/i18n';

interface FilterState {
  priceRange: string;
  type: string;
  region: string;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const { t } = useLanguage();

  const priceRanges = [
    { value: '', label: t('properties.allPrices') },
    { value: '0-500000', label: '< $500k' },
    { value: '500000-1000000', label: '$500k - $1M' },
    { value: '1000000-2000000', label: '$1M - $2M' },
    { value: '2000000+', label: '> $2M' },
  ];

  const propertyTypes = [
    { value: '', label: t('properties.allTypes') },
    { value: 'residential', label: t('properties.residential') },
    { value: 'investment', label: t('properties.investment') },
    { value: 'vacation', label: t('properties.vacation') },
  ];

  const regionOptions = [
    { value: '', label: t('properties.allRegions') },
    ...regions.map(region => ({ value: region.name, label: region.name }))
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white border border-navy-900/10 rounded-lg p-4 sm:p-6 mb-8">
      <div className="flex flex-wrap gap-4 sm:gap-6 items-end">
        {/* Price Range */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            {t('properties.priceRange')}
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900 text-sm"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            {t('properties.propertyType')}
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900 text-sm"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className="flex-1 min-w-[150px] sm:min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            {t('properties.region')}
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-3 sm:px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900 text-sm"
          >
            {regionOptions.map(region => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => onFilterChange({ priceRange: '', type: '', region: '' })}
            className="w-full sm:w-auto px-4 py-2 text-gold-600 hover:text-gold-800 transition-colors border border-gold-600 hover:border-gold-800 rounded-md text-sm whitespace-nowrap"
          >
            {t('properties.clearFilters')}
          </button>
        </div>
      </div>
    </div>
  );
}

export type { FilterState };
