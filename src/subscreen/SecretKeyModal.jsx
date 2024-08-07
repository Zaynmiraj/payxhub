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
import {KeyContext} from '../context/KeyContext';

const SecretKeyModal = () => {
  const {
    KeyModal,
    setKeyModal,
    user,
    loading,
    setLoading,
    setStatus,
    secretKey,
    setSecretKey,
    logout,
    theme,
  } = useContext(AuthContext);

  const {key} = useContext(KeyContext);

  useEffect(() => {
    if (key) {
      setSecretKey(key);
    }
  }, []);

  const handleKey = async () => {
    if (secretKey != null) {
      try {
        setStatus('Please wait');
        setLoading(true);
        await fetch(`https://www.payx.org.uk/api/update-secret-key`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            user_id: user.user.id,
            secretKey: secretKey,
            _token: 'sdfsjkdfhskjdfhsd',
          }),
        }).then(res =>
          res.json().then(response => {
            if (response.status_code == 200) {
              setKeyModal(false);
              Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Secret Key Added Please login again',
              });
              logout();
            } else if (response.status_code == 202) {
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: response.message,
              });
            }
          }),
        );
      } catch (error) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: error.message,
        });
      } finally {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Please fill out the Secret key',
      });
    }
  };

  return (
    <View style={[styles.modalBody]}>
      <View style={[styles.modalgroup]}>
        <Text style={styles.modalInputLabel}>
          Add Secret Key <Text style={{color: 'red'}}>*</Text>
        </Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Please enter your secret key"
          placeholderTextColor={'gray'}
          onChangeText={e => setSecretKey(e)}
          value={secretKey ? secretKey : ''}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleKey()}
        style={[
          styles.submitBtn,
          theme && {backgroundColor: theme.theme_background},
        ]}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setKeyModal(false)}
        style={styles.closeBtn}>
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
