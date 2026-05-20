"use client";

import { useEffect, useState } from "react";
import { getListings } from "@/services/listings";

export default function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings().then((data) => {
      setListings(data.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Listings
      </h1>

      <div className="grid gap-4">
        {listings.map((item: any) => (
          <div
            key={item.id}
            className="border p-4 rounded"
          >
            <h2 className="font-bold">
              {item.title}
            </h2>
            <p>{item.city}</p>
            <p>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}