import React, { useContext, useState } from 'react';
import { TextInput, DefaultTheme } from 'react-native-paper';
import { Micontexto } from '../../context/context';

const UserName = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { inputUserName, setInputUserName } = useContext(Micontexto)
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
