import React from "react";
import { FlatList, Image, Pressable, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface IScrollViewProps {
	isLoading: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	allPhotos: any[];
	loadMore: () => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	navigation: any;
	isError: boolean;
}
const ScrollView = ({
	allPhotos,
	loadMore,
	isLoading,
	isError,
	navigation,
}: IScrollViewProps) => {
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

	if (isLoading)
		return (
			<ActivityIndicator
				style={{ flex: 1, alignItems: "center" }}
				animating={true}
				size="large"
				color={Colors.red800}
			/>
		);
	if (isError)
		return (
			<View>
				<Text>error</Text>
			</View>
		);
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
			{/* <Pressable onPress={fetchNextPage}>
        <Text>more</Text>
      </Pressable> */}
			{isLoading && (
				<ActivityIndicator animating={true} color={Colors.red800} />
			)}
		</View>
	);
};

export default ScrollView;
