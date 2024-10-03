import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function ExploreLayout() {
  const colorScheme = useColorScheme();

  const getHeaderStyle = () => ({
    backgroundColor:
      colorScheme === "dark" ? "rgb(30,41,59)" : "rgba(220,220,220,0.5)",
  });

  const getHeaderTintStyle = () =>
    colorScheme === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Lista de Spots" }}
      ></Stack.Screen>
      <Stack.Screen
        name="add-spot"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          title: "Detalhes do spot",
          headerStyle: getHeaderStyle(),
          headerTintColor: getHeaderTintStyle(),
        }}
      ></Stack.Screen>
    </Stack>
  );
}
