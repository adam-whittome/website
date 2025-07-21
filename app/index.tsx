import Background from "@/components/background";
import Title from "@/components/title";
import { Colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <Background style={styles.container}>
      <View style={styles.titleContainer}>
        <Title text="adamwhitto.me" />
      </View>
      <View style={styles.peninsula}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Hello, I am Adam Whittome - welcome to the homepage of my website!
            Check out the links below.
          </Text>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center"
  },
  peninsula: {
    flex: 2,
    backgroundColor: Colors.backgroundLight,
    width: 900,
    padding: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  descriptionContainer: {
    width: "100%"
  },
  descriptionText: {
    color: Colors.foreground,
    fontFamily: "FiraSans",
    fontSize: 25,
    flexWrap: "wrap"
  }
})
