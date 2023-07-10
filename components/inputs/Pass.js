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
