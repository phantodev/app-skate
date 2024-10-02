import { Link, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase";
import React from "react";
import { Href } from "expo-router";
import { Image } from "expo-image";
import { Plus, Trash2 } from "lucide-react-native";
import { useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

type Spot = {
  id: string;
  spotName: string;
  street: string;
  city: string;
  state: string;
  imageUrls: string[];
  createdAt: Date;
};

const SpotCard = React.memo(
  ({
    item,
    onPress,
    onDelete,
  }: {
    item: Spot;
    onPress: () => void;
    onDelete: () => void;
  }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isDeleting, setIsDeleting] = React.useState(false);

    function handleDelete() {
      try {
        setIsDeleting(true);
        onDelete();
      } catch (error) {
        setIsDeleting(false);
      }
    }

    return (
      <TouchableHighlight
        onPress={onPress}
        className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden"
      >
        <View>
          <View className="w-full h-48 relative">
            <Image
              source={{ uri: item.imageUrls[0] }}
              className="w-full h-full"
              contentFit="cover"
              transition={1000}
              cachePolicy="memory-disk"
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            ></Image>
            {isLoading && (
              <View className="absolute top-0 right-0 left-0 bottom-0 justify-center items-center bg-white">
                <ActivityIndicator
                  size="large"
                  color="#000000"
                ></ActivityIndicator>
              </View>
            )}
          </View>
          <View className="p-4">
            <Text className="text-lg font-bold text-slate-700">
              {item.spotName}
            </Text>
            <Text className="text-sm font-bold text-slate-700">
              {item.street}- {item.city}/{item.state}
            </Text>
            <TouchableHighlight
              className="bg-red-500 rounded-md mt-4"
              onPress={handleDelete}
            >
              <View className="flex flex-row justify-center items-center h-10">
                <Trash2 size={20} color="white" />
                {!isDeleting ? (
                  <Text className="ml-2 text-white font-semibold">
                    Excluir spot
                  </Text>
                ) : (
                  <ActivityIndicator color="white" />
                )}
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
);

const fetchSpots = async (): Promise<Spot[]> => {
  const spotCollection = collection(db, "spot");
  const spotSnapshot = await getDocs(spotCollection);
  return spotSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Spot)
  );
};

export default function ExploreScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const data = [];

  const {
    data: listSpot,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["list-spots"],
    queryFn: fetchSpots,
  });

  React.useEffect(() => {
    console.log(listSpot);
  }, [listSpot]);

  const handleDeleteSpot = React.useCallback(
    async (spotId: string) => {
      try {
        await deleteDoc(doc(db, "spot", spotId));
        queryClient.invalidateQueries({ queryKey: ["list-spots"] });
        Toast.show({
          type: "success",
          text1: "Exclusão",
          text2: "Spot exlcuído com sucesso! 😉",
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Exclusão",
          text2: "Não foi possível excluir! 😉",
        });
      }
    },
    [queryClient]
  );

  const renderSpotCard = React.useCallback(
    ({ item }: { item: Spot }) => (
      <SpotCard
        item={item}
        onPress={() => router.push(`/(tabs)/explore/${item.id}` as Href)}
        onDelete={() => {
          Alert.alert(
            "Deletar spot?",
            "Você tem certeza que deseja excluir esse spot?",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Deletar", onPress: () => handleDeleteSpot(item.id) },
            ]
          );
        }}
      />
    ),
    [router, handleDeleteSpot]
  );

  if (isLoading) {
    return (
      <View className="flex-1 bg-white flex justify-center items-center px-10">
        <LottieView
          source={require("../../../assets/skate.json")}
          style={{ width: 350, height: 350, marginTop: -150 }}
          autoPlay
          loop
        />
        <Text className="text-slate-800 text-2xl"> Carregando spots</Text>
        <Text className="text-slate-800 text-center">
          Aguarde mano, estamos conectando na sua região e vendo os pontos de
          skate para você lançar aquela manobra!
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-600 pt-6">
      <View className="px-4 pb-24">
        <FlatList
          data={listSpot}
          renderItem={renderSpotCard}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>

      <TouchableHighlight
        style={{ elevation: 3 }}
        onPress={() => router.push("/explore/add-spot")}
        className="absolute bottom-24 right-8 bg-purple-700 rounded-full w-20 h-20 flex justify-center items-center"
      >
        <Plus color="white" size={32} />
      </TouchableHighlight>
    </View>
  );
}
