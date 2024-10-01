import Reactotron from "reactotron-react-native";

Reactotron.configure({ name: "MyApp" }) // Nome do seu app
  .useReactNative() // Adiciona os plugins do React Native
  .connect(); // Conecta ao aplicativo Reactotron

// Clear logs on every new app load
Reactotron.clear();

console.tron = Reactotron; // Para facilitar o uso do console.tron.log
