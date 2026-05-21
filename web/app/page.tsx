"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { getListings } from "../src/services/listings";

const Map = dynamic(() => import("../src/components/Map"), { ssr: false });

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [debouncedCity] = useDebounce(city, 500);
  const [debouncedMinPrice] = useDebounce(minPrice, 500);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

const fetchListings = useCallback(async () => {
  try {
    setLoading(true);
    const filters: any = {};
    if (city && city.trim() !== "") {
      filters.city = city;
    }
    if (minPrice && minPrice !== "") {
      filters.minPrice = parseFloat(minPrice);
    }
    
    console.log("Fetching with filters:", filters);
    const data = await getListings(filters);
    console.log("Received data:", data);
    
    // Handle both response formats
    const listingsData = data.data || data || [];
    setListings(listingsData);
  } catch (error) {
    console.error("Error fetching listings:", error);
    setListings([]);
  } finally {
    setLoading(false);
  }
}, [city, minPrice]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const clearFilters = () => {
    setCity("");
    setMinPrice("");
  };

  const handleImageError = (listingId: string) => {
    setImageErrors(prev => ({ ...prev, [listingId]: true }));
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Estapick Real Estate</h1>
          <p className="text-gray-600 mt-1">Find your dream property</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter Properties</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                placeholder="e.g., Prishtina, Tirana, Skopje..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Price
              </label>
              <input
                type="number"
                placeholder="e.g., 100000"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(city || minPrice) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {city && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  City: {city}
                </span>
              )}
              {minPrice && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Min: ${formatPrice(parseInt(minPrice))}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{listings.length}</span> properties
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or add new listings.</p>
            {(city || minPrice) && (
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Listings Grid */}
        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <Link href={`/listings/${listing.id}`} key={listing.id}>
                <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    {!imageErrors[listing.id] ? (
                      <img
                        src={listing.images?.[0] || "https://picsum.photos/400/300?random=1"}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={() => handleImageError(listing.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ${formatPrice(listing.price)}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition">
                      {listing.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {listing.city}, {listing.address}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">{listing.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <span className="flex items-center">
                          🛏️ {listing.bedrooms}
                        </span>
                        <span className="flex items-center">
                          🚽 {listing.bathrooms}
                        </span>
                      </div>
                      <span className="text-blue-600 text-sm font-medium group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}