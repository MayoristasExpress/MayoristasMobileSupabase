import React from "react";
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MayoristasPage = () => {
  const route = useRoute();
  const { avatarUrl } = route.params;

  const mayoristaUbicacion = {
    latitude: 37.78825, // Latitud del mayorista elegido
    longitude: -122.4324, // Longitud del mayorista elegido
  };

  const handleEnvelopePress = () => {
    // Acción a realizar cuando se presiona el icono de sobre
    console.log("Se presionó el icono de sobre");
  };

  const handleWhatsappPress = () => {
    // Acción a realizar cuando se presiona el icono de WhatsApp
    console.log("Se presionó el icono de WhatsApp");
  };

  const handlePhonePress = () => {
    // Acción a realizar cuando se presiona el icono de teléfono
    console.log("Se presionó el icono de teléfono");
  };

  const handleFilterPress = () => {
    // Acción a realizar cuando se presiona el icono de filtro
    console.log("Se presionó el icono de filtro");
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}></View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: mayoristaUbicacion.latitude,
            longitude: mayoristaUbicacion.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={mayoristaUbicacion} />
        </MapView>
      </View>
      <Image source={{ uri: `https://gvtqrhqslwauidfkmmyf.supabase.co/storage/v1/object/public/avatars/${avatarUrl}` }} style={styles.avatar} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEnvelopePress}>
          <Icon name="envelope" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWhatsappPress}>
          <Icon name="whatsapp" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePhonePress}>
          <Icon name="phone" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Icon name="filter" size={24} color="black" />
          <Text style={styles.filterText}>Filtro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f1f1f1",
  },
  carouselContainer: {
    height: 200,
    marginBottom: 10,
  },
  mapContainer: {
    marginTop: -150, // Ajusta la cantidad de espacio en la parte superior
    height: windowHeight * 0.3, // El 30% de la altura de la pantalla
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  avatar: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonContainer: {
    marginTop: 25,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  filterText: {
    marginLeft: 5,
  },
});

export default MayoristasPage;
