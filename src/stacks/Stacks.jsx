import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Drawers from './Drawers';
import Login from '../component/Login';
import Signup from '../component/Signup';
import {AuthContext} from '../context/AuthContext';
import PaymentCaptureScreen from '../screens/PaymentCaptureScreen';
import AmountButtons from '../subscreen/AmountButtons';
import ThemeSetting from '../subscreen/ThemeSetting';
import Settings from '../subscreen/Settings';
import AcountSetting from '../subscreen/AcountSetting';
import TransactionHistory from '../screens/TransactionHistory';
import TermWebView from '../subscreen/TermWebView';
import PrivacyView from '../subscreen/PrivacyView';
import HowToView from '../subscreen/HowToView';

const Stack = createNativeStackNavigator();
const Stacks = () => {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          fullScreenGestureEnabled: true,
        }}>
        {user && user.useremail ? (
          <>
            <Stack.Screen
              name="drawer"
              component={Drawers}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="payment"
              component={PaymentCaptureScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="amountbutton"
              component={AmountButtons}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="setting"
              component={Settings}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="theme"
              component={ThemeSetting}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="useraccount"
              component={AcountSetting}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="transactionhistory"
              component={TransactionHistory}
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'Transaction History',
              }}
            />
            <Stack.Screen
              name="termview"
              component={TermWebView}
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'Terms and Conditions',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="privacyview"
              component={PrivacyView}
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'PayX Privacy',
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="howto"
              component={HowToView}
              options={{
                headerBackTitle: 'Home',
                headerTitle: 'How to use',
                headerTitleAlign: 'center',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
