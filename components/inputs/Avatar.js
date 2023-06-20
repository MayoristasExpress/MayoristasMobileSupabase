
import React from "react";
import { Image, View } from "react-native";

export default function Avatars1({ uri, size = 32 }) {
  const containerStyles = {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles = {
    height: size,
    width: size,
    borderRadius: size / 2,
    resizeMode: "cover",
  };

  return (
    <View style={containerStyles}>
      {uri ? (
        <Image source={{ uri }} style={imageStyles} />
      ) : (
        <View style={imageStyles} />
      )}
    </View>
  );
}

