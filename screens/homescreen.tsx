import React from "react";
import { useInfiniteQuery } from "react-query";
import ScrollView from "../components/scrollView";
import { fetchCurated, urls } from "../utills/api";

export default function HomeScreen({ navigation }) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      "curated",
      (nextPage) => fetchCurated(nextPage, urls.curated, 80),
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextPage < lastPage.totalPages ? lastPage.nextPage : null,
      }
    );

  const allPhotos = data?.pages?.map((page) => page?.results?.photos);

  return (
    <ScrollView
      allPhotos={allPhotos}
      isLoading={isLoading}
      loadMore={hasNextPage && fetchNextPage}
      isError={isError}
      navigation={navigation}
    />
  );
}
