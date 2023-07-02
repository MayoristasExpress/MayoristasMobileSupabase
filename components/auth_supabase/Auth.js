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