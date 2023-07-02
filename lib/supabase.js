import { NativeModules } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const { URLPolyfill } = NativeModules;

if (URLPolyfill) {
  URLPolyfill.polyfill();
}

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://gvtqrhqslwauidfkmmyf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2dHFyaHFzbHdhdWlkZmttbXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMjM3NzksImV4cCI6MjAwMTg5OTc3OX0.lOBiQI9A5asZZ31vTqji_AqgPD73lRlMyGS069Vekmc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const downloadAvatar = async (path) => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path);
    if (error) throw error;
    const fr = new FileReader();
    fr.readAsDataURL(data);
    return new Promise((resolve) => {
      fr.onload = () => {
        resolve(fr.result);
      };
    });
  } catch (err) {
    console.log('error ', err);
    return '';
  }
};
