import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useInfiniteQuery } from "react-query";
import ScrollView from "../components/scrollView";
import { fetchCurated, urls } from "../utills/api";

const SearchScreen = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["curated", searchInput],
      (nextPage) => fetchCurated(nextPage, urls.search(searchInput), 80),
      {
        getNextPageParam: (lastPage) =>
          lastPage.nextPage < lastPage.totalPages ? lastPage.nextPage : null,
      }
    );
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(query: string) => setSearchInput(query)}
        value={searchInput}
        autoComplete={isLoading ? "loading" : "loading"}
      />
      <ScrollView
        allPhotos={data?.pages?.map((page) => page?.results?.photos)}
        isLoading={isLoading}
        loadMore={hasNextPage && fetchNextPage}
        isError={isError}
        navigation={navigation}
      />
    </>
  );
};

export default SearchScreen;
