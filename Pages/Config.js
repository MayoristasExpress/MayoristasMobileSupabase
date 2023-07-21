import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { AppContext } from "../context/AppContext";
import Menus from "../components/Drawer/MenuHamburguesa";
import Avatars1 from "../components/inputs/Avatar";
import { supabase } from '../lib/supabase';
import { TextInput, DefaultTheme } from "react-native-paper";

const Ajustes = () => {
  const { getProfile, session, setAvatarUrl, avatarUrl, datosUser } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [updatedFullName, setUpdatedFullName] = useState(datosUser.full_name);
  const [updatedAddress, setUpdatedAddress] = useState(datosUser.address);
  
  
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

  // Función para mostrar el modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Función para ocultar el modal y descartar los cambios
  const handleCancelChanges = () => {
    setShowModal(false);
  };

  // Función para guardar los cambios y ocultar el modal
  const handleSaveChanges = () => {
    const updates = {
      full_name: updatedFullName,
      adress: updatedAddress
    }
    updateProfiles(updates)
    setShowModal(false);
    getProfile()
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

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1995AD', // Cambiar el color de los bordes a rojo
    },
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

      <TextInput
        mode="outlined"
        label={datosUser.username}
        placeholder="Email"
        style={{ width: '90%', marginTop: 30 }}
        theme={theme}
      />

      <TextInput
        mode="outlined"
        label={datosUser.full_name}
        placeholder="Nombre"
        style={{ width: '90%', marginTop: 30 }}
        theme={theme}
        value={updatedFullName}
        onChangeText={setUpdatedFullName}
      />

      <TextInput
        mode="outlined"
        label={datosUser.adress}
        placeholder="Direccion"
        style={{ width: '90%', marginTop: 30 }}
        theme={theme}
        value={updatedAddress}
        onChangeText={setUpdatedAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleShowModal}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Estás seguro de los cambios?</Text>
            <View style={styles.modalButtonsContainer}>
              {/* Botón para aceptar los cambios */}
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveChanges}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
              {/* Botón para cancelar los cambios */}
              <TouchableOpacity style={styles.modalButton2} onPress={handleCancelChanges}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#fff"
  },
  title: {
    marginTop: 20,
  },
  info: {
    fontSize: 30,
    textAlign: "center",
    width: "100%",
    marginTop: 20
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: "#1995AD",
    width:"100%"
  },
  AvatarButton: {
    alignItems: "center",
    marginTop: 100
  },
  button: {
    backgroundColor: '#1995AD',
    paddingVertical: 9,
    paddingHorizontal: 24,
    marginTop: 30,
    width: 320
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Fondo semi-transparente para el modal
  },
  modalContent: {
    width: 350, // Ancho del contenido del modal en 500 píxeles
    height: 350, // Alto del contenido del modal en 500 píxeles
    padding: 20, // Padding dentro del contenido del modal
    backgroundColor: "white", // Puedes cambiar este color si lo deseas
    borderRadius: 10, // Radio de borde para que parezca un cuadrado
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: '#1995AD',
    paddingVertical: 9,
    paddingHorizontal: 24,
    marginHorizontal: 10, // Espacio horizontal entre los botones
    width: 150, // Ancho de los botones
    marginTop: 30,
  },
  modalButton2: {
    backgroundColor: 'red',
    paddingVertical: 9,
    paddingHorizontal: 24,
    marginHorizontal: 10, // Espacio horizontal entre los botones
    width: 150, // Ancho de los botones
    marginTop: 15,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Ajustes;
