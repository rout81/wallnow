const baseUrl = "https://api.pexels.com/v1/";
const limit = "?per_page=80";

interface iUrls {
  curated: string;
  search: (query: string) => string;
}

export const urls: iUrls = {
  curated: `${baseUrl}/curated${limit}`,
  search: (query: string) => `${baseUrl}/search?query=${query}`,
};

export const fetchCurated = async (
  { pageParam = 1 },
  urlType: string,
  limit: number = 80
) => {
  const response = await fetch(`${urlType}?per_page=${80}&page=${pageParam}`, {
    headers: {
      Authorization: "563492ad6f91700001000001c101f26c980c4e6f96f002c81baedc12",
    },
  });
  const results = await response.json();
  return {
    results: results,
    nextPage: pageParam + 1,
    totalPages: Math.ceil(results?.total_results / limit),
  };
};
