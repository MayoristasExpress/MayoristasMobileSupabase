import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, FlatList, ImageBackground, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LocationContext } from '../../context/LocationContext';

const MayoristasCarousel = ({ onPress, searchQuery }) => {
  const navigation = useNavigation();
  const { dataMayoristas, location, calculateDistance } = useContext(LocationContext);
  
  const filteredData = dataMayoristas.filter(mayorista =>
    mayorista.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <ScrollView horizontal>
        <View style={styles.container}>
          <FlatList
            data={filteredData}
            renderItem={renderMayoristaItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </ScrollView>
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
});

export default MayoristasCarousel;
