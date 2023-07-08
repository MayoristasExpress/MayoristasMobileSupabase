import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper';
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
      style={{ width: '90%', marginTop: 30 }}
      secureTextEntry={!showPassword} // Mostrar la contraseña solo si showPassword es true
      theme={theme} // Aplicar el tema personalizado
      right={
        <TextInput.Icon
          name={showPassword ? 'eye-off' : 'eye'}
          onPress={handleTogglePassword}
          forceTextInputFocus={false}
          style={{ marginRight: 10, zIndex: 1 }}
        />
      }
      rightStyle={{ position: 'absolute', right: 0 }}
    />
  );
};

export default PassValue;
