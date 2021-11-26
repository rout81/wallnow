import React from "react";
import { View, Text, Platform } from "react-native";
import { Appbar } from "react-native-paper";

export default function Header({ back, navigation }) {
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="WallNow" subtitle={"Get Beautifull Wallpapers"} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  );
}
