import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments, Href } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";
import React from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../configs/firebase";
import "../configs/ReactotronConfig";
import { ReactQueryProvider } from "./components/ReactQueryProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (!isReady) return;

    const authRoute = "/(auth)/" as Href<string>;
    const tabsRoute: Href<string> = "/(tabs)";

    if (!user) {
      // Este if é necessário para fazer um redirecionamento apenas se o usuário NÃO estiver no conjunto (Auth)
      if (segments[0] !== "(auth)") {
        router.replace(authRoute);
      }
    } else {
      if (segments[0] === "(auth)") {
        router.replace(tabsRoute);
      }
    }
  }, [user, segments, isReady]);

  return setIsReady;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [user, setUser] = React.useState<User | null>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const setIsReady = useProtectedRoute(user);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsInitialized(true);
    });
    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (loaded && isInitialized) {
      SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [loaded, isInitialized]);

  if (!loaded || !isInitialized) {
    return null;
  }

  return (
    <ReactQueryProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Slot />
        <Toast />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
