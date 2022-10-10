import React, { useEffect, useState } from "react";
import { View, Text, Platform, TextInput, StatusBar } from "react-native";
import { Appbar, Modal, Portal, Searchbar } from "react-native-paper";
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
          onPress={() => navigation.navigate("Search")}
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
      {/* <Portal>
        <Modal
          visible={true}
          onDismiss={() => {}}
          contentContainerStyle={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100px",
              width: "100%",
              backgroundColor: "red",
              // padding: StatusB.ar.currentHeight || 25,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text>Search</Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput style={{ backgroundColor: "#f2f2f2" }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text>Search</Text>
            </View>
          </View>
          <View style={{ backgroundColor: "green", height: "100%" }}>
            <Text>Search</Text>
          </View>
        </Modal>
      </Portal> */}
    </Appbar.Header>
  );
}
