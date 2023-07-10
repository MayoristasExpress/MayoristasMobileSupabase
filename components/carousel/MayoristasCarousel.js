import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, FlatList, ImageBackground, Button } from 'react-native';
import { LocationContext } from '../../context/LocationContext';
import { useNavigation } from '@react-navigation/native';

const MayoristasCarousel = () => {
  const { dataMayoristas, datosLocation } = useContext(LocationContext);
  const navigation = useNavigation();
  console.log(dataMayoristas)
  // Obtener el mayorista más cercano
  const mayoristaCercano = datosLocation.length > 0 ? datosLocation[0] : null;

  const handlePressMayo = () => {
    navigation.navigate('Mayoristas');
  };
  
  const renderMayoristaItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={handlePressMayo}
        style={styles.carouselItem}
      >
        <Image source={{ uri:`https://gvtqrhqslwauidfkmmyf.supabase.co/storage/v1/object/public/avatars/${item.avatar_url}`}} style={styles.avatar} />
        <Text style={styles.fullName}>{item.full_name}</Text>
        <Button title="Ir" onPress={handlePressMayo} /> 
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.distributors.id.toString();

  return (
    <ImageBackground
      source={require('../../assets/gato.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <FlatList
          horizontal
          data={dataMayoristas}
          renderItem={renderMayoristaItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 310,
    justifyContent: 'center',
  },
  carouselTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  carouselItem: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 200,
    height: 150,
    resizeMode: "contain"
  },
  fullName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MayoristasCarousel;
