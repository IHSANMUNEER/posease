import Lottie from "lottie-react-native";
import { View, Dimensions } from "react-native";
import colours from "./colors";
export default Loader = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        height: Dimensions.get("window").height,
        alignItems: "center",
        backgroundColor:colours.secondary,
      }}
    >
      <View style={{ width: 200, height: 200 }}>
        <Lottie source={require("../assets/loader.json")} autoPlay loop />
      </View>
    </View>
  );
};
