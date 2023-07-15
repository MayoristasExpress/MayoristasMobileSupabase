import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Menus from "../components/Drawer/MenuHamburguesa";
import Search from "../components/SearchBar/Search";
import CarouselOferHome from "../components/carousel/OfertCarouselHome";
import MayoristasCarousel from "../components/carousel/MayoristasCarousel";

const Pantalla = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const handlePressMayo = () => {
    navigation.navigate('Mayoristas');
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.containerMenu}>
        <View style={styles.buttonsContainer}>
          <Menus />
        </View>
        <View style={styles.searchContainer}>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </View>
      </View>
      <View style={styles.CarouselOferHomeContainer}>
        <View style={styles.CarouselOfer}>
          <Text style={styles.CarouselOferHomeTitle}>Ofertas Mayoristas</Text>
          <CarouselOferHome />
        </View>
      </View>
      <View style={styles.CarouselContainer}>
      <View style={styles.CarouselShadow}>
        <Text style={styles.carouselTitle}>Mayoristas Cercanos</Text>
        <MayoristasCarousel onPress={handlePressMayo} searchQuery={searchQuery} />
      </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  containerMenu: {
    backgroundColor: "#1995AD",
    height: 80,
    zIndex: 9999,
    marginBottom: 20,
  },
  buttonsContainer: {
    position: "absolute",
    top: 15,
    left: 0,
    zIndex: 9999,
  },
  searchContainer: {
    width: "85%",
    marginTop: 15,
    marginLeft: 52,
  },
  CarouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: "100%",
    height: 300,
  },
  carouselTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  CarouselOferHomeContainer: {
    width: "100%",
    alignItems: 'center',
    height: 250,
  },
  CarouselOfer: {
    width: "90%",
    height: 250,
    backgroundColor: "#FFF",
    borderRadius: 25,
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Esto es necesario para que la sombra funcione en dispositivos Android
  },
  CarouselShadow:{
    width: "90%",
    height: 250,
    backgroundColor: "#FFF",
    alignItems: 'center',
    borderRadius: 25,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Esto es necesario para que la sombra funcione en dispositivos Android
  }
  


});

export default Pantalla;
