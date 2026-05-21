"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getListing } from "../../src/services/listings";

export default function ListingDetailPage() {
  const params = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        console.log("Fetching listing with ID:", params.id);
        const data = await getListing(params.id as string);
        console.log("Listing data:", data);
        setListing(data);
        setError(false);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading listing...</div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          <p>Listing not found</p>
          <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to listings
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {listing.images && listing.images.length > 0 ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-[400px] object-cover"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No image available</span>
            </div>
          )}
          
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
            
            <div className="flex gap-4 mb-6">
              <span className="text-2xl font-bold text-blue-600">
                ${listing.price?.toLocaleString()}
              </span>
              <span className="text-gray-600">🛏️ {listing.bedrooms} beds</span>
              <span className="text-gray-600">🚽 {listing.bathrooms} baths</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{listing.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p className="text-gray-700">
                📍 {listing.address}, {listing.city}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}