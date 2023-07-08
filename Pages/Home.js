import { Text, View, StyleSheet, Dimensions } from "react-native";
import { Button } from 'react-native-elements';
import Menus from "../components/Drawer/MenuHamburguesa";
import Search from "../components/SearchBar/Search";
import CarouselOferHome from "../components/carousel/OfertCarouselHome";
import MayoristasCarousel from "../components/carousel/MayoristasCarousel";


const Pantalla = () => {

  
  return (
    <View style={styles.container}>
      <View style={styles.containerMenu}>
        <View style={styles.buttonsContainer}>
          <Menus />
        </View>
        <View style={styles.searchContainer}>
          <Search />
        </View>
      </View>
      <CarouselOferHome />
      <Text style={styles.carouselTitle}>Mayoristas Cercanos</Text>
      <MayoristasCarousel/>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f1f1f1',
  },
  containerMenu:{
   backgroundColor:"#1995AD",
   height:80,
   zIndex: 9999, 
   marginBottom: 20// Asegura que el contenedor del menú se superponga
  },
  buttonsContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    zIndex: 9999,
  },
  searchContainer: {
    width: "85%",
    marginTop: 15,
    marginLeft: 52,
  },
  carouselTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Pantalla;
