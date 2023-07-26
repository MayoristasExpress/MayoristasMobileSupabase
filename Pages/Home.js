import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Menus from "../components/Drawer/MenuHamburguesa";
import Search from "../components/SearchBar/Search";
import CarouselOferHome from "../components/carousel/OfertCarouselHome";
import MayoristasCarousel from "../components/carousel/MayoristasCarousel";
import { LinearGradient } from 'expo-linear-gradient';

const Pantalla = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const handlePressMayo = () => {
    navigation.navigate('Mayoristas');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#fff", "#1995AD","#1995AD" ]} // Adjust the gradient colors here
        start={{ x: 0, y: 0.7 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}
      >
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
      </LinearGradient>
    </View>

  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 500,
    zIndex: 1, // Adjust this value if needed
  },
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
    width: "100%",
    height: 400,
    marginTop:20
  },
  carouselTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor:"red",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  CarouselOferHomeContainer: {
    width: "100%",
    alignItems: 'center',
    height: 230,
  },
  CarouselOfer: {
    width: "90%",
    height: 230,
    backgroundColor: "#FFF",
    borderRadius: 5,
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
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // Esto es necesario para que la sombra funcione en dispositivos Android
  },
  CarouselOferHomeTitle:{
    textAlign:"center",
    backgroundColor:"orange",
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    marginBottom:20
    
  }
});

export default Pantalla;