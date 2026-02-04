'use client';

import { regions } from '@/data/properties';

interface FilterState {
  priceRange: string;
  type: string;
  region: string;
}

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const priceRanges = [
  { value: '', label: 'All Prices' },
  { value: '0-500000', label: 'Under $500k' },
  { value: '500000-1000000', label: '$500k - $1M' },
  { value: '1000000-2000000', label: '$1M - $2M' },
  { value: '2000000+', label: 'Above $2M' },
];

const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'residential', label: 'Residential' },
  { value: 'investment', label: 'Investment' },
  { value: 'vacation', label: 'Vacation' },
];

const regionOptions = [
  { value: '', label: 'All Regions' },
  ...regions.map(region => ({ value: region.name, label: region.name }))
];

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white border border-navy-900/10 rounded-lg p-6 mb-8">
      <div className="flex flex-wrap gap-6 items-center">
        {/* Price Range */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            Price Range
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="w-full px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            Property Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900"
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Region */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-navy-900 text-sm font-medium mb-2">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-4 py-2 border border-navy-900/20 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 text-navy-900"
          >
            {regionOptions.map(region => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({ priceRange: '', type: '', region: '' })}
            className="px-4 py-2 text-gold-600 hover:text-gold-800 transition-colors border border-gold-600 hover:border-gold-800 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export type { FilterState };