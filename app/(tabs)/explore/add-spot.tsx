import React from "react";
import {
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { db } from "@/configs/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import ImagePickerModal from "@/app/components/ImagePickerModal";

type FormData = {
  spotName: string;
  street: string;
  city: string;
  state: string;
};

export default function AddSpotScreen() {
  const [status, setStatus] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const router = useRouter();
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useMutation({
    mutationKey: ["post-spot"],
    mutationFn: async (data: FormData) => {
      setStatus(true);
      await addDoc(collection(db, "spot"), {
        spotName: data.spotName,
        street: data.street,
        city: data.city,
        state: data.state,
      });
    },
    onSuccess: () => {
      reset();
      Toast.show({
        type: "success",
        text1: "Cadastro",
        text2: "Spot cadastrado com sucesso! 😉",
      });
      router.back();
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Cadastro",
        text2: "Chame o suporte por favor! 🥵",
      });
    },
  });

  function handleImagesSelected() {
    console.log("ENTROU AQUI");
  }

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-slate-700">
      <ImagePickerModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onImageSelected={handleImagesSelected}
      />
      <View className="flex flex-col p-10 w-full">
        <Controller
          name="spotName"
          control={control}
          rules={{
            required: "Nome spot obrigatório",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">
                Nome do spot
              </Text>
              <TextInput
                className={`${
                  errors.spotName
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Digite o nome do spot"
              ></TextInput>
              {errors.spotName && (
                <Text className="text-red-500">{errors.spotName.message}</Text>
              )}
            </View>
          )}
        />
        <Controller
          name="street"
          rules={{
            required: "Rua obrigatória",
            minLength: {
              value: 6,
              message: "A rua deve ter no mímino 6 caracteres",
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">
                Nome da rua
              </Text>
              <TextInput
                className={`${
                  errors.street
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Digite a rua"
              ></TextInput>
              {errors.street && (
                <Text className="text-red-500">{errors.street.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          name="city"
          rules={{
            required: "Cidade obrigatória",
            minLength: {
              value: 6,
              message: "A cidade deve ter no mímino 6 caracteres",
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">
                Nome da cidade
              </Text>
              <TextInput
                className={`${
                  errors.city
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Digite a cidade"
              ></TextInput>
              {errors.city && (
                <Text className="text-red-500">{errors.city.message}</Text>
              )}
            </View>
          )}
        />

        <Controller
          name="state"
          rules={{
            required: "Estado obrigatório",
            minLength: {
              value: 2,
              message: "O estado deve ter no mímino 2 caracteres",
            },
          }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="mb-4">
              <Text className="text-gray-700 dark:text-white mb-2">
                Sigla do estado
              </Text>
              <TextInput
                className={`${
                  errors.state
                    ? "bg-rose-200 border-rose-300"
                    : "bg-gray-100 border-gray-300"
                } border-2 rounded-lg p-3`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Digite a sigla do estado"
              ></TextInput>
              {errors.state && (
                <Text className="text-red-500">{errors.state.message}</Text>
              )}
            </View>
          )}
        />
        <TouchableHighlight
          className="w-full rounded-lg p-5 mt-4 mb-4 bg-slate-800"
          onPress={() => setModalOpen(true)}
        >
          <Text className="text-white text-center font-semibold">
            Escolher fotos do Spot
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="w-full rounded-lg p-5 mt-4 mb-4 bg-slate-800"
          onPress={handleSubmit((data: FormData) => mutation.mutate(data))}
        >
          {!status ? (
            <Text className="text-white text-center font-semibold">
              Cadastrar
            </Text>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableHighlight>
      </View>

      <View>
        <TouchableHighlight
          className="px-4 py-2 rounded-md"
          onPress={() => router.back()}
        >
          <Text className="text-white">Cancelar cadastro</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
