import React, { useContext, useState } from 'react';
import { TextInput, View, DefaultTheme } from 'react-native-paper';
import { Micontexto } from '../../context/context';


const PassValue = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { inputPass,setInputPass} = useContext(Micontexto);

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
        style={{ width: '90%' , marginTop: 30}}
        secureTextEntry={true}
        theme={theme} // Aplicar el tema personalizado
      />
     
  );
};

export default PassValue