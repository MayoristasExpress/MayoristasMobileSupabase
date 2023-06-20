import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import Menus from "../components/Drawer/MenuHamburguesa";
import Search from "../components/SearchBar/Search";

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
      <Text style={styles.title}>Home</Text>
      <Button title="Cerrar sesión" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f1f1f1',
  },
  containerMenu:{
   backgroundColor:"#1995AD",
   height:80,
   zIndex: 9999, // Asegura que el contenedor del menú se superponga
  },
  title: {
    fontSize: 50,
    marginTop: 300,
  },
  buttonsContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    zIndex: 9999,
  },
  searchContainer: {
    width:"85%",
    marginTop: 15,
    marginLeft: 52,
  },
});

export default Pantalla;
