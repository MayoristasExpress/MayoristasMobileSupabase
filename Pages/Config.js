import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Modal, Button, TextInput } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from "../context/AppContext";
import Menus from "../components/Drawer/MenuHamburguesa";
import Avatars1 from "../components/inputs/Avatar";
import { supabase } from '../lib/supabase';

const Ajustes = () => {
  const { getProfile, session, setAvatarUrl, avatarUrl, datosUser } = useContext(AppContext);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.cancelled && result.uri) {
      setAvatarUrl(result.uri);
    } else {
      setAvatarUrl('');
    }
  };

  const modificar = (section) => {
    setSelectedSection(section);
    setIsPopupVisible(true);
    setInputValue('');
    setError('');
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  async function updateProfiles(updates) {
    try {
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      updates.updated_at = new Date();

      console.log('Updates:', updates);

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', session?.user.id);

      if (error) {
        throw error;
      }

      console.log('Profile updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  const cambiarTodo = async () => {
    if (!inputValue.trim()) {
      setError('El campo debe contener información');
      return;
    }

    setIsLoading(true);
    await updateProfiles({
      [selectedSection]: inputValue
    });
    getProfile();
    setIsLoading(false);
    setIsPopupVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Menus />
      </View>
      <TouchableOpacity style={styles.AvatarButton} onPress={handlePicker}>
        <Avatars1 uri={avatarUrl} size={160} />
      </TouchableOpacity>
      <Text style={styles.title}>Toque la imagen para cambiar</Text>
      <Text style={styles.info}>Informacion Personal</Text>

      <View style={styles.infoContainer}>
        <View style={styles.mailContainer}>
          <Image
            source={require('../assets/email.png')}
            style={styles.mail}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.texto}>E-mail</Text>
          <Text style={styles.textoEmail}>{datosUser.username}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => modificar(datosUser.username)}>
            <Image
              source={require('../assets/boligrafo.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.infoContainer}>
        <View style={styles.mailContainer}>
          <Image
            source={require('../assets/ajustes.png')}
            style={styles.mail}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.texto}>Nombre</Text>
          <Text style={styles.textoEmail}>{datosUser.full_name}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => modificar('full_name')}>
            <Image
              source={require('../assets/boligrafo.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <View style={styles.infoContainer}>
        <View style={styles.mailContainer}>
          <Image
            source={require('../assets/ajustes.png')}
            style={styles.mail}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.texto}>Direccion</Text>
          <Text style={styles.textoEmail}>{datosUser.adress}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity onPress={() => modificar('adress')}>
            <Image
              source={require('../assets/boligrafo.png')}
              style={styles.button}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />

      <Modal visible={isPopupVisible} animationType="slide">
        <View style={styles.popupContainer}>
          <Text>Editar</Text>
          <TextInput
            style={styles.input}
            placeholder={` ${selectedSection}`}
            value={inputValue}
            onChangeText={handleInputChange}
          />
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <Button
            title="Aceptar"
            onPress={() => cambiarTodo()}
            disabled={isLoading}
          />
          <Button title="Cerrar" onPress={() => setIsPopupVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
  },
  info: {
    fontSize: 30,
    textAlign: "left",
    width: "100%",
    marginTop: 30
  },
  buttonsContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    zIndex: 9999,
    backgroundColor: "red"
  },
  AvatarButton: {
    alignItems: "center",
    marginTop: 49
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    width: "100%",
    fontSize: 18
  },
  textoEmail: {
    width: "100%",
    fontSize: 10
  },
  mailContainer: {
    width: 65,
    alignItems: "center"
  },
  mail: {
    width: 35,
    height: 35,
    marginLeft: 5
  },
  ButtonContainer: {
    width: 65,
    alignItems: "center",
    marginRight: 12
  },
  button: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  line: {
    width: "70%",
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    padding: 10,
  },
  errorMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default Ajustes;
