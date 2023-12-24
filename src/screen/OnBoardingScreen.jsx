import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBase,
} from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import colours from "../components/colors";
import profileScreen from './ProfileScreen';
import subscribe from './Subscribe';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? colours.primary : colours.text;

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text
      style={{
        fontSize: 16,
        color: colours.primary,
        marginLeft: 15,
      }}
    >
      Skip
    </Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text
      style={{
        fontSize: 16,
        color: colours.primary,
        marginRight: 15,
      }}
    >
      Next
    </Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
    <Text
      style={{
        fontSize: 16,
        color: colours.primary,
        marginRight: 15,
      }}
    >
      Done
    </Text>
  </TouchableOpacity>
);

const OnBoardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      bottomBarHeight={40}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace("Signup")}
      onDone={() => navigation.replace("Signup")}
      pages={[
        {
          backgroundColor: colours.secondary,
            image: <Image style={styles.image} source={require('../Images/logo.png')} />,
          title: (
            <Text style={styles.title}>
             PosEase
            </Text>
          ),
          subtitle: (
            <Text style={styles.text}>
             Empowering Posture Excellence: Unleashing the Power of Pose Detection for Holistic Well-being and Personal Growth.
            </Text>
          ),
        },
        {
          backgroundColor: colours.secondary,
            image: <Image style={styles.image} source={require('../assets/1.png')} />,
          title: <Text style={styles.title}>Track Your Workout Activity</Text>,
          subtitle: (
            <Text style={styles.text}>
              Stay motivated and monitor your fitness progress with ease, keeping tabs on your exercise routines and goals effortlessly
            </Text>
          ),
        },
        
        {
          backgroundColor: colours.secondary,
            image: <Image style={styles.image} source={require('../assets/3.png')} />,
          title: <Text style={styles.title}>Big Goals</Text>,
          subtitle: (
            <Text style={styles.text}>
              Set ambitious aspirations and pursue your dreams
            </Text>
          ),
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor:colours.secondary,
  },
  image: {
    height: 200,
    width: 200,
    marginTop: -100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    color: colours.primary,
    fontWeight: 'bold'
  },
  text: {
    color: colours.text,
    textAlign: "center",
    paddingHorizontal: 20,
    marginHorizontal:40,
    marginTop:10,
  },
});
