import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const SkeletonLoader = () => (
  <View style={{ flexDirection: "row" }}>
    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 15, marginTop: 10, marginBottom: 15 }}>
        <View style={{ width: 200, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 170, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 200, height: 150, borderRadius: 10, }} />
        </View>
      </View>
    </SkeletonPlaceholder>

    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 15, marginTop: 10, marginBottom: 15 ,marginRight: 15}}>
        <View style={{ width: 180, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 150, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 180, height: 150, borderRadius: 10, }} />
        </View>
      </View>
    </SkeletonPlaceholder>
  </View>
);

export default SkeletonLoader;
