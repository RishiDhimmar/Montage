import dotenv from "dotenv";
import { AUTH_TOKEN } from "../Constants";

export const fetchData = async (url: string) => {
  const authToken = AUTH_TOKEN
  
    if (!authToken) {
      console.error("🚨 Missing auth token! Check your .env file.");
      throw new Error("Missing auth token");
    }
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("📡 Fetched Data:", data); // Debug API response
      return data;
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      throw error;
    }
  };
  