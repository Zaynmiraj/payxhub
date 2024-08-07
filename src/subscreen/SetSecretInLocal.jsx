import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import {AuthContext} from '../context/AuthContext';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecretKeyModal = ({setKeys, setModal}) => {
  const [key, setKey] = useState(null);

  const handleKey = async () => {
    if (key) {
      try {
        await AsyncStorage.setItem('key', JSON.stringify(key));
        setModal(false);
        setKeys(key);
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Secret key set successfully',
        });
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: error.message,
        });
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Please add secret key',
      });
    }
  };

  return (
    <View style={[styles.modalBody]}>
      <View style={[styles.modalgroup]}>
        <Text style={styles.modalInputLabel}>
          Add Your Stripe Secret Key <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Please enter your secret key"
          placeholderTextColor={'gray'}
          value={key ? key : ''}
          onChangeText={e => setKey(e)}
        />
      </View>
      <TouchableOpacity onPress={() => handleKey()} style={styles.submitBtn}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeBtn}>
        <Icon name="xmark" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBody: {
    width: 300,
    paddingVertical: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalgroup: {
    width: '95%',
  },
  modalInputLabel: {
    color: '#3f3f3f',
    fontWeight: '600',
  },
  modalInput: {
    color: 'black',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b4b4b4',
    marginVertical: 5,
  },
  submitBtn: {
    backgroundColor: '#0099ff',
    width: '50%',
    padding: 13,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: '#eeea',
    borderRadius: 100,
  },
  closeIcon: {
    color: 'black',
    fontSize: 17,
  },
});

export default SecretKeyModal;
