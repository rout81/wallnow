var baseUrl = "https://api.pexels.com/v1/";
var limit = "?per_page=80";

export const urls = {
  curated: `${baseUrl}/curated${limit}`,
  search: (query: string) => `${baseUrl}/search?query=${query}`,
};
