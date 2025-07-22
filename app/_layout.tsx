import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "FiraSans": require("../assets/fonts/FiraSans.ttf")
  })

  return <ThemeProvider value={DarkTheme}>
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" options={{ title: "adamwhitto.me" }} />
    </Stack>
  </ThemeProvider>
}
