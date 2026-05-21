"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getListing } from "../../../src/services/listings";

export default function ListingDetailPage() {
  const params = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const id = params.id;
        console.log("Fetching listing with ID:", id);
        
        const data = await getListing(id as string);
        
        console.log("Received data:", data);
        setListing(data);
        setError(false);
      } catch (err) {
        console.error("Error:", err);
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6 animate-pulse">
        <div className="h-[500px] rounded-3xl bg-gray-300 mb-8" />

        <div className="bg-white rounded-3xl p-8">
          <div className="h-10 bg-gray-300 rounded w-1/2 mb-6" />

          <div className="flex gap-4 mb-8">
            <div className="h-6 w-32 bg-gray-300 rounded" />
            <div className="h-6 w-24 bg-gray-300 rounded" />
            <div className="h-6 w-24 bg-gray-300 rounded" />
          </div>

          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

 if (error || !listing) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-10 text-center max-w-md w-full">
        <div className="text-6xl mb-4">
          🏠
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Property not found
        </h2>

        <p className="text-gray-500 mb-6">
          The property you’re looking for does not exist or was removed.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-2xl hover:opacity-90 transition"
        >
          ← Back to Listings
        </Link>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* BACK BUTTON */}

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition mb-6"
      >
        ← Back to listings
      </Link>

      {/* HERO IMAGE */}

      <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-black/10">
        {listing.images &&
        listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-[300px] md:h-[650px] object-cover"
          />
        ) : (
          <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">
              No image available
            </span>
          </div>
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* TITLE OVER IMAGE */}

        <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 max-w-3xl">
            {listing.title}
          </h1>

          <p className="text-white/90 text-lg">
            📍 {listing.address},{" "}
            {listing.city}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* LEFT SIDE */}

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">
              About this property
            </h2>

            <p className="text-gray-600 leading-8 text-lg">
              {listing.description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {/* PRICE CARD */}

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-2">
              Property Price
            </p>

            <h2 className="text-4xl font-bold text-black">
              $
              {listing.price?.toLocaleString()}
            </h2>

            <button className="w-full mt-6 bg-black text-white py-4 rounded-2xl hover:opacity-90 transition">
              Contact Agent
            </button>
          </div>

          {/* FEATURES */}

          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6">
              Property Features
            </h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center justify-between">
                <span>Bedrooms</span>

                <span className="font-semibold">
                  🛏️ {listing.bedrooms}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Bathrooms</span>

                <span className="font-semibold">
                  🚿 {listing.bathrooms}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>City</span>

                <span className="font-semibold">
                  {listing.city}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}