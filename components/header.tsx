import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import Test from "../screens/test";

export default function Header({ back, navigation }) {
  const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
  const [isSearch, setIsSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  return (
    <Appbar.Header>
      {back || isSearch ? (
        <Appbar.BackAction
          onPress={isSearch ? () => setIsSearch(false) : navigation.goBack}
        />
      ) : null}
      {!isSearch && (
        <Appbar.Content
          title="WallNow"
          subtitle={"Get Beautifull Wallpapers"}
        />
      )}
      {!isSearch && (
        <Appbar.Action
          icon="magnify"
          onPress={() => setIsSearch((prevState) => !prevState)}
        />
      )}
      {isSearch && (
        <Searchbar
          placeholder="Search"
          onChangeText={(query: string) => setSearchInput(query)}
          value={searchInput}
          autoComplete={"searching"}
        />
      )}
      {!isSearch && <Appbar.Action icon={MORE_ICON} onPress={() => {}} />}
    </Appbar.Header>
  );
}
