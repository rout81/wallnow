import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  BottomNavigation,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/homescreen";
import Test from "./screens/test";

// const MusicRoute = () => <Button>Music</Button>;

// const AlbumsRoute = () => <Text>Albums</Text>;

// const RecentsRoute = () => <Text>Recents</Text>;

export default function App() {
  // const [index, setIndex] = React.useState(0);
  // const [routes] = React.useState([
  //   { key: "music", title: "Music", icon: "music-circle-outline" },
  //   { key: "albums", title: "Albums", icon: "album" },
  //   { key: "recents", title: "Recents", icon: "history" },
  // ]);

  // const renderScene = BottomNavigation.SceneMap({
  //   music: MusicRoute,
  //   albums: AlbumsRoute,
  //   recents: RecentsRoute,
  // });
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ header: (props) => <Header {...props} /> }}
          initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={Test} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
