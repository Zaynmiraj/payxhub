import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';

import {AuthContext} from '../context/AuthContext';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const Buttons = () => {
  const {connectedReader, isInitialized, initialize} = useStripeTerminal();
  const {
    amount,
    setAmount,
    handlePayment,
    loading,
    setLoading,
    user,
    setStatus,
    readerVisile,
    theme,
    handleTheme,
    appSetting,
    buttons,
  } = useContext(AuthContext);
  const navigation = useNavigation();

  const HandleDonate = () => {
    if (!amount) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Please add amount',
      });
    }
    if (!connectedReader && amount) {
      readerVisile(true);
    } else if (isInitialized && amount) {
      handlePayment();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.displayView]}>
        <Text style={[styles.title]}>Amount</Text>
        <TextInput
          value={amount.toString()}
          style={[styles.input]}
          keyboardType="numeric"
          placeholderTextColor={'gray'}
          placeholder="Amount"
          onChangeText={e => setAmount(e)}
        />
      </View>
      <View style={styles.buttons}>
        {/* <View style={[styles.buttonBlock]}> */}
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn1 : 5)}
            style={[
              styles.btn,
              amount == 5 || (buttons && amount == buttons.btn1)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 5 || (buttons && amount == buttons.btn1)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn1 : 5}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn2 : 10)}
            style={[
              styles.btn,
              amount == 10 || (buttons && amount == buttons.btn2)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 10 || (buttons && amount == buttons.btn2)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn2 : 10}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn3 : 20)}
            style={[
              styles.btn,
              amount == 20 || (buttons && amount == buttons.btn3)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 20 || (buttons && amount == buttons.btn3)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn3 : 20}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn4 : 50)}
            style={[
              styles.btn,
              amount == 50 || (buttons && amount == buttons.btn4)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 50 || (buttons && amount == buttons.btn4)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn4 : 50}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn5 : 75)}
            style={[
              styles.btn,
              amount == 75 || (buttons && amount == buttons.btn5)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 75 || (buttons && amount == buttons.btn5)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn5 : 75}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn6 : 100)}
            style={[
              styles.btn,
              amount == 100 || (buttons && amount == buttons.btn6)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 100 || (buttons && amount == buttons.btn6)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn6 : 100}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn7 : 200)}
            style={[
              styles.btn,
              amount == 200 || (buttons && amount == buttons.btn7)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 200 || (buttons && amount == buttons.btn7)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn7 : 200}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount(buttons ? buttons.btn8 : 500)}
            style={[
              styles.btn,
              amount == 500 || (buttons && amount == buttons.btn8)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == 500 || (buttons && buttons.btn8 == amount)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn8 : 500}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnblk}>
          <TouchableOpacity
            onPress={() => setAmount('')}
            style={[
              styles.btn,
              amount == '' || (buttons && amount == buttons.btn9)
                ? theme && {backgroundColor: theme.theme_background}
                : null,
            ]}>
            <Text
              style={[
                styles.btnText,
                amount == '' || (buttons && amount == buttons.btn9)
                  ? styles.selectedText
                  : null,
              ]}>
              {buttons ? buttons.btn9 : 'Other'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => HandleDonate()}
        style={[
          styles.submitbtn,
          theme
            ? {backgroundColor: theme.theme_background}
            : {backgroundColor: 'black'},
        ]}>
        <Text style={[styles.buttontext]}>
          {appSetting && appSetting.donate_button_text
            ? appSetting.donate_button_text
            : 'Donate'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginBottom: 10,
  },
  displayView: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  title: {
    width: '100%',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#5a5a5a',
  },
  input: {
    color: 'black',
    width: '100%',
    fontSize: 18,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#868686aa',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonBlock: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  btnblk: {
    width: '30%',
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
  },
  btn: {
    width: 'auto',
    paddingVertical: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#868686aa',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  btnText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
  submitbtn: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selected: {
    backgroundColor: '#0D7990',
  },
  selectedText: {
    color: 'white',
  },
});

export default Buttons;
