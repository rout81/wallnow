import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.pexels.com/v1" }),
  endpoints: (builder) => ({
    getCuratedPhotos: builder.query({
      query: (curated) => ({
        url: `/curated`,
        params: curated,
        headers: {
          Authorization:
            "563492ad6f91700001000001c101f26c980c4e6f96f002c81baedc12",
        },
      }),
    }),

    getPhotoDetails: builder.query({
      query: (id) => ({
        url: `/photos/${id}`,
        headers: {
          Authorization:
            "563492ad6f91700001000001c101f26c980c4e6f96f002c81baedc12",
        },
      }),
    }),
  }),
});

export const { useGetCuratedPhotosQuery, useGetPhotoDetailsQuery } = photosApi;
