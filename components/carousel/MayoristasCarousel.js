import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, FlatList, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../../context/LocationContext';

const MayoristasCarousel = ({ onPress, searchQuery }) => {
  const navigation = useNavigation();
  const { dataMayoristas, location, datosLocation } = useContext(LocationContext);
  
  const filteredData = dataMayoristas.filter(mayorista =>
    mayorista.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  const handlePressMayo = (avatarUrl) => {
    navigation.navigate('Mayoristas', { avatarUrl });
  };

  const renderMayoristaItem = ({ item }) => {
  const distance = calculateDistance(location.coords.latitude, location.coords.longitude, item.distributors.latitude, item.distributors.longitude);

  const filteredData = dataMayoristas.filter((mayorista) =>
        mayorista.full_name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
      <View style={styles.carouselItem}>
        <Image source={{ uri: `https://gvtqrhqslwauidfkmmyf.supabase.co/storage/v1/object/public/avatars/${item.avatar_url}` }} style={styles.avatar} />
        <Text style={styles.fullName}>{item.full_name}</Text>
        <Text style={styles.distance}>{distance.toFixed(2)} km</Text>
        <Button title="Ir" onPress={() => handlePressMayo(item.avatar_url)} />
      </View>
    );
  };

      
  const keyExtractor = (item) => item.distributors.id.toString();

  return (
    <ImageBackground
      source={require('../../assets/gato.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView horizontal>
        <View style={styles.container}>
          <FlatList
            data={filteredData}
            renderItem={renderMayoristaItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
  },
  carouselItem: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  fullName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  distance: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MayoristasCarousel;
