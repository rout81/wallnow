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
import { useGetCuratedPhotosQuery } from "../redux/services/photos";

export default function HomeScreen({ navigation }) {
  const [page, setPage] = useState("1");
  const curatedParams = { per_page: "30", page: page };
  const { data, error, isLoading } = useGetCuratedPhotosQuery(curatedParams);
  console.log(data, error, isLoading);
  if (isLoading)
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  if (error) return <Text>Error!</Text>;
  return (
    <View>
      <FlatList
        numColumns={3}
        contentContainerStyle={{ margin: ".5%" }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={data.photos}
        renderItem={({ item }) => (
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
        )}
        keyExtractor={(item) => item.id}
      />
      <Text>test</Text>
    </View>
  );
}
