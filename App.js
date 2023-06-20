import 'react-native-url-polyfill/auto';
import { useState, useEffect, useContext, useRef } from 'react';
import Auth from './components/auth_supabase/Auth';
import Accounts from './components/auth_supabase/Account';
import { StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';
import { AppContext, Micontexto } from './context/context';
import Loading from './components/loading/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Pantalla from './Pages/Home'
import Ajustes from './Pages/Config';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { session, datas } = useContext(Micontexto)
  const navigationRef = useRef(null)

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

  if (session && session.user) {
    if (datas) {
      screenConfig = (
        <>
          <Stack.Screen name="Home" component={Pantalla} options={{ headerShown: false }} />
          <Stack.Screen name="Configuracion" component={Ajustes} options={{ headerShown: false }} />

        </>
      );
    } else {
      screenConfig = (
        <>
          <Stack.Screen name="Account" component={Accounts} options={{ headerShown: false }} initialParams={{ session }} />
          <Stack.Screen name="Home" component={Pantalla} options={{ headerShown: false }} />
          <Stack.Screen name="Configuracion" component={Ajustes} options={{ headerShown: false }} />

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
  <AppContext>
    <App />
  </AppContext>
);