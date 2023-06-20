import { Text, View, StyleSheet } from "react-native";
import Menus from "../components/Drawer/MenuHamburguesa";

const Notificaciones = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
      <Menus/>
      </View>
      <Text style={styles.title}> Notificaciones </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 35
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999
  },
  title: {
    fontSize: 50,
    marginTop: 300,
  },
});
export default Notificaciones ;


