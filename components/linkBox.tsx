import { Colors } from "@/constants/colors";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import Button from "./button";

export enum LinkBoxArrangement {
  Left,
  Right
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function LinkBox(
  { children, style, arrangement, title, description, buttonText, buttonIconSource, onPress }:
  { children?: ReactNode, style?: StyleProp<ViewStyle>, arrangement: LinkBoxArrangement, title?: string, description?: ReactNode, buttonText?: string, buttonIconSource?: string
    onPress?: ((event: GestureResponderEvent) => void) | SharedValue<((event: GestureResponderEvent) => void) | null | undefined> | null | undefined }
) {
  return (
    <View style={[style, styles.container]}>
      {arrangement == LinkBoxArrangement.Left ? (
        <View style={{ marginRight: styles.childrenContainer.marginHorizontal }}>
          {children}
        </View>
      ) : null}
      <View style={styles.informationContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.titleText]}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} color={styles.button.backgroundColor} hoverColor={styles.buttonHover.backgroundColor}
            onPress={onPress}
          >
            <Text style={[styles.text, styles.buttonText]}>{buttonText}</Text>
            { buttonIconSource ? <Image style={styles.icon} source={buttonIconSource}/> : null }
          </Button>
        </View>
      </View>
      {arrangement == LinkBoxArrangement.Right ? (
        <View style={{ marginLeft: styles.childrenContainer.marginHorizontal }}>
          {children}
        </View>
      ) : null}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 30,
    backgroundColor: Colors.backgroundDark,
  },
  childrenContainer: {
    marginHorizontal: 20
  },
  informationContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1
  },
  text: {
    fontSize: 20,
    color: Colors.foreground,
    fontFamily: "FiraSans",
    flexWrap: "wrap"
  },
  titleText: {
    color: Colors.accentSecondary,
    fontWeight: "bold",
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    borderRadius: 10000,
    backgroundColor: Colors.accentSecondary,
    padding: 10
  },
  buttonHover: {
    backgroundColor: Colors.accentPrimary
  },
  buttonText: {
    color: Colors.backgroundLight,
    fontWeight: "bold"
  },
  icon: {
    width: 30,
    height: 20,
    marginLeft: 10
  }
})
