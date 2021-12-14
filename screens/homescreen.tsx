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
import { useGetCuratedPhotosQuery } from "../redux/services/photos";

export default function HomeScreen({ navigation }) {
  const [page, setPage] = useState("1");
  const [perPage, setPerPage] = useState(30);
  const curatedParams = { per_page: "30", page: page };
  // const { data, error, isLoading } = useGetCuratedPhotosQuery(curatedParams);
  const fetchCurated = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://api.pexels.com/v1/curated?per_page=30&page=${pageParam}`,
      {
        headers: {
          Authorization:
            "563492ad6f91700001000001c101f26c980c4e6f96f002c81baedc12",
        },
      }
    );
    const results = await response.json();
    return {
      results,
      nextPage: pageParam + 1,
      totalPages: getTotalPages(perPage, results.total_results),
    };
  };

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useInfiniteQuery("curated", fetchCurated, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.nextPage < lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    });

    const allPhotos = data.pages.map(page => page.results.photos)

  const renderImages = ({ item }) => (
    <Pressable
      onPress={() => {
        navigation.navigate("Details", {
          id: item.id,
        });
      }}
      style={{ width: "33%", marginBottom: ".5%" }}
    >
      <Image
        style={{
          width: "100%",
          height: 200,
          borderRadius: 5,
        }}
        source={{ uri: item.src.medium }}
      />
    </Pressable>
  );

  const loadMore = () => {
    fetchNextPage();
    // setPage(page + 1);
  };

  const getTotalPages = (perPage: number, totalPages: number) => {
    return Math.ceil(totalPages / perPage);
  };

  if (isLoading)
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  if (isError) return <Text>Error!</Text>;

  return (
    <View>
      <FlatList
        numColumns={3}
        contentContainerStyle={{ margin: ".5%" }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={allPhotos.flat()}
        renderItem={renderImages}
        onEndReachedThreshold={0.5}
        onEndReached={loadMore}
        keyExtractor={(item) => item.id}
      />
      <Pressable onPress={fetchNextPage}>
        <Text>more</Text>
      </Pressable>
      {isLoading && (
        <ActivityIndicator animating={true} color={Colors.red800} />
      )}
    </View>
  );
}
