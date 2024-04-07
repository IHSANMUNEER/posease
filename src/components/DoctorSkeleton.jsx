import React from "react";
import { View, Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const DoctorSkeletonLoader = () => (
  <View style={{ flexDirection: "row" }}>
    
    <View style={{ flex: 1 }}>
      <SkeletonPlaceholder backgroundColor="#E5E4E2">
        <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 15, marginTop: 10, marginBottom: 15 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 5 }} />
          <Text style={{ width: 140, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <Text style={{ width: 100, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={{ width: 10, height: 10, borderRadius: 10, marginRight: 5 }} />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>

    <View style={{ flex: 1,  }}>
      <SkeletonPlaceholder backgroundColor="#E5E4E2">
        <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 15, marginTop: 10, marginBottom: 15  }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 5 }} />
          <Text style={{ width: 140, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <Text style={{ width: 100, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={{ width: 10, height: 10, borderRadius: 10, marginRight: 5 }} />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
    
    <View style={{ flex: 1 }}>
      <SkeletonPlaceholder backgroundColor="#E5E4E2">
        <View style={{ flexDirection: "column", alignItems: "center", marginLeft: 15, marginTop: 10, marginBottom: 15 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 5 }} />
          <Text style={{ width: 140, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <Text style={{ width: 100, height: 15, borderRadius: 4, marginBottom: 5 }} />
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
            {[...Array(3)].map((_, index) => (
              <View key={index} style={{ width: 10, height: 10, borderRadius: 10, marginRight: 5 }} />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  </View>
);

export default DoctorSkeletonLoader;
