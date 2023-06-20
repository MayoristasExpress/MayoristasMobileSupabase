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
