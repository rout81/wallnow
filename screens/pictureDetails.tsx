import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useQuery } from "react-query";
import { useGetPhotoDetailsQuery } from "../redux/services/photos";
import { FAB, Portal, Provider } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function PictureDetails({ route, navigation }) {
  const { id } = route.params;
  const [open, setOpen] = useState(false)
  const { data, error, isLoading } = useGetPhotoDetailsQuery(id);

  const onStateChange = () => setOpen(!open);

  const downloadImage = () => {
    const uri = data?.src?.original
    const name = data?.url?.split('/')?.slice(-2,-1)?.[0] ||`img${data?.id}`
    const fileUri = FileSystem.documentDirectory + name
    FileSystem.downloadAsync(uri,fileUri).then(({uri}) => saveFile(uri) )
  }

  const saveFile = async (fileUri: string) => {
    console.log('hello')
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log({status})
    if(status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
  }

  if (isLoading)
    return <ActivityIndicator animating={true} style={{flex:1,alignItems:'center'}} size="large" color={Colors.red800} />;
  if (data)
    return (
      <View>
        <Image
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
          source={{ uri: data?.src?.large2x }}
        />
         <Portal>
        <FAB.Group
        visible
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'share',
              onPress: () => console.log('Pressed share'),
            },
            {
              icon: 'download',
              onPress: downloadImage,
            },
            {
              icon: 'wallpaper',
              onPress: () => console.log('Pressed wallpaper'),
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
      </View>
    );
}
