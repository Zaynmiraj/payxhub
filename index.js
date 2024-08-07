/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {AppRegistry} from 'react-native';

import App from './App'; // Import your App component
import {name as appName} from './app.json';
import {KeyProvider} from './src/context/KeyContext';

const Root = () => {
  return (
    <KeyProvider>
      <App />
    </KeyProvider>
  );
};

// Register the Root component as the root component of your app
AppRegistry.registerComponent(appName, () => Root);
