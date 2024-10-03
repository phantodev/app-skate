import { db } from "@/configs/firebase";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, query } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { Ban } from "lucide-react-native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";

type Spot = {
  id: string;
  spotName: string;
  street: string;
  city: string;
  state: string;
  createdAt: Date;
  imageUrls: string[];
};

const fetchSpotDetails = async (id: string): Promise<Spot> => {
  const spotDoc = doc(db, "spot", id);
  const spotSnapshot = await getDoc(spotDoc);
  if (!spotSnapshot.exists()) {
    throw new Error("Spot não encontrado!");
  }
  return { id: spotSnapshot.id, ...spotSnapshot.data() } as Spot;
};

export default function SpotDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: spotDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["spot", id],
    queryFn: () => fetchSpotDetails(id),
  });

  if (isLoading) {
    return (
      <View className="flex-1 bg-white flex justify-center items-center px-10">
        <LottieView
          source={require("../../../assets/skate.json")}
          style={{ width: 350, height: 350, marginTop: -150 }}
          autoPlay
          loop
        />
        <Text className="text-slate-800 text-2xl"> Carregando spot</Text>
        <Text className="text-slate-800 text-center">
          Aguarde mano, estamos os detalhes deste skate spot para você obter
          mais informações.
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-white flex justify-center items-center px-10 -pt-20">
        <Ban color="#FF0000" size={200} />
        <Text className="text-slate-800 text-2xl"> Deu pau no sistema</Text>
        <Text className="text-slate-800 text-center">
          Mano, volte novamente mais tarde. Deu pau em nosso banco de dados.
          Desculpa ai!
        </Text>
      </View>
    );
  }

  if (!spotDetail) {
    return (
      <View className="flex-1 bg-white flex justify-center items-center px-10 -pt-20">
        <Ban color="#FF0000" size={200} />
        <Text className="text-slate-800 text-2xl"> Spot Não Encontrado</Text>
        <Text className="text-slate-800 text-center">
          Mano, volte novamente mais tarde. Deu pau em nosso banco de dados.
          Desculpa ai!
        </Text>
      </View>
    );
  }
  return (
    // <View className="flex justify-center items-center flex-1 bg-slate-600">
    //   <Text className="text-white"> O meu id do firebase: {id}</Text>
    // </View>
    <ScrollView className="flex-1 bg-white dark:bg-slate-600">
      <Image
        source={{ uri: spotDetail.imageUrls[0] }}
        className="w-full h-60"
        contentFit="cover"
      />
      <View className="p-4">
        <Text className="text-white text-2xl font-semibold">
          {spotDetail.spotName}
        </Text>
        <Text className="text-white">
          {spotDetail.city} - {spotDetail.state}
        </Text>
      </View>
    </ScrollView>
  );
}
