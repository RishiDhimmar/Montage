import axios from "axios";
import { AUTH_TOKEN } from "../Constants";

const BASE_URL = "http://50.18.136.147:8080";


export const postPortfolio = async (portfolioName: string) => {
  try {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiM2FhZGYxMTAtYmJlYy00MDhmLTliMzktZDU2ZTZhZWFhZWNlIiwidXNlcklkIjoiNzkxOTU5NWUtMDAxMS03MGM1LTkwMDAtMWMzODhhOTg0NjVhIiwic3RyaXBlSWQiOiJjdXNfUlRacEF1V2ZsTDltVzAiLCJzdWJzY3JpcHRpb25TdGF0dXMiOiJhY3RpdmUiLCJzdHJpcGVTdWJzY3JpcHRpb25JZCI6InN1Yl8xUWFjZ2JTSFpVbktDc3ZyYVVFR0ZOZTIiLCJzdHJpcGVTY2hlZHVsZUlkIjpudWxsLCJ1c2VyUm9sZSI6MywicHJvZHVjdEluZm8iOmZhbHNlLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFqYXkiLCJsYXN0TmFtZSI6IlBhdGVsIiwib3JnYW5pemF0aW9uIjoiIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0xMi0yNlQwOTo1NDoxNS42OTlaIiwidXBkYXRlZEF0IjoiMjAyNS0wMi0yN1QxMzozMjowNi45NDNaIiwic3Vic2NyaXB0aW9uSWQiOiJmNjY1OTFmOC1mZWZlLTQzZWUtOTIzNy1mOGUyNDU3MzM4OGMiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzNhYWRmMTEwLWJiZWMtNDA4Zi05YjM5LWQ1NmU2YWVhYWVjZS9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDMxOSUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMTlUMDU0ODE1WiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT05NDE5NDljNzA0MmE2MWQ3Y2MzMWU2ZTQ4ZGRkYWE2NGQ3NzZhZWM2ZjQxOTkyNDk0YzUwYmUzNzRiZTgxZTljJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6dHJ1ZSwiY29nbml0byI6eyJzdWIiOiI3OTE5NTk1ZS0wMDExLTcwYzUtOTAwMC0xYzM4OGE5ODQ2NWEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jb2duaXRvLWlkcC51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91cy13ZXN0LTFfQjRnUEJvUXNVIiwiY29nbml0bzp1c2VybmFtZSI6Ijc5MTk1OTVlLTAwMTEtNzBjNS05MDAwLTFjMzg4YTk4NDY1YSIsInByZWZlcnJlZF91c2VybmFtZSI6IkFqYXkiLCJnaXZlbl9uYW1lIjoiQWpheSIsIm9yaWdpbl9qdGkiOiI0YjRjYTQzNi1kZjJlLTQxOGQtYTk1MC1jNTViZDNiMzdhN2QiLCJhdWQiOiIyb25ydDZtdmFrOTEwZ2c1YXBwM3BodHN1OSIsImV2ZW50X2lkIjoiMmQwYzg5M2ItZDNlOS00M2VlLWIxYTItZmM3MDJmODllMTE3IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE3NDIzNjMyOTQsIm5hbWUiOiJBamF5IFBhdGVsIiwiZXhwIjoxNzQyMzY2ODk0LCJpYXQiOjE3NDIzNjMyOTQsImZhbWlseV9uYW1lIjoiUGF0ZWwiLCJqdGkiOiIxMDliOTJlNS0wNjJhLTQyMzItYmI0YS00ZmE4MzhiOGFkMjUiLCJlbWFpbCI6ImFqYXlwdGwwNDAxQGdtYWlsLmNvbSJ9LCJpYXQiOjE3NDIzNjMyOTUsImV4cCI6MTc0MzIyNzI5NX0.mNQO0sq2_roPYwfvd9Ghi6GfFdPNJYDEU4nhpTX6Osg";
    
    if (!authToken) {
      throw new Error("🚨 Missing authentication token. Please login.");
    }

    const response = await axios.post(
      `${BASE_URL}/portfolio`,
      { name: portfolioName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("✅ Portfolio created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`❌ API Error (${error.response.status}):`, error.response.data);
    } else if (error.request) {
      console.error("❌ No response received:", error.request);
    } else {
      console.error("❌ Request setup error:", error.message);
    }
    throw error;
  }
};
