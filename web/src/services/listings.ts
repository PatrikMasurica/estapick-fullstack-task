import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

export const getListings = async (params?: any) => {
  try {
    console.log("API call to /listings with params:", params);
    const res = await apiClient.get("/listings", { params });
    console.log("API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return { data: [] };
  }
};

export const getListing = async (id: string) => {
  try {
    const res = await apiClient.get(`/listings/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    throw error;
  }
};