import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KeyContext = createContext();
const KeyProvider = ({children}) => {
  const [key, setKey] = useState(null);
  const [mode, setMode] = useState(null);

  useEffect(() => {
    loadUser();
    loadMode();
  }, []);

  const loadUser = async () => {
    const userData = await AsyncStorage.getItem('key');
    if (userData) {
      setKey(JSON.parse(userData));
    }
  };

  const loadMode = async () => {
    const readerMode = await AsyncStorage.getItem('mode');
    if (readerMode) {
      setMode(JSON.parse(readerMode));
    }
  };

  const SetKeyLoad = async key => {
    const keys = key;
    await AsyncStorage.setItem('key', JSON.stringify(keys));
    setKey(keys);
  };

  const SetReaderMode = async mode => {
    const modes = mode;
    await AsyncStorage.setItem('mode', JSON.stringify(mode));
    setMode(modes);
  };

  return (
    <KeyContext.Provider
      value={{key, SetKeyLoad, setKey, SetReaderMode, mode, setMode}}>
      {children}
    </KeyContext.Provider>
  );
};

export {KeyProvider, KeyContext};
