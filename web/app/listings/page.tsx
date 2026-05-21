import { getListing } from "../../src/services/listings";

type Props = {
  params: {
    id: string;
  };
};

export default async function ListingPage({
  params,
}: Props) {
  const listing = await getListing(params.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={listing.images[0]}
        alt={listing.title}
        className="w-full h-[400px] object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">
        {listing.title}
      </h1>

      <p className="mb-4">
        {listing.description}
      </p>

      <p className="font-bold text-xl">
        ${listing.price}
      </p>

      <p>{listing.city}</p>

      <p>
        {listing.bedrooms} bedrooms ·{" "}
        {listing.bathrooms} bathrooms
      </p>
    </div>
  );
}