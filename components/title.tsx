import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

function quadraticInterpolation(a: number, b: number, l: number, x: number) {
  return 4 / (l * l) * (b - a) * x * (x - l) + b
}

export default function Title({ text }: { text: string }) {
  return (
    <View style={styles.titleContainer}>
      {Array.from(Array.from(text).entries().map(([index, char]) => {
        const delay = quadraticInterpolation(0, 400, text.length - 1, index);
        const y = useSharedValue(-30);
        y.value = withDelay(delay, withTiming(0, {
          duration: 1000,
          easing: Easing.out(Easing.cubic)
        }))
        const opacity = useSharedValue(0);
        opacity.value = withDelay(delay, withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.exp)
        }))
        return (
          <Animated.View key={index} style={{ top: y, opacity: opacity }}>
            <Text style={styles.text}>{char}</Text>
          </Animated.View>
        )
      }))}
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row"
  },
  text: {
    fontFamily: "FiraSans",
    color: Colors.accentPrimary,
    fontSize: 100,
    fontWeight: "bold",
    textShadowColor: Colors.accentPrimary,
    textShadowRadius: 40,
  }
})
