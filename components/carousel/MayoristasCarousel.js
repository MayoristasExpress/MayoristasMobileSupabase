import React, { useContext } from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { LocationContext } from '../../context/LocationContext';


const MayoristasCarousel = () => {
 const {datamayoristas , datosLocation} = useContext(LocationContext)


    
    return (
        <Text>
            componente mayoristas
        </Text>
    )
}

export default MayoristasCarousel