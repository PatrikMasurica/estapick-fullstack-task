'use client';

import { useEffect, useState } from 'react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  city: string;
  address: string;
  images: string[];
  createdAt: string;
}

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
  });

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3001/listings';
      const params = new URLSearchParams();
      
      if (filters.city) params.append('city', filters.city);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      setListings(data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load listings. Make sure the backend is running on port 3000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchListings();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading listings...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Estapick Listings</h1>
      
      {/* Filters */}
      <div className="bg-gray-100 p-4 rounded-lg mb-8 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Filter by city"
          value={filters.city}
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          className="px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Minimum price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Listings Grid */}
      {listings.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No listings found. Add some listings to get started!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <div key={listing.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
                <p className="text-gray-600 mb-2">{listing.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ${listing.price.toLocaleString()}
                </p>
                <div className="flex gap-4 text-sm text-gray-500 mb-2">
                  <span>🛏️ {listing.bedrooms} beds</span>
                  <span>🚽 {listing.bathrooms} baths</span>
                </div>
                <p className="text-gray-700">
                  📍 {listing.city}, {listing.address}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Listed: {new Date(listing.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}