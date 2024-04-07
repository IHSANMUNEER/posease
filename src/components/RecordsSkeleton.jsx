import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const RecordsSkeleton = () => (
  <SkeletonPlaceholder backgroundColor="#E5E4E2">
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <View style={{ width: "90%", aspectRatio: 1.5, borderRadius: 10, marginBottom: 10 }} />
      <View style={{ width: "80%", height: 20, borderRadius: 4, marginBottom: 10 }} />
      <View style={{ width: "70%", height: 20, borderRadius: 4 }} />
    </View>
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <View style={{ width: "90%", aspectRatio: 1.5, borderRadius: 10, marginBottom: 10 }} />
      <View style={{ width: "80%", height: 20, borderRadius: 4, marginBottom: 10 }} />
      <View style={{ width: "70%", height: 20, borderRadius: 4 }} />
    </View>
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <View style={{ width: "90%", aspectRatio: 1.5, borderRadius: 10, marginBottom: 10 }} />
      <View style={{ width: "80%", height: 20, borderRadius: 4, marginBottom: 10 }} />
      <View style={{ width: "70%", height: 20, borderRadius: 4 }} />
    </View>
  </SkeletonPlaceholder>
);

export default RecordsSkeleton;
