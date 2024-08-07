import React, {useContext, useEffect, useState} from 'react';
import Stacks from './src/stacks/Stacks';
import {
  requestNeededAndroidPermissions,
  StripeTerminalProvider,
} from '@stripe/stripe-terminal-react-native';
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
  Toast,
} from 'react-native-alert-notification';
import {Platform} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import {KeyContext} from './src/context/KeyContext';
const App = () => {
  const {key} = useContext(KeyContext);
  useEffect(() => {
    grantLocation();
  }, []);

  const grantLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await requestNeededAndroidPermissions({
          accessFineLocation: {
            title: 'Location Permission',
            message: 'Stripe Terminal needs access to your location',
            buttonPositive: 'Accept',
          },
        });
        if (granted) {
          // Initialize the SDK
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title:
              'Location and BT services are required in order to connect to a reader.',
            button: 'Cloes',
          });
        }
      } catch (e) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: e.message,
        });
      }
    }
  };

  const fetchTokenProvider = async () => {
    try {
      const response = await fetch(
        `https://payx.org.uk/api/create-connection-token`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _token: 'sjfhkjdfhsdfj',
            secret_key: key,
          }),
        },
      );

      if (!response.ok) {
        console.log(response);
      }

      const {secret} = await response.json();
      return secret;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <AuthProvider>
        <AlertNotificationRoot>
          <Stacks />
        </AlertNotificationRoot>
      </AuthProvider>
    </StripeTerminalProvider>
  );
};

export default App;
