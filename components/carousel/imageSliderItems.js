import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



const ImageSliderItem = ({ image }) => {
  return (
    <View style={styles.sliderItemContainer}>
      <Image style={styles.sliderItemImage} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageSliderItem;
