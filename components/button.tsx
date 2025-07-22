import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { Easing, interpolateColor, SharedValue, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Button(
  { children, style, color, hoverColor, onPress }:
  { children?: ReactNode, style?: StyleProp<ViewStyle>, color: string, hoverColor: string,
    onPress?: ((event: GestureResponderEvent) => void) | SharedValue<((event: GestureResponderEvent) => void) | null | undefined> | null | undefined
   }
) {
  const hoverProgress = useSharedValue(0)
  const glow = useSharedValue(0)
  const buttonHoverColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(hoverProgress.value, [0, 1], [color, hoverColor]),
    boxShadow: `0px 0px ${glow.value}px ${hoverColor}`
  }))
  return (
    <AnimatedPressable
      style={[buttonHoverColorStyle, styles.container, style]}
      onPress={onPress}
      onHoverIn={() => {
        hoverProgress.value = withTiming(1, {
          duration: 100,
          easing: Easing.linear
        })
        glow.value = withTiming(20, {
          duration: 500,
          easing: Easing.out(Easing.back(3))
        })
      }}
      onHoverOut={() => {
        hoverProgress.value = withTiming(0, {
          duration: 200,
          easing: Easing.linear
        })
        glow.value = withTiming(0, {
          duration: 200,
          easing: Easing.linear
        })
      }}
    >
      {children}
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
})
