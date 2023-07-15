import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';

const CarouselOferHome = () => {
  const scrollViewRef = useRef(null);
  const imageWidth = 500;
  const images = [
    { source: require('../../assets/sliders/1.jpg'), extension: 'jpg' },
    { source: require('../../assets/sliders/2.jpg'), extension: 'jpg' },
    { source: require('../../assets/sliders/3.jpeg'), extension: 'jpeg' },
    { source: require('../../assets/sliders/4.jpeg'), extension: 'jpeg' },
    { source: require('../../assets/sliders/5.png'), extension: 'png' },
    // Agrega más imágenes aquí con sus extensiones correspondientes
  ];
  const imageCount = images.length;
  let currentIndex = 0;

  const scrollToNextImage = () => {
    currentIndex = (currentIndex + 1) % imageCount;
    const offsetX = currentIndex * imageWidth;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  };

  const scrollToPreviousImage = () => {
    currentIndex = (currentIndex - 1 + imageCount) % imageCount;
    const offsetX = currentIndex * imageWidth;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollToNextImage, 9000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={(event) => {
          const { contentOffset } = event.nativeEvent;
          currentIndex = Math.round(contentOffset.x / imageWidth);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {images.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image style={styles.carouselImage} source={image.source} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigationButtonContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={scrollToPreviousImage}>
          <Text style={styles.navigationButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={scrollToNextImage}>
          <Text style={styles.navigationButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  scrollViewContent: {
    paddingRight: 10,
  },
  imageContainer: {
    width: 500,
    height: 250,
    marginRight: 10,
  },
  carouselImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  navigationButtonContainer: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  navigationButton: {
    borderRadius: 60,
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  navigationButtonText: {
    height: 40,
    width: 40,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CarouselOferHome;
