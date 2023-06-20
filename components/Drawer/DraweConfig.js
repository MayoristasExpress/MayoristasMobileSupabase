import React, { useContext, useRef } from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, View, Text, Modal } from 'react-native';
import { IconButton, useTheme, Avatar } from 'react-native-paper';
import { Image } from 'react-native';
import { Micontexto } from '../../context/context';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const DrawerConfig = ({ onClose }) => {
  const { colors } = useTheme();
  const { datas, avatarUrl, location } = useContext(Micontexto);
  const navigation = useNavigation();
  const modalRef = useRef(null);

  const handlePressOutside = () => {
    onClose();
  };

  const handlePressConfig = () => {
    onClose();
    navigation.navigate('Configuracion');
  };

  const handleCloseDrawer = () => {
    modalRef.current && modalRef.current.close();
  };

  return (
    <Modal
      visible
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={handleCloseDrawer}
      ref={modalRef}
    >
      <TouchableWithoutFeedback onPress={handlePressOutside}>
        <View style={styles.drawerContainer}>
          <View style={styles.drawerContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Image size={100} source={{ uri: avatarUrl }} style={styles.avatar} />
            </View>
            <Text style={styles.text}>{datas}</Text>
            <Text style={styles.text}>
              {location.coords ? location.coords.latitude : ''} hola
            </Text>

            <View style={styles.drawerItem}>
              <IconButton
                icon={() => (
                  <Image
                    source={require('../../assets/volver.png')}
                    style={{ width: 50, height: 40, resizeMode: 'contain' }}
                  />
                )}
                onPress={onClose}
              />
              <Text style={styles.drawerLabel}>Volver</Text>
            </View>

            <View style={styles.drawerItem}>
              <IconButton
                icon={() => (
                  <Image
                    source={require('../../assets/ajustes.png')}
                    style={{ width: 50, height: 40, resizeMode: 'contain' }}
                  />
                )}
                onPress={handlePressConfig}
              />
              <Text style={styles.drawerLabel}>Mi Perfil</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-start',
  },
  drawerContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 12,
  },
  text: {
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
    textAlign: 'center',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  drawerLabel: {
    marginLeft: 12,
  },
});

export default DrawerConfig;
