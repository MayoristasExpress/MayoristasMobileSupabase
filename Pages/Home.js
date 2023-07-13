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
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        </View>
      </View>
      <CarouselOferHome />
      <View style={styles.carouselContainer}>
        <Text style={styles.carouselTitle}>Mayoristas Cercanos</Text>
        <MayoristasCarousel onPress={handlePressMayo} searchQuery={searchQuery} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#f1f1f1",
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
  carouselContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  carouselTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Pantalla;
