import React, { useEffect, useState } from "react";
import { View, Text, Image, Share, Platform } from "react-native";
import { ActivityIndicator, Button, Snackbar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useQuery } from "react-query";
import { useGetPhotoDetailsQuery } from "../redux/services/photos";
import { FAB, Portal, Provider } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

interface Isnackbar {
  label: string;
  visible: boolean;
  action: string;
}

export default function PictureDetails({ route, navigation }) {
  const { id } = route.params;
  const { data, error, isLoading } = useGetPhotoDetailsQuery(id);
  const [downloadedImage, setDownloadedImage] = useState("");
  const [open, setOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [snackbar, setSnackbar] = useState<Isnackbar>({
    label: "",
    visible: false,
    action: "",
  });

  useEffect(() => {
    if (!downloadedImage) {
      downloadImage();
    }
    return () => {
      downloadedImage &&
        FileSystem.deleteAsync(downloadedImage)
          .then(() => console.log("deleted"))
          .catch((e) => console.log({ e }));
    };
  }, [data?.src?.original, downloadedImage, data?.src?.medium]);

  useEffect(() => console.log({ downloadedImage }), [downloadedImage]);

  const downloadImage = async () => {
    setIsDownloading(true);
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
      setDownloadedImage(uri);
      setIsDownloading(false);
      return uri;
    } catch (error) {
      setIsDownloading(false);
      console.log({ error });
    }
  };

  const saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(downloadedImage);
      if (asset.filename) {
        setSnackbar({
          label: "Saved Sucessfully",
          visible: true,
          action: "Open",
        });
      }
      setIsDownloading(false);
    } else {
      setIsDownloading(false);
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

  let openShareDialogAsync = async () => {
    setIsSharing(true);
    if (Platform.OS === "web") {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    const imageTmp = await ImageManipulator.manipulateAsync(downloadedImage);
    await Sharing.shareAsync(imageTmp.uri);
    setIsSharing(false);
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
          source={{ uri: downloadedImage || data?.src?.medium }}
        />
        <View
          style={{
            // backgroundColor: "rgba(201, 244, 240, 0.49)",
            // height: 45,
            width: "100%",
            position: "absolute",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            loading={isDownloading}
            disabled={isDownloading || !downloadedImage}
            onPress={saveFile}
            mode="text"
            icon="download"
            labelStyle={{
              textTransform: "capitalize",
              textShadowColor: "black",
              textShadowRadius: 5,
            }}
            color="white"
          >
            Save
          </Button>
          <Button
            onPress={openShareDialogAsync}
            mode="text"
            icon="wallpaper"
            labelStyle={{
              textTransform: "capitalize",
              textShadowColor: "black",
              textShadowRadius: 5,
            }}
            color="white"
          >
            Wallpaper
          </Button>
          <Button
            onPress={openShareDialogAsync}
            disabled={isSharing || !downloadedImage}
            loading={isSharing}
            mode="text"
            icon="share"
            labelStyle={{
              textTransform: "capitalize",
              textShadowColor: "black",
              textShadowRadius: 5,
            }}
            color="white"
          >
            Share
          </Button>
        </View>
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
