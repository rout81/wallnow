import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useQuery } from "react-query";
import { useGetPhotoDetailsQuery } from "../redux/services/photos";
import { FAB, Portal, Provider } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";

interface Isnackbar {
  label: string;
  visible: boolean;
  action: string;
}

export default function PictureDetails({ route, navigation }) {
  const { id } = route.params;
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetPhotoDetailsQuery(id);
  const [snackbar, setSnackbar] = useState<Isnackbar>({
    label: "",
    visible: false,
    action: "",
  });

  const onStateChange = () => setOpen(!open);

  const downloadImage = async () => {
    const uri: string = data?.src?.original;
    const name: string =
      data?.src?.original?.split("/")?.slice(-1)?.[0] || `img${data?.id}`;
    const fileUri = FileSystem.documentDirectory + name;
    const download = FileSystem.createDownloadResumable(
      uri,
      fileUri,
      {},
      getDownloadProgress
    );
    try {
      const { uri } = await download.downloadAsync();
      saveFile(uri);
    } catch (error) {
      console.log({ error });
    }
  };

  const saveFile = async (fileUri: string) => {
    console.log({ fileUri });
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    console.log({ status, fileUri });
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      if (asset.filename) {
        setSnackbar({
          label: "Saved Sucessfully",
          visible: true,
          action: "Open",
        });
      }
    } else {
      setSnackbar({ label: "Unable to save", visible: true, action: "Close" });
    }
  };

  const getDownloadProgress = (downloadProgress) => {
    const progress =
      (downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite) *
      100;
    console.log(Math.trunc(progress));
  };

  if (isLoading)
    return (
      <ActivityIndicator
        animating={true}
        style={{ flex: 1, alignItems: "center" }}
        size="large"
        color={Colors.red800}
      />
    );
  if (data)
    return (
      <View>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{ uri: data?.src?.large2x }}
        />
        <View
          style={{
            backgroundColor: "blue",
            height: 45,
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        ></View>
        <Portal>
          <FAB.Group
            visible
            open={open}
            icon={open ? "calendar-today" : "plus"}
            actions={[
              {
                icon: "share",
                onPress: () => console.log("Pressed share"),
              },
              {
                icon: "download",
                onPress: downloadImage,
              },
              {
                icon: "wallpaper",
                onPress: () => console.log("Pressed wallpaper"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
        <Snackbar
          visible={snackbar.visible}
          onDismiss={() =>
            setSnackbar({ label: "", visible: false, action: "" })
          }
        >
          {snackbar.label}
        </Snackbar>
      </View>
    );
}
