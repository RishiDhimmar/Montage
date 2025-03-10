export const fetchData = async (url: string) => {
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNzU5NTlhMGYtMmEyMS00YzYxLWFkMzgtMzQ4NjE4ZjM3OWU3IiwidXNlcklkIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1Iiwic3RyaXBlSWQiOm51bGwsInN1YnNjcmlwdGlvblN0YXR1cyI6InRyaWFsaW5nIiwic3RyaXBlU3Vic2NyaXB0aW9uSWQiOm51bGwsInN0cmlwZVNjaGVkdWxlSWQiOm51bGwsInVzZXJSb2xlIjozLCJwcm9kdWN0SW5mbyI6ZmFsc2UsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiIiLCJsYXN0TmFtZSI6IiIsIm9yZ2FuaXphdGlvbiI6ImhleGFhIiwidXNlck5hbWUiOm51bGwsImNvbXBhbnlOZXdzIjpmYWxzZSwib2ZmZXJzIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MTRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMy0wN1QxMDoyNjoyMy43MjlaIiwic3Vic2NyaXB0aW9uSWQiOiI0Y2Q2MjRiZC1iNTM1LTRjZjItODA0Ni1lYzkxYmVmN2IzNzAiLCJpbWFnZSI6Imh0dHBzOi8vbW9udGFnZS1kYXRhLWRldi5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS91c2VyLzc1OTU5YTBmLTJhMjEtNGM2MS1hZDM4LTM0ODYxOGYzNzllNy9wcm9maWxlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1Db250ZW50LVNoYTI1Nj1VTlNJR05FRC1QQVlMT0FEJlgtQW16LUNyZWRlbnRpYWw9QUtJQTJMSVBaWkNIVk9QM0RONVAlMkYyMDI1MDMxMCUyRnVzLXdlc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMTBUMDcyMjMyWiZYLUFtei1FeHBpcmVzPTg2NDAwJlgtQW16LVNpZ25hdHVyZT03MWM1ZWYxZDA1YTI1MWZkOWNhNjQ4MDNlNDFiODgyODE0ODA4NDc4ZDJiYzgzOTQzOTEzMjlmNjAxMWZiNTgzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ4LWlkPUdldE9iamVjdCJ9LCJ1c2VySWQiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJpc0FkbWluIjpmYWxzZSwiaGFzQWRtaW5QYW5lbEFjY2VzcyI6ZmFsc2UsImNvZ25pdG8iOnsiY3VzdG9tOm9yZ2FuaXphdGlvbiI6ImhleGFhIiwic3ViIjoiYTlhOWM5MWUtNDBhMS03MDFlLWY0ZTEtOWZhMTQxYzRhY2E1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vY29nbml0by1pZHAudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vdXMtd2VzdC0xX0I0Z1BCb1FzVSIsImNvZ25pdG86dXNlcm5hbWUiOiJhOWE5YzkxZS00MGExLTcwMWUtZjRlMS05ZmExNDFjNGFjYTUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJIZXhhY29kZXJEZXYiLCJvcmlnaW5fanRpIjoiOWI2ODJlNTUtYjMwNC00YTE2LWJhMDItNmYwOGVmMWZkOWI5IiwiYXVkIjoiMm9ucnQ2bXZhazkxMGdnNWFwcDNwaHRzdTkiLCJldmVudF9pZCI6ImU2Y2UwZGQ4LWYxMjMtNDRkZi1iYTUwLWJkYjlmYmI0MjdhNiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQxNTkxMzUxLCJuYW1lIjoiVGVzdCBVc2VyIiwiZXhwIjoxNzQxNTk0OTUxLCJpYXQiOjE3NDE1OTEzNTEsImp0aSI6Ijk2OTM4MDY2LWQ1ZGYtNGYwOC1iOTA5LWY4MTQ3NDZiNDIwZCIsImVtYWlsIjoiaGV4YWNvZGVydGVzdEBnbWFpbC5jb20ifSwiaWF0IjoxNzQxNTkxMzUyLCJleHAiOjE3NDI0NTUzNTJ9.veDZjmufY2KJDU8dTzpPI7F8Zdgs1nrXG-U3ltFD-LQ";
  
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
  