import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  BottomNavigation,
  Button,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./components/header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/homescreen";
import PictureDetails from "./screens/pictureDetails";
import Test from "./screens/test";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchScreen from "./screens/searchScreen";

const queryClient = new QueryClient();

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ header: (props) => <Header {...props} /> }}
              initialRouteName="Home"
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Details" component={PictureDetails} />
              <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}
