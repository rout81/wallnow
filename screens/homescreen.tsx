import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button onPress={() => navigation.navigate("Details")}>Home page</Button>
    </View>
  );
}
