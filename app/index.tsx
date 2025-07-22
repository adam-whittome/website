import Background from "@/components/background";
import LinkBox, { LinkBoxArrangement, styles as linkBoxStyles } from "@/components/linkBox";
import Title from "@/components/title";
import { Colors } from "@/constants/colors";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Linking, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [assets, error] = useAssets([
    require("../assets/icons/controller.svg"), require("../assets/images/shuffle_scuffle.png"),
  ])
  const router = useRouter();
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
        <View style={styles.linksContainer}>
          <LinkBox
            style={styles.linkBox}
            arrangement={LinkBoxArrangement.Right}
            title="Shuffle Scuffle"
            description='A puzzle game I made in 48 hours for the GMTK game jam with the theme "Joined Together".
                         Made with PICO-8: a fantasy console with retro limitations for making and playing small games.'
            buttonText="Play"
            onPress={() => { Linking.openURL("https://www.lexaloffle.com/bbs/?tid=43326") }}
            buttonIconSource={assets ? assets[0].uri! : ""}
          >
            <Image
              style={[styles.image, assets ? {
                height: styles.linkBox.height - 2 * linkBoxStyles.container.padding,
                width: assets[1].width! * (styles.linkBox.height - 2 * linkBoxStyles.container.padding) / assets[1].height!
              } : {}]}
              source={assets ? assets[1].uri : undefined}
            />
          </LinkBox>
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
    width: "100%",
    marginBottom: 15
  },
  descriptionText: {
    color: Colors.foreground,
    fontFamily: "FiraSans",
    fontSize: 20,
    flexWrap: "wrap"
  },
  linksContainer: {

  },
  image: {
    borderRadius: 15
  },
  linkBox: {
    marginVertical: 10,
    height: 250
  }
})
