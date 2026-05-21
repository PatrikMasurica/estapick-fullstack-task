"use client";

import "../lib/leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";


type Props = {
  listings: any[];
  onBoundsChange?: (bbox: string) => void;
};

function MapEvents({
  onBoundsChange,
}: {
  onBoundsChange?: (bbox: string) => void;
}) {
  useMapEvents({
    moveend(map) {
      const bounds = map.target.getBounds();

      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ].join(",");

      onBoundsChange?.(bbox);
    },
  });

  return null;
}

export default function Map({
  listings,
  onBoundsChange,
}: Props) {
  return (
    <MapContainer
      center={[42.66, 21.16]}
      zoom={8}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapEvents onBoundsChange={onBoundsChange} />

      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[
            listing.latitude,
            listing.longitude,
          ]}
        >
          <Popup>
            <div>
              <h2 className="font-bold">
                {listing.title}
              </h2>

              <p>{listing.city}</p>

              <p>${listing.price}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}