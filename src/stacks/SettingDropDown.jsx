// DropdownMenu.js
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {Chase} from 'react-native-animated-spinkit';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const SettingDropDown = ({options, onSelect}) => {
  const [acccounts, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {
    menuVisible,
    setMenuVisible,
    user,
    setTheme,
    setThemeInStorage,
    theme,
  } = useContext(AuthContext);

  const handleDropDown = () => {
    if (isOpen) {
      // Hide the dropdown
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false, // Cannot use native driver with height
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      // Show the dropdown
      Animated.timing(slideAnim, {
        toValue: 260, // Set your dropdown height here
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleHowTo = () => {};

  const handleButton = async () => {
    setId('button');
    try {
      setLoading(true);
      await fetch(
        'https://www.payx.org.uk/api/get-amount-button/' + user.user.id,
      ).then(res =>
        res.json().then(response => {
          if (response.status_code === 200) {
            navigation.navigate('amountbutton', {buttons: response.data});
            setIsOpen(!isOpen);
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
  };
  const handleSetting = async () => {
    setId('setting');
    try {
      setLoading(true);
      await fetch(
        'https://www.payx.org.uk/api/get-setting/' + user.user.id,
      ).then(res =>
        res.json().then(response => {
          if (response.status_code === 200) {
            navigation.navigate('setting', {setting: response.data});
            setIsOpen(!isOpen);
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
  };
  const handleTheme = async () => {
    setId('theme');
    try {
      setLoading(true);
      await fetch('https://www.payx.org.uk/api/get-theme/' + user.user.id).then(
        res =>
          res.json().then(response => {
            if (response.status_code === 200) {
              setThemeInStorage(response.data);
              navigation.navigate('theme', {themes: response.data});
              setIsOpen(false);
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
  };

  const handleAccount = async () => {
    setId('account');
    try {
      setLoading(true);
      await fetch('https://www.payx.org.uk/api/get-user/' + user.user.id).then(
        res =>
          res.json().then(response => {
            if (response.status_code == 200) {
              navigation.navigate('useraccount', {users: response.data});
              setIsOpen(!isOpen);
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
  };

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity style={styles.item} onPress={() => handleDropDown()}>
        <Icon name="setting" size={20} color={'black'} />
        <Text style={styles.itemTitle}>Settings</Text>
      </TouchableOpacity>

      <Animated.View style={[{height: slideAnim}]}>
        <View style={[{marginLeft: 15}]}>
          <TouchableOpacity
            onPress={() => handleAccount()}
            style={[styles.dropdown]}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>Account Setting</Text>
            {isloading && id == 'account' && <Chase size={20} color="black" />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dropdown]}
            onPress={() => handleSetting()}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>App Settings</Text>
            {isloading && id == 'setting' && (
              <Chase size={20} color={'black'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleButton()}
            style={[styles.dropdown]}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>Button Setting</Text>
            {isloading && id == 'button' && <Chase size={20} color="black" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dropdown]}
            onPress={() => handleTheme()}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>Theme Setting</Text>
            {isloading && id == 'theme' && <Chase size={20} color={'black'} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('privacyview');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={[styles.dropdown]}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('termview');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={[styles.dropdown]}>
            <Text style={styles.dot}></Text>
            <Text style={[styles.dropdownitem]}>Term & Conditions</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItems: {
    marginVertical: 0,
    width: '95%',
    backgroundColor: 'white',
    zIndex: -10,
  },
  item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    borderBottomColor: '#eeea',
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  dropdown: {
    margin: 5,
    padding: 7,
    backgroundColor: 'white',
    borderBottomColor: '#eeea',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  dropdownitem: {
    fontSize: 15,
    color: 'black',
  },
  dot: {
    backgroundColor: '#00627d',
    width: 7,
    height: 7,
    borderRadius: 15,
  },
});

export default SettingDropDown;
