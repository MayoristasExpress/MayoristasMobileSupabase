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
