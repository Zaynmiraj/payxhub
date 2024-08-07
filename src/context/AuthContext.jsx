import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import axios from 'axios';
import {KeyContext} from './KeyContext';

const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [readersVisible, setReadersVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(75);
  const [status, setStatus] = useState('Please wait');
  const [intent, setIntent] = useState(null);
  const [menuVisible, setMenuVisible] = useState(null);
  const [keyModal, setKeyModal] = useState(false);
  const [secretKey, setSecretKey] = useState(null);
  const [theme, setTheme] = useState(null);
  const [appSetting, setAppSetting] = useState(null);
  const [buttons, setButton] = useState(null);
  const {key, setKey, mode} = useContext(KeyContext);
  const {
    createPaymentIntent,
    retrievePaymentIntent,
    collectPaymentMethod,
    confirmPaymentIntent,
    getOfflineStatus,
    initialize,
    isInitialized,
    connectedReader,
    disconnectReader,
  } = useStripeTerminal();

  useEffect(() => {
    loadUser();
    loadSetting();
    loadButton();
    loadTheme();
  }, []);
  const loadUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const loadTheme = async () => {
    const userTheme = await AsyncStorage.getItem('themes');
    if (userTheme) {
      setTheme(JSON.parse(userTheme));
    }
  };

  const loadSetting = async () => {
    const userSetting = await AsyncStorage.getItem('setting');
    if (userSetting) {
      setAppSetting(JSON.parse(userSetting));
    }
  };
  const loadButton = async () => {
    const userButton = await AsyncStorage.getItem('button');
    if (userButton) {
      setButton(JSON.parse(userButton));
    }
  };

  const setThemeInStorage = async themes => {
    await AsyncStorage.setItem('themes', JSON.stringify(themes));
    setTheme(themes);
  };
  const setUserInStorage = async (useremail, users) => {
    const user = {
      useremail,
      user: users,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const setSettingInStorage = async setting => {
    await AsyncStorage.setItem('setting', JSON.stringify(setting));
    setAppSetting(setting);
  };
  const setButtonInStorage = async buttons => {
    await AsyncStorage.setItem('button', JSON.stringify(buttons));
    setButton(buttons);
  };

  const handleTheme = async () => {
    try {
      await fetch('https://www.payx.org.uk/api/get-theme/' + user.user.id).then(
        res =>
          res.json().then(response => {
            if (response.status_code === 200) {
              setTheme(response.data);
            }
          }),
      );
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    }
  };

  const login = async (useremail, users, key) => {
    // Implement your login logic here.
    const user = {
      useremail,
      user: users,
      key: key,
    }; // Replace with real user data
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('setting');
    await AsyncStorage.removeItem('key');
    await AsyncStorage.removeItem('button');
    await AsyncStorage.removeItem('theme');
    setUser(null);
    setAppSetting(null);
    setButton(null);
    setTheme(null);
    setKey(null);
    if (connectedReader) {
      disconnectReader()
        .then(() => {
          console.log('Disconnect reader');
        })
        .catch(error => {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: error.message,
          });
        });
    }
  };

  const readerVisile = async item => {
    setReadersVisible(item);
  };

  useEffect(() => {
    if (user) {
      getUserAccount();
    }
  }, []);

  const getUserAccount = async () => {
    try {
      fetch('https://www.payx.org.uk/api/get-account/' + user.user.id).then(
        res =>
          res.json().then(response => {
            setSecretKey(response.data.secret_key);
          }),
      );
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const {error, paymentIntent} = await createPaymentIntent({
        amount: String(amount) * 100,
        currency: 'gbp',
        paymentMethodTypes: ['card_present'],
        capture_method: 'manual',
        stripeDescription: 'PayX Payment',
      });
      error
        ? Toast.show({type: ALERT_TYPE.DANGER, title: error.message})
        : handleRetrivePayment(paymentIntent.id);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleRetrivePayment = async client_secret => {
    try {
      setLoading(true);
      const {paymentIntent, error} = await retrievePaymentIntent(client_secret);
      error
        ? Toast.show({type: ALERT_TYPE.DANGER, title: error.message})
        : handleCollectPayment(paymentIntent);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCollectPayment = async paymentIntents => {
    try {
      setLoading(true);
      const {paymentIntent, error} = await collectPaymentMethod({
        paymentIntent: paymentIntents,
      });
      error
        ? Toast.show({type: ALERT_TYPE.DANGER, title: error.message})
        : handlePaymentConfirmation(paymentIntent);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentConfirmation = async paymentIntentId => {
    try {
      setLoading(true);
      const {paymentIntent, error} = await confirmPaymentIntent(
        paymentIntentId,
      );
      error
        ? Toast.show({type: ALERT_TYPE.DANGER, title: error.message})
        : handleCapturePayment(paymentIntent.id);
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCapturePayment = async paymentIntentId => {
    setIntent(paymentIntentId);
    try {
      setLoading(true);
      await fetch(`https://www.payx.org.uk/api/capture-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _token: 'sldkfsjhfsdjkfhsd',
          paymentIntentId: paymentIntentId,
          secretKey: user.key,
        }),
      }).then(res => {
        if (!res) {
          setLoading(true);
        } else {
          if (res.status == 200) {
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Payment Successfully',
            });
          } else if (res.status !== 200) {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Please close the application and reopen',
              button: 'Close',
            });
          }
        }
        setAmount(75);
      });
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        readerVisile,
        readersVisible,
        amount,
        setAmount,
        handlePayment,
        loading,
        setLoading,
        status,
        setStatus,
        intent,
        menuVisible,
        setMenuVisible,
        keyModal,
        setKeyModal,
        secretKey,
        setSecretKey,
        theme,
        setTheme,
        setThemeInStorage,
        handleTheme,
        setUserInStorage,
        setSettingInStorage,
        appSetting,
        setAppSetting,
        setButtonInStorage,
        buttons,
        setButton,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
