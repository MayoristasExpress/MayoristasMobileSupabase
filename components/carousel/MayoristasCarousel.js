import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import { LocationContext } from '../../context/LocationContext';
import { useNavigation } from '@react-navigation/native';

const MayoristasCarousel = () => {
  const { dataMayoristas, datosLocation } = useContext(LocationContext);
  const navigation = useNavigation();

  // Obtener el mayorista más cercano
  const mayoristaCercano = datosLocation.length > 0 ? datosLocation[0] : null;

  const renderMayoristaItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetallesMayorista', { mayorista: item })}
        style={styles.carouselItem}
      >
        <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
        <Text style={styles.fullName}>{item.full_name}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.distributors.id.toString();

  return (
    <View style={styles.container}>
      <Text style={styles.carouselTitle}>Mayoristas Cercanos</Text>
      <FlatList
        horizontal
        data={dataMayoristas}
        renderItem={renderMayoristaItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300, // Ajusta la altura del contenedor según tus necesidades
    backgroundColor: 'skyblue',
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
    width: 250,
    height: 250,
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  fullName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MayoristasCarousel;
