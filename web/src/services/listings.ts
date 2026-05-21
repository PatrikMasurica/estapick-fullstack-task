import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export const getListings = async (params?: any) => {
  const res = await apiClient.get("/listings", { params });
  return res.data;
};

export const getListing = async (id: string) => {
  const res = await apiClient.get(`/listings/${id}`);
  return res.data;
};