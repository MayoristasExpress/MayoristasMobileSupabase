import React, { createContext, useState, useEffect, useContext } from 'react';
import { downloadAvatar, supabase } from '../lib/supabase';


const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [inputAdress, setInputAdress] = useState('');
  const [inputFullName, setInputFullName] = useState('');
  const [inputUserName, setInputUserName] = useState('');
  const [datas, setDatas] = useState('');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [datosUser, setDatosUser] = useState('');

  
  useEffect(() => {
    const fetchSession = async () => {
      const { data: session } = await supabase.auth.getSession();
      setSession(session);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchSession();
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('¡No hay usuario en la sesión!');
      }

      const { data, error, status } = await supabase
        .from('users')
        .select('username,full_name,avatar_url,adress')
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDatas(data.full_name);
        setDatosUser(data);
        setInputFullName(data.full_name);
        setInputAdress(data.adress);
        downloadAvatar(data.avatar_url).then(setAvatarUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ full_name, adress }) {
    try {
      setLoading(true);
      if (!session?.user) {
        throw new Error('¡No hay usuario en la sesión!');
      }

      let updatedAvatarUrl = '';
      if (avatarUrl) {
        const fileExt = avatarUrl.split('.').pop();
        const fileName = avatarUrl.replace(/^.*[\\\/]/, '');
        const filePath = `${Date.now()}.${fileExt}`;

        const formData = new FormData();
        const photo = {
          uri: avatarUrl,
          name: fileName,
          type: `image/${fileExt}`,
        };
        formData.append('file', photo);

        await supabase.storage.from('avatars').upload(filePath, formData);
        console.log('Imagen cargada correctamente');

        updatedAvatarUrl = filePath;
      }

      const updates = {
        adress,
        full_name,
        avatar_url: updatedAvatarUrl,
        updated_at: new Date(),
      };

      console.log('Actualizaciones:', updates);

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', session?.user.id);

      if (error) {
        throw error;
      }

      console.log('Perfil actualizado correctamente');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        inputEmail,
        setInputEmail,
        inputPass,
        setInputPass,
        inputAdress,
        setInputAdress,
        inputFullName,
        setInputFullName,
        inputUserName,
        setInputUserName,
        setAvatarUrl,
        avatarUrl,
        session,
        loading,
        updateProfile,
        setSession,
        getProfile,
        datas,
        datosUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
