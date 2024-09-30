import React from "react";
import { Text, TouchableHighlight, View, TextInput, Alert } from "react-native";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/firebase";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

type FormData = {
  email: string;
  password: string;
};

export default function Signup() {
  const [status, setStatus] = React.useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      setStatus(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      setStatus(false);
      Toast.show({
        type: "error",
        text1: "Erro no login",
        text2: "Credenciais inválidas! 🥵",
      });
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-700">
      <View className="flex flex-col p-10 w-full">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail inválido",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">E-mail</Text>
              <TextInput
                className={`${
                  errors.email
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Seu e-maill"
              ></TextInput>
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          name="password"
          rules={{
            required: "Senha obrigatória",
            minLength: {
              value: 6,
              message: "A senha de ter no mímino 6 caracteres",
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">Senha</Text>
              <TextInput
                className={`${
                  errors.password
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Sua senha"
                secureTextEntry
              ></TextInput>
              {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
              )}
            </View>
          )}
        />
        <TouchableHighlight
          className="w-full rounded-lg p-5 mt-4 mb-4 bg-slate-800"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold">
            Cadastrar
          </Text>
        </TouchableHighlight>
      </View>

      <View>
        <TouchableHighlight
          className="px-4 py-2 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white">Ja tenho cadastro</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
