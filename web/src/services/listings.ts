import { api } from "../lib/api";

export const getListings = async (params?: any) => {
  const res = await api.get("/listings", { params });
  return res.data;
};

export const getListing = async (id: string) => {
  const res = await api.get(`/listings/${id}`);
  return res.data;
};