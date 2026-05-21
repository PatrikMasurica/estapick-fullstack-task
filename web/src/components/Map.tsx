"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

import debounce from "lodash.debounce";

import { useMemo } from "react";
import { memo } from "react";

type Props = {
  listings: any[];
  onBoundsChange?: (bbox: string) => void;
};

function MapEvents({
  onBoundsChange,
}: {
  onBoundsChange?: (
    bbox: string
  ) => void;
}) {
  const debouncedBoundsChange =
    useMemo(
      () =>
        debounce(
          (bbox: string) => {
            onBoundsChange?.(bbox);
          },
          500
        ),
      [onBoundsChange]
    );

  useMapEvents({
    moveend: (event) => {
      const bounds =
        event.target.getBounds();

      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ].join(",");

      debouncedBoundsChange(bbox);
    },
  });

  return null;
}
function Map({
  listings,
  onBoundsChange,
}: Props) {
  return (
    <MapContainer
      center={[42.66, 21.16]}
      zoom={8}
      className="h-full w-full rounded-[32px] overflow-hidden shadow-2xl shadow-black/10"
      scrollWheelZoom={true}
      zoomControl={false}
      placeholder={
  <div className="h-full w-full bg-gray-200 animate-pulse rounded-[32px]" />
}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
            <div className="min-w-[220px]">
  <img
    src={
      listing.images?.[0]
    }
    alt={listing.title}
    className="w-full h-28 object-cover rounded-xl mb-3"
  />

  <h2 className="font-bold text-lg leading-5 mb-1">
    {listing.title}
  </h2>

  <p className="text-gray-500 text-sm mb-2">
    📍 {listing.city}
  </p>

  <p className="font-bold text-xl">
    $
    {listing.price?.toLocaleString()}
  </p>
</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default memo(Map);