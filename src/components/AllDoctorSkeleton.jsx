import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const AllDoctorSkeleton = () => (
  <View style={{ flexDirection: "column" }}>
    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 5, marginTop: 10, marginBottom: 15 }}>
        
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 380, height: 150, borderRadius: 10, }} />
        </View>
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "cloumn", alignItems: "center", marginLeft: 5, marginTop: 10, marginBottom: 15 }}>
        
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 380, height: 150, borderRadius: 10, }} />
        </View>
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "cloumn", alignItems: "center", marginLeft: 5, marginTop: 10, marginBottom: 15 }}>
        
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 380, height: 150, borderRadius: 10, }} />
        </View>
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
      </View>
    </SkeletonPlaceholder>
    <SkeletonPlaceholder backgroundColor="#E5E4E2">
      <View style={{ flexDirection: "cloumn", alignItems: "center", marginLeft: 5, marginTop: 10, marginBottom: 15 }}>
        
        <View style={{ flexDirection: "row", alignItems: "center", height: 150 , marginBottom: 15 }}>
          <View style={{ width: 380, height: 150, borderRadius: 10, }} />
        </View>
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
        <View style={{ width: 380, height: 15, borderRadius: 4, marginBottom: 10 }} />
      </View>
    </SkeletonPlaceholder>

  
  </View>
);

export default AllDoctorSkeleton;
