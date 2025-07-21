import Background from "@/components/background";
import Title from "@/components/title";
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <Background>
      <View style={styles.titleContainer}>
        <Title text="adamwhitto.me" />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})
