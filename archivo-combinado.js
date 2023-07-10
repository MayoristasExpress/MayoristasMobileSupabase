import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import FullName from '../inputs/FullName';
import Adress from '../inputs/Adress';
import Avatars1 from '../inputs/Avatar';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';

export default function Accounts() {
  const {
    inputAdress,
    inputFullName,
    setAvatarUrl,
    avatarUrl,
    loading,
    updateProfile
  } = useContext(AppContext);
  const navigation = useNavigation();


  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{name:'Home'}],
    });
  };

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.AvatarButton} onPress={handlePicker}>
        <Avatars1 uri={avatarUrl} size={160} />
      </TouchableOpacity>
      <FullName />
      <Adress />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({
              full_name: inputFullName,
              adress: inputAdress,
            })
          }
          disabled={loading || !inputFullName || !inputAdress}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = {
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  mt20: {
    marginTop: 20,
  },
  AvatarButton: {
    alignItems: "center",
    marginBottom: 29,
  }
};

import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View, Image, KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../lib/supabase';
import { Button,} from 'react-native-elements';
import UserEmail from '../inputs/Email';
import PassValue from '../inputs/Pass';
import Loading from '../loading/Loading';
import { AppContext } from '../../context/AppContext';

export default function Auth() {
  const { inputEmail, inputPass } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false); // Nueva variable de estado

  async function signInWithEmail() {
    setLoading(true);
    setIsLoadingAccount(true); // Habilitar la carga del componente Account

    const { error } = await supabase.auth.signInWithPassword({
      email: inputEmail,
      password: inputPass,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
    setIsLoadingAccount(false); // Deshabilitar la carga del componente Account
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: inputEmail,
      password: inputPass,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {isLoadingAccount ? (
        <Loading/> // Mostrar el componente Loading mientras isLoadingAccount sea true
      ) : (
        <>
          <Image source={require('../../assets/Logo/logo_solo.png')} style={styles.image} />

          <UserEmail />
          <PassValue />
          

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title="Ingresar"
              disabled={loading}
              onPress={() => signInWithEmail()}
              buttonStyle={styles.button}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Button
              title="Registrarse"
              disabled={loading}
              onPress={() => signUpWithEmail()}
              buttonStyle={styles.button2}
            />
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    width: 320,
  },
  mt20: {
    marginTop: 30,
  },
  button: {
    backgroundColor: '#1995AD',
  },
  button2: {
    backgroundColor: '#046476',
    marginTop: 10,
    marginBottom: 200,
  },
  image: {
    marginBottom: -10,
  },
});
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';



const ImageSliderItem = ({ image }) => {
  return (
    <View style={styles.sliderItemContainer}>
      <Image style={styles.sliderItemImage} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageSliderItem;

import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, FlatList, ImageBackground, Button } from 'react-native';
import { LocationContext } from '../../context/LocationContext';
import { useNavigation } from '@react-navigation/native';

const MayoristasCarousel = () => {
  const { dataMayoristas, datosLocation } = useContext(LocationContext);
  const navigation = useNavigation();
  console.log(dataMayoristas)
  // Obtener el mayorista más cercano
  const mayoristaCercano = datosLocation.length > 0 ? datosLocation[0] : null;

  const handlePressMayo = () => {
    navigation.navigate('Mayoristas');
  };
  
  const renderMayoristaItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={handlePressMayo}
        style={styles.carouselItem}
      >
        <Image source={{ uri:`https://gvtqrhqslwauidfkmmyf.supabase.co/storage/v1/object/public/avatars/${item.avatar_url}`}} style={styles.avatar} />
        <Text style={styles.fullName}>{item.full_name}</Text>
        <Button title="Ir" onPress={handlePressMayo} /> 
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item.distributors.id.toString();

  return (
    <ImageBackground
      source={require('../../assets/gato.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <FlatList
          horizontal
          data={dataMayoristas}
          renderItem={renderMayoristaItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 310,
    justifyContent: 'center',
  },
  carouselTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  carouselItem: {
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    width: 250,
    height: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 10,
  },
  avatar: {
    width: 200,
    height: 150,
    resizeMode: "contain"
  },
  fullName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MayoristasCarousel;

import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';

const CarouselOferHome = () => {
  const scrollViewRef = useRef(null);
  const imageWidth = 500;
  const images = [
    { source: require('../../assets/sliders/1.jpg'), extension: 'jpg' },
    { source: require('../../assets/sliders/2.jpg'), extension: 'jpg' },
    { source: require('../../assets/sliders/3.jpeg'), extension: 'jpeg' },
    { source: require('../../assets/sliders/4.jpeg'), extension: 'jpeg' },
    { source: require('../../assets/sliders/5.png'), extension: 'png' },
    // Agrega más imágenes aquí con sus extensiones correspondientes
  ];
  const imageCount = images.length;
  let currentIndex = 0;

  const scrollToNextImage = () => {
    currentIndex = (currentIndex + 1) % imageCount;
    const offsetX = currentIndex * imageWidth;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  };

  const scrollToPreviousImage = () => {
    currentIndex = (currentIndex - 1 + imageCount) % imageCount;
    const offsetX = currentIndex * imageWidth;

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: offsetX, animated: true });
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollToNextImage, 9000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={(event) => {
          const { contentOffset } = event.nativeEvent;
          currentIndex = Math.round(contentOffset.x / imageWidth);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {images.map((image, index) => (
          <View style={styles.imageContainer} key={index}>
            <Image style={styles.carouselImage} source={image.source} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigationButtonContainer}>
        <TouchableOpacity style={styles.navigationButton} onPress={scrollToPreviousImage}>
          <Text style={styles.navigationButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={scrollToNextImage}>
          <Text style={styles.navigationButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  scrollViewContent: {
    paddingRight: 10,
  },
  imageContainer: {
    width: 500,
    height: '100%',
    marginRight: 10,
  },
  carouselImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  navigationButtonContainer: {
    position: 'absolute',
    top: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%',
  },
  navigationButton: {
    borderRadius: 60,
    height: 40,
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  navigationButtonText: {
    height: 40,
    width: 40,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CarouselOferHome;

import React, { useContext, useRef } from 'react';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, View, Text, Modal } from 'react-native';
import { IconButton, useTheme, Avatar } from 'react-native-paper';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../context/AppContext';
import {  supabase } from '../../lib/supabase';

const { height, width } = Dimensions.get('window');

const DrawerConfig = ({ onClose }) => {
  const { colors } = useTheme();
  const { datas, avatarUrl, location } = useContext(AppContext);
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
             {location && location.coords ? location.coords.latitude : ''}
            </Text>

            <View style={styles.drawerItem}>
              <IconButton
                icon={() => (
                  <Image
                    source={require('../../assets/volver.png')}
                    style={{ width: 40, height: 35, resizeMode: 'contain' }}
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
            <View style={styles.drawerItem}>
              <IconButton
                icon={() => (
                  <Image
                    source={require('../../assets/cerrar-sesion.png')}
                    style={{ width: 40, height: 30, resizeMode: 'contain' }}
                  />
                )}
                onPress={() => supabase.auth.signOut()} 
              />
              <Text style={styles.drawerLabel}>Cerrar sesion</Text>
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

import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DrawerConfig from './DraweConfig';
import Search from '../SearchBar/Search';


const Menus = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {!isDrawerOpen && (
        <IconButton
          icon={() => <Icon name="menu" size={40} color="#fff" />}
          onPress={toggleDrawer}
          color="blue"
        />
      )}
      {isDrawerOpen && <DrawerConfig onClose={toggleDrawer} />}
     
    </>
  );
};

export default Menus;

import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const Adress = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { inputAdress, setInputAdress } = useContext(AppContext)
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1995AD', // Cambiar el color de los bordes a rojo
        },
    };
    return (
        <TextInput
            mode="outlined"
            label="Direccion"
            value={inputAdress}
            onChangeText={setInputAdress}
            focused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ width: '90%' }}
            theme={theme} // Aplicar el tema personalizado
        />
    );
}
export default Adress; 


import React from "react";
import { Image, View } from "react-native";

export default function Avatars1({ uri, size = 32 }) {
  const containerStyles = {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyles = {
    height: size,
    width: size,
    borderRadius: size / 2,
    resizeMode: "cover",
  };

  return (
    <View style={containerStyles}>
      {uri ? (
        <Image source={{ uri }} style={imageStyles} />
      ) : (
        <View style={imageStyles} />
      )}
    </View>
  );
}


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { View, Text, Image as RNImage, StyleSheet, TouchableOpacity, } from 'react-native';
import isEqual from 'lodash.isequal';
import { withTheme } from '../config';
import { renderNode } from '../helpers';
import Icon from '../icons/Icon';
import Image from '../image/Image';
import Accessory from './Accessory';
const avatarSizes = {
    small: 34,
    medium: 50,
    large: 75,
    xlarge: 150,
};
const AvatarComponent = (_a) => {
    var { onPress, onLongPress, Component = onPress || onLongPress ? TouchableOpacity : View, containerStyle, icon, iconStyle, source, size = 'small', avatarStyle, rounded, title, titleStyle, overlayContainerStyle, imageProps, placeholderStyle, renderPlaceholderContent, ImageComponent = RNImage, children } = _a, attributes = __rest(_a, ["onPress", "onLongPress", "Component", "containerStyle", "icon", "iconStyle", "source", "size", "avatarStyle", "rounded", "title", "titleStyle", "overlayContainerStyle", "imageProps", "placeholderStyle", "renderPlaceholderContent", "ImageComponent", "children"]);
    let width = avatarSizes.small;
    width = typeof size === 'number' ? size : avatarSizes[size];
    const height = width;
    const titleSize = width / 2;
    const iconSize = width / 2;
    const PlaceholderContent = (renderPlaceholderContent &&
        renderNode(undefined, renderPlaceholderContent)) ||
        (title && (<Text style={StyleSheet.flatten([
                styles.title,
                { fontSize: titleSize },
                titleStyle,
            ])}>
        {title}
      </Text>)) ||
        (icon && (<Icon style={StyleSheet.flatten([iconStyle && iconStyle])} color={icon.color || 'white'} name={icon.name || 'user'} size={icon.size || iconSize} type={icon.type && icon.type}/>));
    const hidePlaceholder = !(source && source.uri);
    const imageContainerStyle = StyleSheet.flatten([
        styles.overlayContainer,
        rounded && { borderRadius: width / 2, overflow: 'hidden' },
        overlayContainerStyle,
        imageProps && imageProps.containerStyle,
    ]);
    if (imageProps && imageProps.containerStyle) {
        delete imageProps.containerStyle;
    }
    return (<Component onPress={onPress} onLongPress={onLongPress} style={StyleSheet.flatten([
            styles.container,
            { height, width },
            rounded && { borderRadius: width / 2 },
            containerStyle,
        ])} {...attributes}>
      <Image placeholderStyle={StyleSheet.flatten([
            placeholderStyle,
            hidePlaceholder && styles.hiddenPlaceholderStyle,
        ])} PlaceholderContent={PlaceholderContent} containerStyle={imageContainerStyle} source={source} borderRadius={rounded ? width / 2 : undefined} {...imageProps} style={StyleSheet.flatten([
            styles.avatar,
            imageProps && imageProps.style,
            avatarStyle,
        ])} ImageComponent={ImageComponent}/>
      {children}
    </Component>);
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    avatar: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    overlayContainer: {
        flex: 1,
    },
    title: {
        color: '#ffffff',
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    hiddenPlaceholderStyle: {
        backgroundColor: 'transparent',
    },
});
const Avatar = React.memo(AvatarComponent, isEqual);
export { Avatar };
const ThemedAvatar = Object.assign(withTheme(Avatar, 'Avatar'), {
    Accessory: Accessory,
});
export default ThemedAvatar;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function () {
    return _AvatarIcon.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function () {
    return _AvatarImage.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _AvatarText.default;
  }
});
var _AvatarIcon = _interopRequireDefault(require("./AvatarIcon"));
var _AvatarImage = _interopRequireDefault(require("./AvatarImage"));
var _AvatarText = _interopRequireDefault(require("./AvatarText"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=Avatar.js.map
// @component ./AvatarIcon.tsx
export { default as Icon } from './AvatarIcon';

// @component ./AvatarImage.tsx
export { default as Image } from './AvatarImage';

// @component ./AvatarText.tsx
export { default as Text } from './AvatarText';
//# sourceMappingURL=Avatar.js.map
import React, { useContext, useState } from 'react';
import { TextInput, View, DefaultTheme } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const UserEmail = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { inputEmail, setInputEmail } = useContext(AppContext)
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1995AD', // Cambiar el color de los bordes a rojo
        },
    };

    return (

        <TextInput
            mode="outlined"
            label="Usuario"
            value={inputEmail}
            onChangeText={setInputEmail}
            focused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ width: '90%' }}
            theme={theme} // Aplicar el tema personalizado
        />

    );

}

export default UserEmail; 



'use strict';

const Util = require('util');

const Domain = require('./domain');
const Errors = require('./errors');


const internals = {
    nonAsciiRx: /[^\x00-\x7f]/,
    encoder: new (Util.TextEncoder || TextEncoder)()                                            // $lab:coverage:ignore$
};


exports.analyze = function (email, options) {

    return internals.email(email, options);
};


exports.isValid = function (email, options) {

    return !internals.email(email, options);
};


internals.email = function (email, options = {}) {

    if (typeof email !== 'string') {
        throw new Error('Invalid input: email must be a string');
    }

    if (!email) {
        return Errors.code('EMPTY_STRING');
    }

    // Unicode

    const ascii = !internals.nonAsciiRx.test(email);
    if (!ascii) {
        if (options.allowUnicode === false) {                                                   // Defaults to true
            return Errors.code('FORBIDDEN_UNICODE');
        }

        email = email.normalize('NFC');
    }

    // Basic structure

    const parts = email.split('@');
    if (parts.length !== 2) {
        return parts.length > 2 ? Errors.code('MULTIPLE_AT_CHAR') : Errors.code('MISSING_AT_CHAR');
    }

    const [local, domain] = parts;

    if (!local) {
        return Errors.code('EMPTY_LOCAL');
    }

    if (!options.ignoreLength) {
        if (email.length > 254) {                                           // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
            return Errors.code('ADDRESS_TOO_LONG');
        }

        if (internals.encoder.encode(local).length > 64) {                  // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
            return Errors.code('LOCAL_TOO_LONG');
        }
    }

    // Validate parts

    return internals.local(local, ascii) || Domain.analyze(domain, options);
};


internals.local = function (local, ascii) {

    const segments = local.split('.');
    for (const segment of segments) {
        if (!segment.length) {
            return Errors.code('EMPTY_LOCAL_SEGMENT');
        }

        if (ascii) {
            if (!internals.atextRx.test(segment)) {
                return Errors.code('INVALID_LOCAL_CHARS');
            }

            continue;
        }

        for (const char of segment) {
            if (internals.atextRx.test(char)) {
                continue;
            }

            const binary = internals.binary(char);
            if (!internals.atomRx.test(binary)) {
                return Errors.code('INVALID_LOCAL_CHARS');
            }
        }
    }
};


internals.binary = function (char) {

    return Array.from(internals.encoder.encode(char)).map((v) => String.fromCharCode(v)).join('');
};


/*
    From RFC 5321:

        Mailbox         =   Local-part "@" ( Domain / address-literal )

        Local-part      =   Dot-string / Quoted-string
        Dot-string      =   Atom *("."  Atom)
        Atom            =   1*atext
        atext           =   ALPHA / DIGIT / "!" / "#" / "$" / "%" / "&" / "'" / "*" / "+" / "-" / "/" / "=" / "?" / "^" / "_" / "`" / "{" / "|" / "}" / "~"

        Domain          =   sub-domain *("." sub-domain)
        sub-domain      =   Let-dig [Ldh-str]
        Let-dig         =   ALPHA / DIGIT
        Ldh-str         =   *( ALPHA / DIGIT / "-" ) Let-dig

        ALPHA           =   %x41-5A / %x61-7A        ; a-z, A-Z
        DIGIT           =   %x30-39                  ; 0-9

    From RFC 6531:

        sub-domain      =/  U-label
        atext           =/  UTF8-non-ascii

        UTF8-non-ascii  =   UTF8-2 / UTF8-3 / UTF8-4

        UTF8-2          =   %xC2-DF UTF8-tail
        UTF8-3          =   %xE0 %xA0-BF UTF8-tail /
                            %xE1-EC 2( UTF8-tail ) /
                            %xED %x80-9F UTF8-tail /
                            %xEE-EF 2( UTF8-tail )
        UTF8-4          =   %xF0 %x90-BF 2( UTF8-tail ) /
                            %xF1-F3 3( UTF8-tail ) /
                            %xF4 %x80-8F 2( UTF8-tail )

        UTF8-tail       =   %x80-BF

    Note: The following are not supported:

        RFC 5321: address-literal, Quoted-string
        RFC 5322: obs-*, CFWS
*/


internals.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/;               // _ included in \w


internals.atomRx = new RegExp([

    //  %xC2-DF UTF8-tail
    '(?:[\\xc2-\\xdf][\\x80-\\xbf])',

    //  %xE0 %xA0-BF UTF8-tail              %xE1-EC 2( UTF8-tail )            %xED %x80-9F UTF8-tail              %xEE-EF 2( UTF8-tail )
    '(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})',

    //  %xF0 %x90-BF 2( UTF8-tail )            %xF1-F3 3( UTF8-tail )            %xF4 %x80-8F 2( UTF8-tail )
    '(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})'

].join('|'));


import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const FullName = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { inputFullName, setInputFullName } = useContext(AppContext)
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1995AD', // Cambiar el color de los bordes a rojo
        },
    };
    return (
        <TextInput
            mode="outlined"
            label="Nombre y Apellidos"
            value={inputFullName}
            onChangeText={setInputFullName}
            focused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ width: '90%' }}
            theme={theme} // Aplicar el tema personalizado
        />
    );
}
export default FullName; 

import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme, IconButton } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const PassValue = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const { inputPass, setInputPass } = useContext(AppContext);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'red', // Cambiar el color de los bordes a rojo
    },
  };

  return (
    <TextInput
      mode="outlined"
      label="Contraseña"
      value={inputPass}
      onChangeText={setInputPass}
      focused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Type something"
      style={{ width: '90%', marginTop: 30 }}
      secureTextEntry={!showPassword} // Mostrar la contraseña solo si showPassword es true
      theme={theme} // Aplicar el tema personalizado
      right={ showPassword ?  <TextInput.Icon  icon="eye-off" onPress={handleTogglePassword} />:<TextInput.Icon  icon="eye" onPress={handleTogglePassword} />}
    />
  );
};

export default PassValue;

import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const UserName = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { inputUserName, setInputUserName } = useContext(AppContext)
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1995AD', // Cambiar el color de los bordes a rojo
        },
    };
    return (
        <TextInput
            mode="outlined"
            label="Nombre de usuario "
            value={inputUserName}
            onChangeText={setInputUserName}
            focused={isFocused}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{ width: '90%' }}
            theme={theme} // Aplicar el tema personalizado
        />
    );
}
export default UserName; 

import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Loading = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/Logo/logo.png')}
        style={[styles.image, { transform: [{ scale: scaleValue }] }]}
      />
      <ActivityIndicator animating={true} color="#ff6840" style={styles.indicator} />
      <Text style={styles.text}>Mayoristas Express...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  indicator: {
    marginBottom: 16,
    // Ajusta el tamaño del indicador aquí
    transform: [{ scale: 3}], // Cambia el valor de scale para aumentar o disminuir el tamaño del indicador
  },
  text: {
    marginTop: 36,
  },
});

export default Loading;

import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchbarInput}
      />
    </View>
  );
};

const styles = {
  container: {
    alignItems: 'center',
  },
  searchBar: {
    height: 32,
    marginTop:10
  },
  searchbarInput: {
    paddingBottom: 23,
  },
};

export default Search;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

require('../../modules/es6.regexp.search');
module.exports = require('../../modules/$.wks')('search');
require('../../modules/es6.regexp.search');
module.exports = require('../../modules/$.wks')('search');
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 */
"use strict";

function greatestLowerBound(elements, target, comparator) {
  let first = 0;
  let it = 0;
  let count = elements.length;
  let step;

  while (count > 0) {
    it = first;
    step = Math.floor(count / 2);
    it = it + step;

    if (comparator(target, elements[it]) >= 0) {
      first = ++it;
      count = count - (step + 1);
    } else {
      count = step;
    }
  }

  return first ? first - 1 : null;
}

module.exports = {
  greatestLowerBound,
};

import React, { createContext, useState, useEffect, useContext } from 'react';
import { downloadAvatar, supabase } from '../lib/supabase';


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [inputAdress, setInputAdress] = useState('');
  const [inputFullName, setInputFullName] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [datas, setDatas] = useState('');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [datosUser, setDatosUser] = useState('');

  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('¡No hay usuario en la sesión!');
      }

      const { data, error, status } = await supabase
        .from('users')
        .select('username,full_name,avatar_url,adress')
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDatas(data.full_name);
        setDatosUser(data);
        setInputFullName(data.full_name);
        setInputAdress(data.adress);
        downloadAvatar(data.avatar_url).then(setAvatarUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ full_name, adress }) {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('¡No hay usuario en la sesión!');
      }

      let updatedAvatarUrl = '';
      if (avatarUrl) {
        const fileExt = avatarUrl.split('.').pop();
        const fileName = avatarUrl.replace(/^.*[\\\/]/, '');
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: avatarUrl,
          name: fileName,
          type: `image/${fileExt}`,
        };
        formData.append('file', photo);

        await supabase.storage.from('avatars').upload(filePath, formData);
        console.log('Imagen cargada correctamente');

        updatedAvatarUrl = filePath;
      }

      const updates = {
        adress,
        full_name,
        avatar_url: updatedAvatarUrl,
        updated_at: new Date(),
      };

      console.log('Actualizaciones:', updates);

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', session?.user.id);

      if (error) {
        throw error;
      }

      console.log('Perfil actualizado correctamente');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        inputEmail,
        setInputEmail,
        inputPass,
        setInputPass,
        inputAdress,
        setInputAdress,
        inputFullName,
        setInputFullName,
        inputUserName,
        setInputUserName,
        setAvatarUrl,
        avatarUrl,
        session,
        loading,
        updateProfile,
        setSession,
        getProfile,
        datas,
        datosUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

import React, { createContext, useState, useEffect } from 'react';
import { downloadAvatar, supabase } from '../lib/supabase';
import * as Location from "expo-location"


const Micontexto = createContext();

const AppContext = ({ children }) => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [inputAdress, setInputAdress] = useState('')
  const [inputFullName, setInputFullName] = useState('')
  const [inputUserName, setInputUserName] = useState('')
  const [datas, setDatas] = useState('')
  /* ESTA FUNCION ES PARA TRAERME LOS DATOS DEL USUARIO DE SUPABASE*/
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('')
  const [datosUser, setDatosUser] = useState('')

  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }

  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      const { data, error, status } = await supabase
        .from('users')
        .select('username, full_name, avatar_url, adress')
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }


      if (data) {
        setDatas(data.full_name)
        setDatosUser(data)
        setInputFullName(data.full_name);
        setInputAdress(data.adress);
        downloadAvatar(data.avatar_url).then(setAvatarUrl)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  /* ESTA FUNCION ES PARA UPDATEAR EL PERFIL OKAY*/
  async function updateProfile({ full_name, adress }) {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('No user on the session!');
      }

      let updatedAvatarUrl = '';
      if (avatarUrl) {
        const fileExt = avatarUrl.split('.').pop();
        const fileName = avatarUrl.replace(/^.*[\\\/]/, '');
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: avatarUrl,
          name: fileName,
          type: `image/${fileExt}`,
        };
        formData.append('file', photo);

        await supabase.storage.from('avatars').upload(filePath, formData);
        console.log('Image uploaded successfully EL TRolo de nico');

        updatedAvatarUrl = filePath;
      }

      const updates = {
        adress,
        full_name,
        avatar_url: updatedAvatarUrl,
        updated_at: new Date(),
      };

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
    } finally {
      setLoading(false);
    }
  }

  // funcion para traerme los mayoristas 
  const [dataMayoristas, setDataMayoristas] = useState([])
  
  const getUsersWithRolesAndDistributors = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select(`
         full_name,
         avatar_url,
         distributors(*)
        `)
      const filteredData = data.filter((user) => user.distributors !== null);
      setDataMayoristas(filteredData);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
 
  useEffect(() => {
    getUsersWithRolesAndDistributors();
  }, []);
  



  /* ESTA FUNCION ES PARA TRAERNOS LA UBICACION DEL CLIENTE */
  const [location, setLocation] = useState(null);
  const [datosLocation, setDatosLocation] = useState([])

  console.log(datosLocation)
  
  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (dataMayoristas && location) {
        const latitud = location.coords.latitude;
        const longitud = location.coords.longitude;
        const distances = dataMayoristas.map(local => {
          const id = local.distributors.user_id;
          const localLatitud = local.distributors.latitude;
          const localLongitud = local.distributors.longitude;
          const distance = calculateDistance(latitud, longitud, localLatitud, localLongitud);
          return { id, distance };
        });

        const sortedLocations = distances.sort((a, b) => a.distance - b.distance);
        const nearest = sortedLocations.slice(0, 5);
       
        setDatosLocation(nearest);
      }

    };
    getLocationAsync();
  }, [dataMayoristas]);
  

  //funcion para calcular el radio de la tierra y comparar la distancia entre el punto A y B

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
 
 

  return (
    <Micontexto.Provider value={{
      inputEmail,
      setInputEmail,
      inputPass,
      setInputPass,
      inputAdress,
      setInputAdress,
      inputFullName,
      setInputFullName,
      inputUserName,
      setInputUserName,
      setAvatarUrl,
      avatarUrl,
      session,
      loading,
      updateProfile,
      setSession,
      getProfile,
      datas,
      location,
      datosUser,
      dataMayoristas,
      setDataMayoristas,
      datosLocation
    }}>
      {children}
    </Micontexto.Provider>
  );
};

export { Micontexto, AppContext };
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.types = exports.TokContext = void 0;
class TokContext {
  constructor(token, preserveSpace) {
    this.token = void 0;
    this.preserveSpace = void 0;
    this.token = token;
    this.preserveSpace = !!preserveSpace;
  }
}
exports.TokContext = TokContext;
const types = {
  brace: new TokContext("{"),
  j_oTag: new TokContext("<tag"),
  j_cTag: new TokContext("</tag"),
  j_expr: new TokContext("<tag>...</tag>", true)
};
exports.types = types;
{
  types.template = new TokContext("`", true);
}

//# sourceMappingURL=context.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = require("./path");
var _t = require("@babel/types");
const {
  VISITOR_KEYS
} = _t;
class TraversalContext {
  constructor(scope, opts, state, parentPath) {
    this.queue = null;
    this.priorityQueue = null;
    this.parentPath = parentPath;
    this.scope = scope;
    this.state = state;
    this.opts = opts;
  }
  shouldVisit(node) {
    const opts = this.opts;
    if (opts.enter || opts.exit) return true;
    if (opts[node.type]) return true;
    const keys = VISITOR_KEYS[node.type];
    if (!(keys != null && keys.length)) return false;
    for (const key of keys) {
      if (node[key]) {
        return true;
      }
    }
    return false;
  }
  create(node, container, key, listKey) {
    return _path.default.get({
      parentPath: this.parentPath,
      parent: node,
      container,
      key: key,
      listKey
    });
  }
  maybeQueue(path, notPriority) {
    if (this.queue) {
      if (notPriority) {
        this.queue.push(path);
      } else {
        this.priorityQueue.push(path);
      }
    }
  }
  visitMultiple(container, parent, listKey) {
    if (container.length === 0) return false;
    const queue = [];
    for (let key = 0; key < container.length; key++) {
      const node = container[key];
      if (node && this.shouldVisit(node)) {
        queue.push(this.create(parent, container, key, listKey));
      }
    }
    return this.visitQueue(queue);
  }
  visitSingle(node, key) {
    if (this.shouldVisit(node[key])) {
      return this.visitQueue([this.create(node, node, key)]);
    } else {
      return false;
    }
  }
  visitQueue(queue) {
    this.queue = queue;
    this.priorityQueue = [];
    const visited = new WeakSet();
    let stop = false;
    for (const path of queue) {
      path.resync();
      if (path.contexts.length === 0 || path.contexts[path.contexts.length - 1] !== this) {
        path.pushContext(this);
      }
      if (path.key === null) continue;
      const {
        node
      } = path;
      if (visited.has(node)) continue;
      if (node) visited.add(node);
      if (path.visit()) {
        stop = true;
        break;
      }
      if (this.priorityQueue.length) {
        stop = this.visitQueue(this.priorityQueue);
        this.priorityQueue = [];
        this.queue = queue;
        if (stop) break;
      }
    }
    for (const path of queue) {
      path.popContext();
    }
    this.queue = null;
    return stop;
  }
  visit(node, key) {
    const nodes = node[key];
    if (!nodes) return false;
    if (Array.isArray(nodes)) {
      return this.visitMultiple(nodes, node, key);
    } else {
      return this.visitSingle(node, key);
    }
  }
}
exports.default = TraversalContext;

//# sourceMappingURL=context.js.map

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._call = _call;
exports._getQueueContexts = _getQueueContexts;
exports._resyncKey = _resyncKey;
exports._resyncList = _resyncList;
exports._resyncParent = _resyncParent;
exports._resyncRemoved = _resyncRemoved;
exports.call = call;
exports.isBlacklisted = exports.isDenylisted = isDenylisted;
exports.popContext = popContext;
exports.pushContext = pushContext;
exports.requeue = requeue;
exports.resync = resync;
exports.setContext = setContext;
exports.setKey = setKey;
exports.setScope = setScope;
exports.setup = setup;
exports.skip = skip;
exports.skipKey = skipKey;
exports.stop = stop;
exports.visit = visit;
var _traverseNode = require("../traverse-node");
var _index = require("./index");
function call(key) {
  const opts = this.opts;
  this.debug(key);
  if (this.node) {
    if (this._call(opts[key])) return true;
  }
  if (this.node) {
    var _opts$this$node$type;
    return this._call((_opts$this$node$type = opts[this.node.type]) == null ? void 0 : _opts$this$node$type[key]);
  }
  return false;
}
function _call(fns) {
  if (!fns) return false;
  for (const fn of fns) {
    if (!fn) continue;
    const node = this.node;
    if (!node) return true;
    const ret = fn.call(this.state, this, this.state);
    if (ret && typeof ret === "object" && typeof ret.then === "function") {
      throw new Error(`You appear to be using a plugin with an async traversal visitor, ` + `which your current version of Babel does not support. ` + `If you're using a published plugin, you may need to upgrade ` + `your @babel/core version.`);
    }
    if (ret) {
      throw new Error(`Unexpected return value from visitor method ${fn}`);
    }
    if (this.node !== node) return true;
    if (this._traverseFlags > 0) return true;
  }
  return false;
}
function isDenylisted() {
  var _this$opts$denylist;
  const denylist = (_this$opts$denylist = this.opts.denylist) != null ? _this$opts$denylist : this.opts.blacklist;
  return denylist && denylist.indexOf(this.node.type) > -1;
}
function restoreContext(path, context) {
  if (path.context !== context) {
    path.context = context;
    path.state = context.state;
    path.opts = context.opts;
  }
}
function visit() {
  var _this$opts$shouldSkip, _this$opts;
  if (!this.node) {
    return false;
  }
  if (this.isDenylisted()) {
    return false;
  }
  if ((_this$opts$shouldSkip = (_this$opts = this.opts).shouldSkip) != null && _this$opts$shouldSkip.call(_this$opts, this)) {
    return false;
  }
  const currentContext = this.context;
  if (this.shouldSkip || this.call("enter")) {
    this.debug("Skip...");
    return this.shouldStop;
  }
  restoreContext(this, currentContext);
  this.debug("Recursing into...");
  this.shouldStop = (0, _traverseNode.traverseNode)(this.node, this.opts, this.scope, this.state, this, this.skipKeys);
  restoreContext(this, currentContext);
  this.call("exit");
  return this.shouldStop;
}
function skip() {
  this.shouldSkip = true;
}
function skipKey(key) {
  if (this.skipKeys == null) {
    this.skipKeys = {};
  }
  this.skipKeys[key] = true;
}
function stop() {
  this._traverseFlags |= _index.SHOULD_SKIP | _index.SHOULD_STOP;
}
function setScope() {
  var _this$opts2, _this$scope;
  if ((_this$opts2 = this.opts) != null && _this$opts2.noScope) return;
  let path = this.parentPath;
  if ((this.key === "key" || this.listKey === "decorators") && path.isMethod() || this.key === "discriminant" && path.isSwitchStatement()) {
    path = path.parentPath;
  }
  let target;
  while (path && !target) {
    var _path$opts;
    if ((_path$opts = path.opts) != null && _path$opts.noScope) return;
    target = path.scope;
    path = path.parentPath;
  }
  this.scope = this.getScope(target);
  (_this$scope = this.scope) == null ? void 0 : _this$scope.init();
}
function setContext(context) {
  if (this.skipKeys != null) {
    this.skipKeys = {};
  }
  this._traverseFlags = 0;
  if (context) {
    this.context = context;
    this.state = context.state;
    this.opts = context.opts;
  }
  this.setScope();
  return this;
}
function resync() {
  if (this.removed) return;
  this._resyncParent();
  this._resyncList();
  this._resyncKey();
}
function _resyncParent() {
  if (this.parentPath) {
    this.parent = this.parentPath.node;
  }
}
function _resyncKey() {
  if (!this.container) return;
  if (this.node === this.container[this.key]) {
    return;
  }
  if (Array.isArray(this.container)) {
    for (let i = 0; i < this.container.length; i++) {
      if (this.container[i] === this.node) {
        this.setKey(i);
        return;
      }
    }
  } else {
    for (const key of Object.keys(this.container)) {
      if (this.container[key] === this.node) {
        this.setKey(key);
        return;
      }
    }
  }
  this.key = null;
}
function _resyncList() {
  if (!this.parent || !this.inList) return;
  const newContainer = this.parent[this.listKey];
  if (this.container === newContainer) return;
  this.container = newContainer || null;
}
function _resyncRemoved() {
  if (this.key == null || !this.container || this.container[this.key] !== this.node) {
    this._markRemoved();
  }
}
function popContext() {
  this.contexts.pop();
  if (this.contexts.length > 0) {
    this.setContext(this.contexts[this.contexts.length - 1]);
  } else {
    this.setContext(undefined);
  }
}
function pushContext(context) {
  this.contexts.push(context);
  this.setContext(context);
}
function setup(parentPath, container, listKey, key) {
  this.listKey = listKey;
  this.container = container;
  this.parentPath = parentPath || this.parentPath;
  this.setKey(key);
}
function setKey(key) {
  var _this$node;
  this.key = key;
  this.node = this.container[this.key];
  this.type = (_this$node = this.node) == null ? void 0 : _this$node.type;
}
function requeue(pathToQueue = this) {
  if (pathToQueue.removed) return;
  ;
  const contexts = this.contexts;
  for (const context of contexts) {
    context.maybeQueue(pathToQueue);
  }
}
function _getQueueContexts() {
  let path = this;
  let contexts = this.contexts;
  while (!contexts.length) {
    path = path.parentPath;
    if (!path) break;
    contexts = path.contexts;
  }
  return contexts;
}

//# sourceMappingURL=context.js.map

import React, { createContext, useState, useEffect } from 'react';
import * as Location from "expo-location";
import { supabase } from '../lib/supabase';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [dataMayoristas, setDataMayoristas] = useState([])
  const [location, setLocation] = useState(null);
  const [datosLocation, setDatosLocation] = useState([])
  console.log(location)
  const getUsersWithRolesAndDistributors = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select(`
         full_name,
         avatar_url,
         distributors(*)
        `)
      if (data) {
        const filteredData = data.filter((user) => user.distributors !== null);
        setDataMayoristas(filteredData);
        return data;
      } else {
        console.log("Data is null");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  useEffect(() => {
    getUsersWithRolesAndDistributors();
  }, []);

  /* ESTA FUNCION ES PARA TRAERNOS LA UBICACION DEL CLIENTE */
  
  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (dataMayoristas && location) {
        const latitud = location.coords.latitude;
        const longitud = location.coords.longitude;
        const distances = dataMayoristas.map(local => {
          const id = local.distributors.user_id;
          const localLatitud = local.distributors.latitude;
          const localLongitud = local.distributors.longitude;
          const distance = calculateDistance(latitud, longitud, localLatitud, localLongitud);
          return { id, distance };
        });

        const sortedLocations = distances.sort((a, b) => a.distance - b.distance);
        const nearest = sortedLocations.slice(0, 5);

        setDatosLocation(nearest);
      }

    };
    getLocationAsync();
  }, [dataMayoristas]);


  //funcion para calcular el radio de la tierra y comparar la distancia entre el punto A y B

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  return (
    <LocationContext.Provider value={{
      dataMayoristas,
      location,
      datosLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getConfig: true,
  getPackageJson: true,
  readConfigJson: true,
  getConfigFilePaths: true,
  findConfigFile: true,
  configFilename: true,
  readExpRcAsync: true,
  resetCustomConfigPaths: true,
  setCustomConfigPath: true,
  modifyConfigAsync: true,
  writeConfigJsonAsync: true,
  getWebOutputPath: true,
  getNameFromConfig: true,
  getDefaultTarget: true,
  getProjectConfigDescription: true,
  getProjectConfigDescriptionWithPaths: true,
  isLegacyImportsEnabled: true
};
exports.configFilename = configFilename;
exports.findConfigFile = findConfigFile;
exports.getConfig = getConfig;
exports.getConfigFilePaths = getConfigFilePaths;
exports.getDefaultTarget = getDefaultTarget;
exports.getNameFromConfig = getNameFromConfig;
exports.getPackageJson = getPackageJson;
exports.getProjectConfigDescription = getProjectConfigDescription;
exports.getProjectConfigDescriptionWithPaths = getProjectConfigDescriptionWithPaths;
exports.getWebOutputPath = getWebOutputPath;
Object.defineProperty(exports, "isLegacyImportsEnabled", {
  enumerable: true,
  get: function () {
    return _isLegacyImportsEnabled().isLegacyImportsEnabled;
  }
});
exports.modifyConfigAsync = modifyConfigAsync;
exports.readConfigJson = readConfigJson;
exports.readExpRcAsync = readExpRcAsync;
exports.resetCustomConfigPaths = resetCustomConfigPaths;
exports.setCustomConfigPath = setCustomConfigPath;
exports.writeConfigJsonAsync = writeConfigJsonAsync;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _glob() {
  const data = require("glob");

  _glob = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _slugify() {
  const data = _interopRequireDefault(require("slugify"));

  _slugify = function () {
    return data;
  };

  return data;
}

function _Errors() {
  const data = require("./Errors");

  _Errors = function () {
    return data;
  };

  return data;
}

function _Project() {
  const data = require("./Project");

  _Project = function () {
    return data;
  };

  return data;
}

function _getConfig() {
  const data = require("./getConfig");

  _getConfig = function () {
    return data;
  };

  return data;
}

function _getFullName() {
  const data = require("./getFullName");

  _getFullName = function () {
    return data;
  };

  return data;
}

function _withConfigPlugins() {
  const data = require("./plugins/withConfigPlugins");

  _withConfigPlugins = function () {
    return data;
  };

  return data;
}

function _withInternal() {
  const data = require("./plugins/withInternal");

  _withInternal = function () {
    return data;
  };

  return data;
}

function _resolvePackageJson() {
  const data = require("./resolvePackageJson");

  _resolvePackageJson = function () {
    return data;
  };

  return data;
}

var _Config = require("./Config.types");

Object.keys(_Config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Config[key];
    }
  });
});

function _isLegacyImportsEnabled() {
  const data = require("./isLegacyImportsEnabled");

  _isLegacyImportsEnabled = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If a config has an `expo` object then that will be used as the config.
 * This method reduces out other top level values if an `expo` object exists.
 *
 * @param config Input config object to reduce
 */
function reduceExpoObject(config) {
  var _config$expo;

  if (!config) return config === undefined ? null : config;
  const {
    mods,
    ...expo
  } = (_config$expo = config.expo) !== null && _config$expo !== void 0 ? _config$expo : config;
  return {
    expo,
    mods
  };
}
/**
 * Get all platforms that a project is currently capable of running.
 *
 * @param projectRoot
 * @param exp
 */


function getSupportedPlatforms(projectRoot) {
  const platforms = [];

  if (_resolveFrom().default.silent(projectRoot, 'react-native')) {
    platforms.push('ios', 'android');
  }

  if (_resolveFrom().default.silent(projectRoot, 'react-native-web')) {
    platforms.push('web');
  }

  return platforms;
}
/**
 * Evaluate the config for an Expo project.
 * If a function is exported from the `app.config.js` then a partial config will be passed as an argument.
 * The partial config is composed from any existing app.json, and certain fields from the `package.json` like name and description.
 *
 * If options.isPublicConfig is true, the Expo config will include only public-facing options (omitting private keys).
 * The resulting config should be suitable for hosting or embedding in a publicly readable location.
 *
 * **Example**
 * ```js
 * module.exports = function({ config }) {
 *   // mutate the config before returning it.
 *   config.slug = 'new slug'
 *   return { expo: config };
 * }
 * ```
 *
 * **Supports**
 * - `app.config.ts`
 * - `app.config.js`
 * - `app.config.json`
 * - `app.json`
 *
 * @param projectRoot the root folder containing all of your application code
 * @param options enforce criteria for a project config
 */


function getConfig(projectRoot, options = {}) {
  const paths = getConfigFilePaths(projectRoot);
  const rawStaticConfig = paths.staticConfigPath ? (0, _getConfig().getStaticConfig)(paths.staticConfigPath) : null; // For legacy reasons, always return an object.

  const rootConfig = rawStaticConfig || {};
  const staticConfig = reduceExpoObject(rawStaticConfig) || {}; // Can only change the package.json location if an app.json or app.config.json exists

  const [packageJson, packageJsonPath] = getPackageJsonAndPath(projectRoot);

  function fillAndReturnConfig(config, dynamicConfigObjectType) {
    const configWithDefaultValues = { ...ensureConfigHasDefaultValues({
        projectRoot,
        exp: config.expo,
        pkg: packageJson,
        skipSDKVersionRequirement: options.skipSDKVersionRequirement,
        paths,
        packageJsonPath
      }),
      mods: config.mods,
      dynamicConfigObjectType,
      rootConfig,
      dynamicConfigPath: paths.dynamicConfigPath,
      staticConfigPath: paths.staticConfigPath
    };

    if (options.isModdedConfig) {
      var _config$mods;

      // @ts-ignore: Add the mods back to the object.
      configWithDefaultValues.exp.mods = (_config$mods = config.mods) !== null && _config$mods !== void 0 ? _config$mods : null;
    } // Apply static json plugins, should be done after _internal


    configWithDefaultValues.exp = (0, _withConfigPlugins().withConfigPlugins)(configWithDefaultValues.exp, !!options.skipPlugins);

    if (!options.isModdedConfig) {
      // @ts-ignore: Delete mods added by static plugins when they won't have a chance to be evaluated
      delete configWithDefaultValues.exp.mods;
    }

    if (options.isPublicConfig) {
      var _configWithDefaultVal, _configWithDefaultVal2, _configWithDefaultVal3, _configWithDefaultVal4;

      // Remove internal values with references to user's file paths from the public config.
      delete configWithDefaultValues.exp._internal;

      if (configWithDefaultValues.exp.hooks) {
        delete configWithDefaultValues.exp.hooks;
      }

      if ((_configWithDefaultVal = configWithDefaultValues.exp.ios) !== null && _configWithDefaultVal !== void 0 && _configWithDefaultVal.config) {
        delete configWithDefaultValues.exp.ios.config;
      }

      if ((_configWithDefaultVal2 = configWithDefaultValues.exp.android) !== null && _configWithDefaultVal2 !== void 0 && _configWithDefaultVal2.config) {
        delete configWithDefaultValues.exp.android.config;
      } // These value will be overwritten when the manifest is being served from the host (i.e. not completely accurate).
      // @ts-ignore: currentFullName not on type yet.


      configWithDefaultValues.exp.currentFullName = (0, _getFullName().getFullName)(configWithDefaultValues.exp); // @ts-ignore: originalFullName not on type yet.

      configWithDefaultValues.exp.originalFullName = (0, _getFullName().getFullName)(configWithDefaultValues.exp);
      (_configWithDefaultVal3 = configWithDefaultValues.exp.updates) === null || _configWithDefaultVal3 === void 0 ? true : delete _configWithDefaultVal3.codeSigningCertificate;
      (_configWithDefaultVal4 = configWithDefaultValues.exp.updates) === null || _configWithDefaultVal4 === void 0 ? true : delete _configWithDefaultVal4.codeSigningMetadata;
    }

    return configWithDefaultValues;
  } // Fill in the static config


  function getContextConfig(config) {
    return ensureConfigHasDefaultValues({
      projectRoot,
      exp: config.expo,
      pkg: packageJson,
      skipSDKVersionRequirement: true,
      paths,
      packageJsonPath
    }).exp;
  }

  if (paths.dynamicConfigPath) {
    // No app.config.json or app.json but app.config.js
    const {
      exportedObjectType,
      config: rawDynamicConfig
    } = (0, _getConfig().getDynamicConfig)(paths.dynamicConfigPath, {
      projectRoot,
      staticConfigPath: paths.staticConfigPath,
      packageJsonPath,
      config: getContextConfig(staticConfig)
    }); // Allow for the app.config.js to `export default null;`
    // Use `dynamicConfigPath` to detect if a dynamic config exists.

    const dynamicConfig = reduceExpoObject(rawDynamicConfig) || {};
    return fillAndReturnConfig(dynamicConfig, exportedObjectType);
  } // No app.config.js but json or no config


  return fillAndReturnConfig(staticConfig || {}, null);
}

function getPackageJson(projectRoot) {
  const [pkg] = getPackageJsonAndPath(projectRoot);
  return pkg;
}

function getPackageJsonAndPath(projectRoot) {
  const packageJsonPath = (0, _resolvePackageJson().getRootPackageJsonPath)(projectRoot);
  return [_jsonFile().default.read(packageJsonPath), packageJsonPath];
}

function readConfigJson(projectRoot, skipValidation = false, skipSDKVersionRequirement = false) {
  const paths = getConfigFilePaths(projectRoot);
  const rawStaticConfig = paths.staticConfigPath ? (0, _getConfig().getStaticConfig)(paths.staticConfigPath) : null;

  const getConfigName = () => {
    if (paths.staticConfigPath) return ` \`${_path().default.basename(paths.staticConfigPath)}\``;
    return '';
  };

  let outputRootConfig = rawStaticConfig;

  if (outputRootConfig === null || typeof outputRootConfig !== 'object') {
    if (skipValidation) {
      outputRootConfig = {
        expo: {}
      };
    } else {
      throw new (_Errors().ConfigError)(`Project at path ${_path().default.resolve(projectRoot)} does not contain a valid Expo config${getConfigName()}`, 'NOT_OBJECT');
    }
  }

  let exp = outputRootConfig.expo;

  if (exp === null || typeof exp !== 'object') {
    throw new (_Errors().ConfigError)(`Property 'expo' in${getConfigName()} for project at path ${_path().default.resolve(projectRoot)} is not an object. Please make sure${getConfigName()} includes a managed Expo app config like this: ${APP_JSON_EXAMPLE}`, 'NO_EXPO');
  }

  exp = { ...exp
  };
  const [pkg, packageJsonPath] = getPackageJsonAndPath(projectRoot);
  return { ...ensureConfigHasDefaultValues({
      projectRoot,
      exp,
      pkg,
      skipSDKVersionRequirement,
      paths,
      packageJsonPath
    }),
    mods: null,
    dynamicConfigObjectType: null,
    rootConfig: { ...outputRootConfig
    },
    ...paths
  };
}
/**
 * Get the static and dynamic config paths for a project. Also accounts for custom paths.
 *
 * @param projectRoot
 */


function getConfigFilePaths(projectRoot) {
  const customPaths = getCustomConfigFilePaths(projectRoot);

  if (customPaths) {
    return customPaths;
  }

  return {
    dynamicConfigPath: getDynamicConfigFilePath(projectRoot),
    staticConfigPath: getStaticConfigFilePath(projectRoot)
  };
}

function getCustomConfigFilePaths(projectRoot) {
  if (!customConfigPaths[projectRoot]) {
    return null;
  } // If the user picks a custom config path, we will only use that and skip searching for a secondary config.


  if (isDynamicFilePath(customConfigPaths[projectRoot])) {
    return {
      dynamicConfigPath: customConfigPaths[projectRoot],
      staticConfigPath: null
    };
  } // Anything that's not js or ts will be treated as json.


  return {
    staticConfigPath: customConfigPaths[projectRoot],
    dynamicConfigPath: null
  };
}

function getDynamicConfigFilePath(projectRoot) {
  for (const fileName of ['app.config.ts', 'app.config.js']) {
    const configPath = _path().default.join(projectRoot, fileName);

    if (_fs().default.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
}

function getStaticConfigFilePath(projectRoot) {
  for (const fileName of ['app.config.json', 'app.json']) {
    const configPath = _path().default.join(projectRoot, fileName);

    if (_fs().default.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
} // TODO: This should account for dynamic configs


function findConfigFile(projectRoot) {
  let configPath; // Check for a custom config path first.

  if (customConfigPaths[projectRoot]) {
    configPath = customConfigPaths[projectRoot]; // We shouldn't verify if the file exists because
    // the user manually specified that this path should be used.

    return {
      configPath,
      configName: _path().default.basename(configPath),
      configNamespace: 'expo'
    };
  } else {
    // app.config.json takes higher priority over app.json
    configPath = _path().default.join(projectRoot, 'app.config.json');

    if (!_fs().default.existsSync(configPath)) {
      configPath = _path().default.join(projectRoot, 'app.json');
    }
  }

  return {
    configPath,
    configName: _path().default.basename(configPath),
    configNamespace: 'expo'
  };
} // TODO: deprecate


function configFilename(projectRoot) {
  return findConfigFile(projectRoot).configName;
}

async function readExpRcAsync(projectRoot) {
  const expRcPath = _path().default.join(projectRoot, '.exprc');

  return await _jsonFile().default.readAsync(expRcPath, {
    json5: true,
    cantReadFileDefault: {}
  });
}

const customConfigPaths = {};

function resetCustomConfigPaths() {
  for (const key of Object.keys(customConfigPaths)) {
    delete customConfigPaths[key];
  }
}

function setCustomConfigPath(projectRoot, configPath) {
  customConfigPaths[projectRoot] = configPath;
}
/**
 * Attempt to modify an Expo project config.
 * This will only fully work if the project is using static configs only.
 * Otherwise 'warn' | 'fail' will return with a message about why the config couldn't be updated.
 * The potentially modified config object will be returned for testing purposes.
 *
 * @param projectRoot
 * @param modifications modifications to make to an existing config
 * @param readOptions options for reading the current config file
 * @param writeOptions If true, the static config file will not be rewritten
 */


async function modifyConfigAsync(projectRoot, modifications, readOptions = {}, writeOptions = {}) {
  const config = getConfig(projectRoot, readOptions);

  if (config.dynamicConfigPath) {
    // We cannot automatically write to a dynamic config.

    /* Currently we should just use the safest approach possible, informing the user that they'll need to manually modify their dynamic config.
     if (config.staticConfigPath) {
      // Both a dynamic and a static config exist.
      if (config.dynamicConfigObjectType === 'function') {
        // The dynamic config exports a function, this means it possibly extends the static config.
      } else {
        // Dynamic config ignores the static config, there isn't a reason to automatically write to it.
        // Instead we should warn the user to add values to their dynamic config.
      }
    }
    */
    return {
      type: 'warn',
      message: `Cannot automatically write to dynamic config at: ${_path().default.relative(projectRoot, config.dynamicConfigPath)}`,
      config: null
    };
  } else if (config.staticConfigPath) {
    // Static with no dynamic config, this means we can append to the config automatically.
    let outputConfig; // If the config has an expo object (app.json) then append the options to that object.

    if (config.rootConfig.expo) {
      outputConfig = { ...config.rootConfig,
        expo: { ...config.rootConfig.expo,
          ...modifications
        }
      };
    } else {
      // Otherwise (app.config.json) just add the config modification to the top most level.
      outputConfig = { ...config.rootConfig,
        ...modifications
      };
    }

    if (!writeOptions.dryRun) {
      await _jsonFile().default.writeAsync(config.staticConfigPath, outputConfig, {
        json5: false
      });
    }

    return {
      type: 'success',
      config: outputConfig
    };
  }

  return {
    type: 'fail',
    message: 'No config exists',
    config: null
  };
}

const APP_JSON_EXAMPLE = JSON.stringify({
  expo: {
    name: 'My app',
    slug: 'my-app',
    sdkVersion: '...'
  }
});

function ensureConfigHasDefaultValues({
  projectRoot,
  exp,
  pkg,
  paths,
  packageJsonPath,
  skipSDKVersionRequirement = false
}) {
  var _exp$name, _exp$slug, _exp$version;

  if (!exp) {
    exp = {};
  }

  exp = (0, _withInternal().withInternal)(exp, {
    projectRoot,
    ...(paths !== null && paths !== void 0 ? paths : {}),
    packageJsonPath
  }); // Defaults for package.json fields

  const pkgName = typeof pkg.name === 'string' ? pkg.name : _path().default.basename(projectRoot);
  const pkgVersion = typeof pkg.version === 'string' ? pkg.version : '1.0.0';
  const pkgWithDefaults = { ...pkg,
    name: pkgName,
    version: pkgVersion
  }; // Defaults for app.json/app.config.js fields

  const name = (_exp$name = exp.name) !== null && _exp$name !== void 0 ? _exp$name : pkgName;
  const slug = (_exp$slug = exp.slug) !== null && _exp$slug !== void 0 ? _exp$slug : (0, _slugify().default)(name.toLowerCase());
  const version = (_exp$version = exp.version) !== null && _exp$version !== void 0 ? _exp$version : pkgVersion;
  let description = exp.description;

  if (!description && typeof pkg.description === 'string') {
    description = pkg.description;
  }

  const expWithDefaults = { ...exp,
    name,
    slug,
    version,
    description
  };
  let sdkVersion;

  try {
    sdkVersion = (0, _Project().getExpoSDKVersion)(projectRoot, expWithDefaults);
  } catch (error) {
    if (!skipSDKVersionRequirement) throw error;
  }

  let platforms = exp.platforms;

  if (!platforms) {
    platforms = getSupportedPlatforms(projectRoot);
  }

  return {
    exp: { ...expWithDefaults,
      sdkVersion,
      platforms
    },
    pkg: pkgWithDefaults
  };
}

async function writeConfigJsonAsync(projectRoot, options) {
  const paths = getConfigFilePaths(projectRoot);
  let {
    exp,
    pkg,
    rootConfig,
    dynamicConfigObjectType
  } = readConfigJson(projectRoot);
  exp = { ...rootConfig.expo,
    ...options
  };
  rootConfig = { ...rootConfig,
    expo: exp
  };

  if (paths.staticConfigPath) {
    await _jsonFile().default.writeAsync(paths.staticConfigPath, rootConfig, {
      json5: false
    });
  } else {
    console.log('Failed to write to config: ', options);
  }

  return {
    exp,
    pkg,
    rootConfig,
    dynamicConfigObjectType,
    ...paths
  };
}

const DEFAULT_BUILD_PATH = `web-build`;

function getWebOutputPath(config = {}) {
  var _expo$web, _expo$web$build;

  if (process.env.WEBPACK_BUILD_OUTPUT_PATH) {
    return process.env.WEBPACK_BUILD_OUTPUT_PATH;
  }

  const expo = config.expo || config || {};
  return (expo === null || expo === void 0 ? void 0 : (_expo$web = expo.web) === null || _expo$web === void 0 ? void 0 : (_expo$web$build = _expo$web.build) === null || _expo$web$build === void 0 ? void 0 : _expo$web$build.output) || DEFAULT_BUILD_PATH;
}

function getNameFromConfig(exp = {}) {
  // For RN CLI support
  const appManifest = exp.expo || exp;
  const {
    web = {}
  } = appManifest; // rn-cli apps use a displayName value as well.

  const appName = exp.displayName || appManifest.displayName || appManifest.name;
  const webName = web.name || appName;
  return {
    appName,
    webName
  };
}

function getDefaultTarget(projectRoot, exp) {
  var _exp;

  (_exp = exp) !== null && _exp !== void 0 ? _exp : exp = getConfig(projectRoot, {
    skipSDKVersionRequirement: true
  }).exp; // before SDK 37, always default to managed to preserve previous behavior

  if (exp.sdkVersion && exp.sdkVersion !== 'UNVERSIONED' && _semver().default.lt(exp.sdkVersion, '37.0.0')) {
    return 'managed';
  }

  return isBareWorkflowProject(projectRoot) ? 'bare' : 'managed';
}

function isBareWorkflowProject(projectRoot) {
  const [pkg] = getPackageJsonAndPath(projectRoot);

  if (pkg.dependencies && pkg.dependencies.expokit) {
    return false;
  }

  const xcodeprojFiles = (0, _glob().sync)('ios/**/*.xcodeproj', {
    absolute: true,
    cwd: projectRoot
  });

  if (xcodeprojFiles.length) {
    return true;
  }

  const gradleFiles = (0, _glob().sync)('android/**/*.gradle', {
    absolute: true,
    cwd: projectRoot
  });

  if (gradleFiles.length) {
    return true;
  }

  return false;
}
/**
 * true if the file is .js or .ts
 *
 * @param filePath
 */


function isDynamicFilePath(filePath) {
  return !!filePath.match(/\.[j|t]s$/);
}
/**
 * Return a useful name describing the project config.
 * - dynamic: app.config.js
 * - static: app.json
 * - custom path app config relative to root folder
 * - both: app.config.js or app.json
 */


function getProjectConfigDescription(projectRoot) {
  const paths = getConfigFilePaths(projectRoot);
  return getProjectConfigDescriptionWithPaths(projectRoot, paths);
}
/**
 * Returns a string describing the configurations used for the given project root.
 * Will return null if no config is found.
 *
 * @param projectRoot
 * @param projectConfig
 */


function getProjectConfigDescriptionWithPaths(projectRoot, projectConfig) {
  if (projectConfig.dynamicConfigPath) {
    const relativeDynamicConfigPath = _path().default.relative(projectRoot, projectConfig.dynamicConfigPath);

    if (projectConfig.staticConfigPath) {
      return `${relativeDynamicConfigPath} or ${_path().default.relative(projectRoot, projectConfig.staticConfigPath)}`;
    }

    return relativeDynamicConfigPath;
  } else if (projectConfig.staticConfigPath) {
    return _path().default.relative(projectRoot, projectConfig.staticConfigPath);
  } // If a config doesn't exist, our tooling will generate a static app.json


  return 'app.json';
}
//# sourceMappingURL=Config.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getConfig: true,
  getPackageJson: true,
  readConfigJson: true,
  getConfigFilePaths: true,
  findConfigFile: true,
  configFilename: true,
  readExpRcAsync: true,
  resetCustomConfigPaths: true,
  setCustomConfigPath: true,
  modifyConfigAsync: true,
  writeConfigJsonAsync: true,
  getWebOutputPath: true,
  getNameFromConfig: true,
  getDefaultTarget: true,
  getProjectConfigDescription: true,
  getProjectConfigDescriptionWithPaths: true,
  isLegacyImportsEnabled: true
};
exports.configFilename = configFilename;
exports.findConfigFile = findConfigFile;
exports.getConfig = getConfig;
exports.getConfigFilePaths = getConfigFilePaths;
exports.getDefaultTarget = getDefaultTarget;
exports.getNameFromConfig = getNameFromConfig;
exports.getPackageJson = getPackageJson;
exports.getProjectConfigDescription = getProjectConfigDescription;
exports.getProjectConfigDescriptionWithPaths = getProjectConfigDescriptionWithPaths;
exports.getWebOutputPath = getWebOutputPath;
Object.defineProperty(exports, "isLegacyImportsEnabled", {
  enumerable: true,
  get: function () {
    return _isLegacyImportsEnabled().isLegacyImportsEnabled;
  }
});
exports.modifyConfigAsync = modifyConfigAsync;
exports.readConfigJson = readConfigJson;
exports.readExpRcAsync = readExpRcAsync;
exports.resetCustomConfigPaths = resetCustomConfigPaths;
exports.setCustomConfigPath = setCustomConfigPath;
exports.writeConfigJsonAsync = writeConfigJsonAsync;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _glob() {
  const data = require("glob");

  _glob = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _slugify() {
  const data = _interopRequireDefault(require("slugify"));

  _slugify = function () {
    return data;
  };

  return data;
}

function _Errors() {
  const data = require("./Errors");

  _Errors = function () {
    return data;
  };

  return data;
}

function _Project() {
  const data = require("./Project");

  _Project = function () {
    return data;
  };

  return data;
}

function _getConfig() {
  const data = require("./getConfig");

  _getConfig = function () {
    return data;
  };

  return data;
}

function _getFullName() {
  const data = require("./getFullName");

  _getFullName = function () {
    return data;
  };

  return data;
}

function _withConfigPlugins() {
  const data = require("./plugins/withConfigPlugins");

  _withConfigPlugins = function () {
    return data;
  };

  return data;
}

function _withInternal() {
  const data = require("./plugins/withInternal");

  _withInternal = function () {
    return data;
  };

  return data;
}

function _resolvePackageJson() {
  const data = require("./resolvePackageJson");

  _resolvePackageJson = function () {
    return data;
  };

  return data;
}

var _Config = require("./Config.types");

Object.keys(_Config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Config[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Config[key];
    }
  });
});

function _isLegacyImportsEnabled() {
  const data = require("./isLegacyImportsEnabled");

  _isLegacyImportsEnabled = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If a config has an `expo` object then that will be used as the config.
 * This method reduces out other top level values if an `expo` object exists.
 *
 * @param config Input config object to reduce
 */
function reduceExpoObject(config) {
  var _config$expo;

  if (!config) return config === undefined ? null : config;
  const {
    mods,
    ...expo
  } = (_config$expo = config.expo) !== null && _config$expo !== void 0 ? _config$expo : config;
  return {
    expo,
    mods
  };
}
/**
 * Get all platforms that a project is currently capable of running.
 *
 * @param projectRoot
 * @param exp
 */


function getSupportedPlatforms(projectRoot) {
  const platforms = [];

  if (_resolveFrom().default.silent(projectRoot, 'react-native')) {
    platforms.push('ios', 'android');
  }

  if (_resolveFrom().default.silent(projectRoot, 'react-native-web')) {
    platforms.push('web');
  }

  return platforms;
}
/**
 * Evaluate the config for an Expo project.
 * If a function is exported from the `app.config.js` then a partial config will be passed as an argument.
 * The partial config is composed from any existing app.json, and certain fields from the `package.json` like name and description.
 *
 * If options.isPublicConfig is true, the Expo config will include only public-facing options (omitting private keys).
 * The resulting config should be suitable for hosting or embedding in a publicly readable location.
 *
 * **Example**
 * ```js
 * module.exports = function({ config }) {
 *   // mutate the config before returning it.
 *   config.slug = 'new slug'
 *   return { expo: config };
 * }
 * ```
 *
 * **Supports**
 * - `app.config.ts`
 * - `app.config.js`
 * - `app.config.json`
 * - `app.json`
 *
 * @param projectRoot the root folder containing all of your application code
 * @param options enforce criteria for a project config
 */


function getConfig(projectRoot, options = {}) {
  const paths = getConfigFilePaths(projectRoot);
  const rawStaticConfig = paths.staticConfigPath ? (0, _getConfig().getStaticConfig)(paths.staticConfigPath) : null; // For legacy reasons, always return an object.

  const rootConfig = rawStaticConfig || {};
  const staticConfig = reduceExpoObject(rawStaticConfig) || {}; // Can only change the package.json location if an app.json or app.config.json exists

  const [packageJson, packageJsonPath] = getPackageJsonAndPath(projectRoot);

  function fillAndReturnConfig(config, dynamicConfigObjectType) {
    const configWithDefaultValues = { ...ensureConfigHasDefaultValues({
        projectRoot,
        exp: config.expo,
        pkg: packageJson,
        skipSDKVersionRequirement: options.skipSDKVersionRequirement,
        paths,
        packageJsonPath
      }),
      mods: config.mods,
      dynamicConfigObjectType,
      rootConfig,
      dynamicConfigPath: paths.dynamicConfigPath,
      staticConfigPath: paths.staticConfigPath
    };

    if (options.isModdedConfig) {
      var _config$mods;

      // @ts-ignore: Add the mods back to the object.
      configWithDefaultValues.exp.mods = (_config$mods = config.mods) !== null && _config$mods !== void 0 ? _config$mods : null;
    } // Apply static json plugins, should be done after _internal


    configWithDefaultValues.exp = (0, _withConfigPlugins().withConfigPlugins)(configWithDefaultValues.exp, !!options.skipPlugins);

    if (!options.isModdedConfig) {
      // @ts-ignore: Delete mods added by static plugins when they won't have a chance to be evaluated
      delete configWithDefaultValues.exp.mods;
    }

    if (options.isPublicConfig) {
      var _configWithDefaultVal, _configWithDefaultVal2, _configWithDefaultVal3, _configWithDefaultVal4;

      // Remove internal values with references to user's file paths from the public config.
      delete configWithDefaultValues.exp._internal;

      if (configWithDefaultValues.exp.hooks) {
        delete configWithDefaultValues.exp.hooks;
      }

      if ((_configWithDefaultVal = configWithDefaultValues.exp.ios) !== null && _configWithDefaultVal !== void 0 && _configWithDefaultVal.config) {
        delete configWithDefaultValues.exp.ios.config;
      }

      if ((_configWithDefaultVal2 = configWithDefaultValues.exp.android) !== null && _configWithDefaultVal2 !== void 0 && _configWithDefaultVal2.config) {
        delete configWithDefaultValues.exp.android.config;
      } // These value will be overwritten when the manifest is being served from the host (i.e. not completely accurate).
      // @ts-ignore: currentFullName not on type yet.


      configWithDefaultValues.exp.currentFullName = (0, _getFullName().getFullName)(configWithDefaultValues.exp); // @ts-ignore: originalFullName not on type yet.

      configWithDefaultValues.exp.originalFullName = (0, _getFullName().getFullName)(configWithDefaultValues.exp);
      (_configWithDefaultVal3 = configWithDefaultValues.exp.updates) === null || _configWithDefaultVal3 === void 0 ? true : delete _configWithDefaultVal3.codeSigningCertificate;
      (_configWithDefaultVal4 = configWithDefaultValues.exp.updates) === null || _configWithDefaultVal4 === void 0 ? true : delete _configWithDefaultVal4.codeSigningMetadata;
    }

    return configWithDefaultValues;
  } // Fill in the static config


  function getContextConfig(config) {
    return ensureConfigHasDefaultValues({
      projectRoot,
      exp: config.expo,
      pkg: packageJson,
      skipSDKVersionRequirement: true,
      paths,
      packageJsonPath
    }).exp;
  }

  if (paths.dynamicConfigPath) {
    // No app.config.json or app.json but app.config.js
    const {
      exportedObjectType,
      config: rawDynamicConfig
    } = (0, _getConfig().getDynamicConfig)(paths.dynamicConfigPath, {
      projectRoot,
      staticConfigPath: paths.staticConfigPath,
      packageJsonPath,
      config: getContextConfig(staticConfig)
    }); // Allow for the app.config.js to `export default null;`
    // Use `dynamicConfigPath` to detect if a dynamic config exists.

    const dynamicConfig = reduceExpoObject(rawDynamicConfig) || {};
    return fillAndReturnConfig(dynamicConfig, exportedObjectType);
  } // No app.config.js but json or no config


  return fillAndReturnConfig(staticConfig || {}, null);
}

function getPackageJson(projectRoot) {
  const [pkg] = getPackageJsonAndPath(projectRoot);
  return pkg;
}

function getPackageJsonAndPath(projectRoot) {
  const packageJsonPath = (0, _resolvePackageJson().getRootPackageJsonPath)(projectRoot);
  return [_jsonFile().default.read(packageJsonPath), packageJsonPath];
}

function readConfigJson(projectRoot, skipValidation = false, skipSDKVersionRequirement = false) {
  const paths = getConfigFilePaths(projectRoot);
  const rawStaticConfig = paths.staticConfigPath ? (0, _getConfig().getStaticConfig)(paths.staticConfigPath) : null;

  const getConfigName = () => {
    if (paths.staticConfigPath) return ` \`${_path().default.basename(paths.staticConfigPath)}\``;
    return '';
  };

  let outputRootConfig = rawStaticConfig;

  if (outputRootConfig === null || typeof outputRootConfig !== 'object') {
    if (skipValidation) {
      outputRootConfig = {
        expo: {}
      };
    } else {
      throw new (_Errors().ConfigError)(`Project at path ${_path().default.resolve(projectRoot)} does not contain a valid Expo config${getConfigName()}`, 'NOT_OBJECT');
    }
  }

  let exp = outputRootConfig.expo;

  if (exp === null || typeof exp !== 'object') {
    throw new (_Errors().ConfigError)(`Property 'expo' in${getConfigName()} for project at path ${_path().default.resolve(projectRoot)} is not an object. Please make sure${getConfigName()} includes a managed Expo app config like this: ${APP_JSON_EXAMPLE}`, 'NO_EXPO');
  }

  exp = { ...exp
  };
  const [pkg, packageJsonPath] = getPackageJsonAndPath(projectRoot);
  return { ...ensureConfigHasDefaultValues({
      projectRoot,
      exp,
      pkg,
      skipSDKVersionRequirement,
      paths,
      packageJsonPath
    }),
    mods: null,
    dynamicConfigObjectType: null,
    rootConfig: { ...outputRootConfig
    },
    ...paths
  };
}
/**
 * Get the static and dynamic config paths for a project. Also accounts for custom paths.
 *
 * @param projectRoot
 */


function getConfigFilePaths(projectRoot) {
  const customPaths = getCustomConfigFilePaths(projectRoot);

  if (customPaths) {
    return customPaths;
  }

  return {
    dynamicConfigPath: getDynamicConfigFilePath(projectRoot),
    staticConfigPath: getStaticConfigFilePath(projectRoot)
  };
}

function getCustomConfigFilePaths(projectRoot) {
  if (!customConfigPaths[projectRoot]) {
    return null;
  } // If the user picks a custom config path, we will only use that and skip searching for a secondary config.


  if (isDynamicFilePath(customConfigPaths[projectRoot])) {
    return {
      dynamicConfigPath: customConfigPaths[projectRoot],
      staticConfigPath: null
    };
  } // Anything that's not js or ts will be treated as json.


  return {
    staticConfigPath: customConfigPaths[projectRoot],
    dynamicConfigPath: null
  };
}

function getDynamicConfigFilePath(projectRoot) {
  for (const fileName of ['app.config.ts', 'app.config.js']) {
    const configPath = _path().default.join(projectRoot, fileName);

    if (_fs().default.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
}

function getStaticConfigFilePath(projectRoot) {
  for (const fileName of ['app.config.json', 'app.json']) {
    const configPath = _path().default.join(projectRoot, fileName);

    if (_fs().default.existsSync(configPath)) {
      return configPath;
    }
  }

  return null;
} // TODO: This should account for dynamic configs


function findConfigFile(projectRoot) {
  let configPath; // Check for a custom config path first.

  if (customConfigPaths[projectRoot]) {
    configPath = customConfigPaths[projectRoot]; // We shouldn't verify if the file exists because
    // the user manually specified that this path should be used.

    return {
      configPath,
      configName: _path().default.basename(configPath),
      configNamespace: 'expo'
    };
  } else {
    // app.config.json takes higher priority over app.json
    configPath = _path().default.join(projectRoot, 'app.config.json');

    if (!_fs().default.existsSync(configPath)) {
      configPath = _path().default.join(projectRoot, 'app.json');
    }
  }

  return {
    configPath,
    configName: _path().default.basename(configPath),
    configNamespace: 'expo'
  };
} // TODO: deprecate


function configFilename(projectRoot) {
  return findConfigFile(projectRoot).configName;
}

async function readExpRcAsync(projectRoot) {
  const expRcPath = _path().default.join(projectRoot, '.exprc');

  return await _jsonFile().default.readAsync(expRcPath, {
    json5: true,
    cantReadFileDefault: {}
  });
}

const customConfigPaths = {};

function resetCustomConfigPaths() {
  for (const key of Object.keys(customConfigPaths)) {
    delete customConfigPaths[key];
  }
}

function setCustomConfigPath(projectRoot, configPath) {
  customConfigPaths[projectRoot] = configPath;
}
/**
 * Attempt to modify an Expo project config.
 * This will only fully work if the project is using static configs only.
 * Otherwise 'warn' | 'fail' will return with a message about why the config couldn't be updated.
 * The potentially modified config object will be returned for testing purposes.
 *
 * @param projectRoot
 * @param modifications modifications to make to an existing config
 * @param readOptions options for reading the current config file
 * @param writeOptions If true, the static config file will not be rewritten
 */


async function modifyConfigAsync(projectRoot, modifications, readOptions = {}, writeOptions = {}) {
  const config = getConfig(projectRoot, readOptions);

  if (config.dynamicConfigPath) {
    // We cannot automatically write to a dynamic config.

    /* Currently we should just use the safest approach possible, informing the user that they'll need to manually modify their dynamic config.
     if (config.staticConfigPath) {
      // Both a dynamic and a static config exist.
      if (config.dynamicConfigObjectType === 'function') {
        // The dynamic config exports a function, this means it possibly extends the static config.
      } else {
        // Dynamic config ignores the static config, there isn't a reason to automatically write to it.
        // Instead we should warn the user to add values to their dynamic config.
      }
    }
    */
    return {
      type: 'warn',
      message: `Cannot automatically write to dynamic config at: ${_path().default.relative(projectRoot, config.dynamicConfigPath)}`,
      config: null
    };
  } else if (config.staticConfigPath) {
    // Static with no dynamic config, this means we can append to the config automatically.
    let outputConfig; // If the config has an expo object (app.json) then append the options to that object.

    if (config.rootConfig.expo) {
      outputConfig = { ...config.rootConfig,
        expo: { ...config.rootConfig.expo,
          ...modifications
        }
      };
    } else {
      // Otherwise (app.config.json) just add the config modification to the top most level.
      outputConfig = { ...config.rootConfig,
        ...modifications
      };
    }

    if (!writeOptions.dryRun) {
      await _jsonFile().default.writeAsync(config.staticConfigPath, outputConfig, {
        json5: false
      });
    }

    return {
      type: 'success',
      config: outputConfig
    };
  }

  return {
    type: 'fail',
    message: 'No config exists',
    config: null
  };
}

const APP_JSON_EXAMPLE = JSON.stringify({
  expo: {
    name: 'My app',
    slug: 'my-app',
    sdkVersion: '...'
  }
});

function ensureConfigHasDefaultValues({
  projectRoot,
  exp,
  pkg,
  paths,
  packageJsonPath,
  skipSDKVersionRequirement = false
}) {
  var _exp$name, _exp$slug, _exp$version;

  if (!exp) {
    exp = {};
  }

  exp = (0, _withInternal().withInternal)(exp, {
    projectRoot,
    ...(paths !== null && paths !== void 0 ? paths : {}),
    packageJsonPath
  }); // Defaults for package.json fields

  const pkgName = typeof pkg.name === 'string' ? pkg.name : _path().default.basename(projectRoot);
  const pkgVersion = typeof pkg.version === 'string' ? pkg.version : '1.0.0';
  const pkgWithDefaults = { ...pkg,
    name: pkgName,
    version: pkgVersion
  }; // Defaults for app.json/app.config.js fields

  const name = (_exp$name = exp.name) !== null && _exp$name !== void 0 ? _exp$name : pkgName;
  const slug = (_exp$slug = exp.slug) !== null && _exp$slug !== void 0 ? _exp$slug : (0, _slugify().default)(name.toLowerCase());
  const version = (_exp$version = exp.version) !== null && _exp$version !== void 0 ? _exp$version : pkgVersion;
  let description = exp.description;

  if (!description && typeof pkg.description === 'string') {
    description = pkg.description;
  }

  const expWithDefaults = { ...exp,
    name,
    slug,
    version,
    description
  };
  let sdkVersion;

  try {
    sdkVersion = (0, _Project().getExpoSDKVersion)(projectRoot, expWithDefaults);
  } catch (error) {
    if (!skipSDKVersionRequirement) throw error;
  }

  let platforms = exp.platforms;

  if (!platforms) {
    platforms = getSupportedPlatforms(projectRoot);
  }

  return {
    exp: { ...expWithDefaults,
      sdkVersion,
      platforms
    },
    pkg: pkgWithDefaults
  };
}

async function writeConfigJsonAsync(projectRoot, options) {
  const paths = getConfigFilePaths(projectRoot);
  let {
    exp,
    pkg,
    rootConfig,
    dynamicConfigObjectType
  } = readConfigJson(projectRoot);
  exp = { ...rootConfig.expo,
    ...options
  };
  rootConfig = { ...rootConfig,
    expo: exp
  };

  if (paths.staticConfigPath) {
    await _jsonFile().default.writeAsync(paths.staticConfigPath, rootConfig, {
      json5: false
    });
  } else {
    console.log('Failed to write to config: ', options);
  }

  return {
    exp,
    pkg,
    rootConfig,
    dynamicConfigObjectType,
    ...paths
  };
}

const DEFAULT_BUILD_PATH = `web-build`;

function getWebOutputPath(config = {}) {
  var _expo$web, _expo$web$build;

  if (process.env.WEBPACK_BUILD_OUTPUT_PATH) {
    return process.env.WEBPACK_BUILD_OUTPUT_PATH;
  }

  const expo = config.expo || config || {};
  return (expo === null || expo === void 0 ? void 0 : (_expo$web = expo.web) === null || _expo$web === void 0 ? void 0 : (_expo$web$build = _expo$web.build) === null || _expo$web$build === void 0 ? void 0 : _expo$web$build.output) || DEFAULT_BUILD_PATH;
}

function getNameFromConfig(exp = {}) {
  // For RN CLI support
  const appManifest = exp.expo || exp;
  const {
    web = {}
  } = appManifest; // rn-cli apps use a displayName value as well.

  const appName = exp.displayName || appManifest.displayName || appManifest.name;
  const webName = web.name || appName;
  return {
    appName,
    webName
  };
}

function getDefaultTarget(projectRoot, exp) {
  var _exp;

  (_exp = exp) !== null && _exp !== void 0 ? _exp : exp = getConfig(projectRoot, {
    skipSDKVersionRequirement: true
  }).exp; // before SDK 37, always default to managed to preserve previous behavior

  if (exp.sdkVersion && exp.sdkVersion !== 'UNVERSIONED' && _semver().default.lt(exp.sdkVersion, '37.0.0')) {
    return 'managed';
  }

  return isBareWorkflowProject(projectRoot) ? 'bare' : 'managed';
}

function isBareWorkflowProject(projectRoot) {
  const [pkg] = getPackageJsonAndPath(projectRoot);

  if (pkg.dependencies && pkg.dependencies.expokit) {
    return false;
  }

  const xcodeprojFiles = (0, _glob().sync)('ios/**/*.xcodeproj', {
    absolute: true,
    cwd: projectRoot
  });

  if (xcodeprojFiles.length) {
    return true;
  }

  const gradleFiles = (0, _glob().sync)('android/**/*.gradle', {
    absolute: true,
    cwd: projectRoot
  });

  if (gradleFiles.length) {
    return true;
  }

  return false;
}
/**
 * true if the file is .js or .ts
 *
 * @param filePath
 */


function isDynamicFilePath(filePath) {
  return !!filePath.match(/\.[j|t]s$/);
}
/**
 * Return a useful name describing the project config.
 * - dynamic: app.config.js
 * - static: app.json
 * - custom path app config relative to root folder
 * - both: app.config.js or app.json
 */


function getProjectConfigDescription(projectRoot) {
  const paths = getConfigFilePaths(projectRoot);
  return getProjectConfigDescriptionWithPaths(projectRoot, paths);
}
/**
 * Returns a string describing the configurations used for the given project root.
 * Will return null if no config is found.
 *
 * @param projectRoot
 * @param projectConfig
 */


function getProjectConfigDescriptionWithPaths(projectRoot, projectConfig) {
  if (projectConfig.dynamicConfigPath) {
    const relativeDynamicConfigPath = _path().default.relative(projectRoot, projectConfig.dynamicConfigPath);

    if (projectConfig.staticConfigPath) {
      return `${relativeDynamicConfigPath} or ${_path().default.relative(projectRoot, projectConfig.staticConfigPath)}`;
    }

    return relativeDynamicConfigPath;
  } else if (projectConfig.staticConfigPath) {
    return _path().default.relative(projectRoot, projectConfig.staticConfigPath);
  } // If a config doesn't exist, our tooling will generate a static app.json


  return 'app.json';
}
//# sourceMappingURL=Config.js.map
'use strict';

'use strict';

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function isValidRNDependency(config) {
  return Object.keys(config.platforms).filter(key => Boolean(config.platforms[key])).length !== 0;
}

function filterConfig(config) {
  const filtered = { ...config
  };
  Object.keys(filtered.dependencies).forEach(item => {
    if (!isValidRNDependency(filtered.dependencies[item])) {
      delete filtered.dependencies[item];
    }
  });
  return filtered;
}

var _default = {
  name: 'config',
  description: 'Print CLI configuration',
  func: async (_argv, ctx) => {
    console.log(JSON.stringify(filterConfig(ctx), null, 2));
  }
};
exports.default = _default;

//# sourceMappingURL=config.js.map
module.exports = {
  banner: '/**\n' +
          ' * core-js ' + require('../package').version + '\n' +
          ' * https://github.com/zloirock/core-js\n' +
          ' * License: http://rock.mit-license.org\n' +
          ' * © ' + new Date().getFullYear() + ' Denis Pushkarev\n' +
          ' */'
};
'use strict';

'use strict';

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

import { Text, View, StyleSheet } from "react-native";

const MayoristasPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
      
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
export default MayoristasPage;



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



import 'react-native-url-polyfill/auto';
import { useState, useEffect, useContext, useRef } from 'react';
import Auth from './components/auth_supabase/Auth';
import Accounts from './components/auth_supabase/Account';
import { StyleSheet } from 'react-native';
import Loading from './components/loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pantalla from './Pages/Home'
import Ajustes from './Pages/Config';
import { AppContext, AppProvider } from './context/AppContext';
import { LocationProvider  } from './context/LocationContext';
import MayoristasPages from './Pages/Mayoristas'


const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { session, datas } = useContext(AppContext)
  const navigationRef = useRef(null)
  console.log(LocationProvider)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3999);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />
  }

  let screenConfig;

  if (session && session.user ) {
    if (datas) {
      screenConfig = (
        <>
          <Stack.Screen name="Home" component={Pantalla} options={{ headerShown: false }} />
          <Stack.Screen name="Configuracion" component={Ajustes} options={{ headerShown: false }} />
          <Stack.Screen name="Mayoristas" component={MayoristasPages} options={{ headerShown: false }} />
        </>
      );
    } else {
      screenConfig = (
        <>
          <Stack.Screen name="Account" component={Accounts} options={{ headerShown: false }} initialParams={{ session }} />
          <Stack.Screen name="Home" component={Pantalla} options={{ headerShown: false }} />
          <Stack.Screen name="Configuracion" component={Ajustes} options={{ headerShown: false }} />
          <Stack.Screen name="Mayoristas" component={MayoristasPages} options={{ headerShown: false }} />
        </>

      );
    }
  } else {
    screenConfig = (
      <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
    );
  }
  
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {screenConfig}
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
export default () => (
  <AppProvider>
    <LocationProvider>
      <App />
    </LocationProvider>
  </AppProvider>
);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
