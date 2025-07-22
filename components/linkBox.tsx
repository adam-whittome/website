import { Colors } from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import Button from "./button";

export enum LinkBoxArrangement {
  Left,
  Right
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function LinkBox(
  { children, style, arrangement, title, description, buttonText }:
  { children?: ReactNode, style?: StyleProp<ViewStyle>, arrangement: LinkBoxArrangement,
    title?: string, description?: ReactNode, buttonText?: string }
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
            onPress={() => {
              
            }}
          >
            <Text style={[styles.text, styles.buttonText]}>{buttonText}</Text>
            <FontAwesome name="gamepad" size={20}/>
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
    fontWeight: "bold",
    marginRight: 10
  }
})
