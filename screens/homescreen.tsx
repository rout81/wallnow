import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacityBase,
} from "react-native";
import { ActivityIndicator, Button, TouchableRipple } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useInfiniteQuery } from "react-query";
import ScrollView from "../components/scrollView";
import { useGetCuratedPhotosQuery } from "../redux/services/photos";

export default function HomeScreen({ navigation }) {
  const [page, setPage] = useState("1");
  const [perPage, setPerPage] = useState(30);
  const [searchType, setSearchType] = useState("/curated");
  const curatedParams = { per_page: "80", page: page };
  // const { data, error, isLoading } = useGetCuratedPhotosQuery(curatedParams);
  const getTotalPages = (perPage: number, totalPages: number) => {
    return Math.ceil(totalPages / perPage);
  };

  const fetchCurated = async ({ pageParam = 1 }) => {
    const baseUrl = "https://api.pexels.com/v1/";
    const response = await fetch(
      `${baseUrl}${searchType}?per_page=80&page=${pageParam}`,
      {
        headers: {
          Authorization:
            "563492ad6f91700001000001c101f26c980c4e6f96f002c81baedc12",
        },
      }
    );
    const results = await response.json();
    return {
      results: results,
      nextPage: pageParam + 1,
      totalPages: getTotalPages(perPage, results.total_results),
    };
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery("curated", (nextPage) => fetchCurated(nextPage), {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    });

  console.log({ data });

  const allPhotos = data.pages.map((page) => page.results.photos);

  const loadMore = () => {
    fetchNextPage();
    // setPage(page + 1);
  };

  // if (isLoading)
  //   return <ActivityIndicator animating={true} color={Colors.red800} />;
  // if (isError) return <Text>Error!</Text>;

  return (
    <ScrollView
      allPhotos={allPhotos}
      isLoading={isLoading}
      loadMore={fetchNextPage}
      isError={isError}
      navigation={navigation}
    />
  );
}
