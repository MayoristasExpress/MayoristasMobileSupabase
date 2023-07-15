import React, { createContext, useState, useEffect } from 'react';
import * as Location from "expo-location";
import { supabase } from '../lib/supabase';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [dataMayoristas, setDataMayoristas] = useState([])
  const [location, setLocation] = useState(null);
  const [datosLocation, setDatosLocation] = useState([])
  console.log(location)
  const getUsersWithRolesAndDistributors = async () => {
    try {
      const { data } = await supabase
        .from('users')
        .select(`
         full_name,
         avatar_url,
         distributors(*)
        `)
      if (data) {
        const filteredData = data.filter((user) => user.distributors !== null);
        setDataMayoristas(filteredData);
        return data;
      } else {
        console.log("Data is null");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  useEffect(() => {
    getUsersWithRolesAndDistributors();
  }, []);

  /* ESTA FUNCION ES PARA TRAERNOS LA UBICACION DEL CLIENTE */
  
  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      if (dataMayoristas && location) {
        const latitud = location.coords.latitude;
        const longitud = location.coords.longitude;
        const distances = dataMayoristas.map(local => {
          const id = local.distributors.user_id;
          const localLatitud = local.distributors.latitude;
          const localLongitud = local.distributors.longitude;
          const distance = calculateDistance(latitud, longitud, localLatitud, localLongitud);
          return { id, distance };
        });

        const sortedLocations = distances.sort((a, b) => a.distance - b.distance);
        const nearest = sortedLocations.slice(0, 5);

        setDatosLocation(nearest);
      }

    };
    getLocationAsync();
  }, [dataMayoristas]);


  //funcion para calcular el radio de la tierra y comparar la distancia entre el punto A y B

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  return (
    <LocationContext.Provider value={{
      dataMayoristas,
      calculateDistance,
      location,
      datosLocation}}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
