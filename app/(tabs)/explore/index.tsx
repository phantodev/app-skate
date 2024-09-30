import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { View, Text, TouchableHighlight } from "react-native";

export default function ExploreScreen() {
  const data = [];

  if (data.length === 0) {
    return (
      <View className="flex-1 bg-white flex justify-center items-center p-10">
        <LottieView
          source={require("../../../assets/skate.json")}
          style={{ width: 350, height: 350, marginTop: -150 }}
          autoPlay
          loop
        />
        <Text className="text-slate-800 text-2xl"> Nenhum spot cadatrado</Text>
        <Text className="text-slate-800 text-center">
          Cadastre um spot na plataforma e seja o primeiro a ganhar um selo de
          skatetista maneiro!
        </Text>
        <View className="w-full">
          <Link
            href="/explore/add-spot"
            className="flex justify-center"
            asChild
          >
            <TouchableHighlight className="w-full mt-4 bg-slate-800 h-14 rounded-lg flex justify-center items-center">
              <Text className="text-white">Cadastrar Spot</Text>
            </TouchableHighlight>
          </Link>
        </View>
      </View>
    );
  }
}
