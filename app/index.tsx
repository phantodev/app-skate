import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { style } from "../assets/css/global";
import { Image } from "expo-image";
// import styled from "styled-components/native";

// const CustomButton = styled.TouchableOpacity`
//   background-color: #3498db;
//   border-radius: 10px;
//   width: 100%;
//   height: 48px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const CustomeTextButtton = styled.Text`
//   color: #ffffff;
// `;

// const CustomContainer = styled.View`
//   flex: 1;
//   background-color: #c3c3c3;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
// `;

// const InputContainer = styled.View`
//   display: flex;
//   flex-direction: column;
//   gap: 2px;
//   width: 100%;
// `;
// const InputLabel = styled.Text`
//   font-size: 14px;
//   font-weight: bold;
//   color: #000000;
// `;

// const CustomInput = styled.TextInput`
//   font-size: 14px;
//   font-weight: bold;
//   color: #000000;
//   border: solid 2px #000000;
//   border-radius: 10px;
//   padding: 5px;
//   width: 100%;
//   height: 48px;
// `;

export default function Login() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-700">
      <View className="w-full h-40 flex justify-center items-center">
        <Image
          className="w-40 h-40"
          source={require("../assets/images/logo-skate-spot.webp")}
          contentFit="cover"
          transition={1000}
        ></Image>
      </View>
      <View className="flex flex-col p-10"></View>
      <View>
        <TouchableHighlight className="bg-slate-800 px-4 py-2 rounded-md">
          <Text className="text-white">Não tem cadastro? Aperte aqui</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
