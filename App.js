import React, { useEffect, useState } from 'react';
import { Stack1 } from './src/screen/Navigation.jsx';
import { Stack2 } from './src/screen/Navigation.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/components/Loader.jsx';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken === 'user_authenticated') {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Error reading user authentication state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
   
  }, []);

  if (loading) {
    return <Loader/>; 
    
  }

  
 
  return loggedIn ? <Stack2 /> : <Stack1 /> ;


  
 
  
};

export default App;
