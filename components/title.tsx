import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

function randomBool(probability: number) {
  return Math.random() < probability
}

export default function Title({ text }: { text: string }) {
  return (
    <View style={styles.titleContainer}>
      {Array.from(Array.from(text).entries().map(([index, char]) => {
        const delay = 500 * Math.random()
        const y = useSharedValue(randomBool(0.5) ? 50 : -50);
        y.value = withDelay(delay, withTiming(0, {
          duration: 1000,
          easing: Easing.out(Easing.cubic)
        }))
        const opacity = useSharedValue(0);
        opacity.value = withDelay(delay, withTiming(1, {
          duration: 1000,
          easing: Easing.out(Easing.cubic)
        }))
        return (
          <Animated.View style={{ top: y, opacity: opacity }}>
            <Text key={index} style={styles.text}>{char}</Text>
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
