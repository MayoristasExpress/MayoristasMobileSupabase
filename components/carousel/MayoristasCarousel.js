import React, { useContext } from 'react'
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { Micontexto } from '../../context/context';


const MayoristasCarousel = () => {
 const {datamayoristas , datosLocation} = useContext(Micontexto)


    
    return (
        <Text>
            componente mayoristas
        </Text>
    )
}

export default MayoristasCarousel