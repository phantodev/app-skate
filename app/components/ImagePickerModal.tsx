import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Trash2 } from "lucide-react-native";
// import { Image } from "expo-image";

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (images: string[]) => void;
}

export default function ImagePickerModal(props: ImagePickerModalProps) {
  const [images, setImages] = React.useState<string[]>([]);
  const windowWidth = Dimensions.get("window").width;
  const imageWidth = (windowWidth - 48) / 2;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImages((prevImages) => [
        ...prevImages,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  function handleUpdateImages() {
    props.onImageSelected(images);
    props.onClose();
  }

  return (
    <Modal animationType="slide" transparent={false} visible={props.visible}>
      <View className="p-4 w-full flex flex-col justify-between flex-1">
        <View className="flex flex-row w-full">
          <TouchableHighlight
            onPress={pickImage}
            className="flex-1 h-12 mr-1 flex justify-center items-center text-md rounded-md bg-slate-800 text-white"
          >
            <Text className="text-white">Foto Galeria</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={takePhoto}
            className="flex-1 h-12 ml-1 flex justify-center items-center text-md rounded-md bg-slate-800 text-white"
          >
            <Text className="text-white">Tirar Foto</Text>
          </TouchableHighlight>
        </View>
        <ScrollView className="flex-1 mt-4">
          <View className="flex flex-row flex-wrap gap-3">
            {images.map((uri, index) => (
              <View
                key={index}
                className="relative mb-1"
                style={{ width: imageWidth, height: imageWidth }}
              >
                <Image
                  source={{ uri }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                ></Image>
                <Pressable
                  onPress={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-slate-800 rounded-full p-2"
                >
                  <Trash2 size={20} color="white" />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="flex flex-col">
          <TouchableHighlight
            onPress={handleUpdateImages}
            className="w-full h-12 flex justify-center items-center text-md rounded-md bg-slate-800 text-white"
          >
            <Text className="text-white">Concluído</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={props.onClose}
            className="w-full h-12 flex justify-center items-center text-md rounded-md"
          >
            <Text className="text-slate-800">Cancelar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}
