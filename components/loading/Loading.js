import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/Logo/logo.png')}
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
      />
      <ActivityIndicator animating={true} color="#ff6840" style={styles.indicator} />
      <Text style={styles.text}>Mayoristas Express...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  indicator: {
    marginBottom: 16,
    // Ajusta el tamaño del indicador aquí
    transform: [{ scale: 3}], // Cambia el valor de scale para aumentar o disminuir el tamaño del indicador
  },
  text: {
    marginTop: 36,
  },
});

export default Loading;
