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
import {
  Plane,
  Wave,
  Chase,
  Flow,
  CircleFade,
  Wander,
} from 'react-native-animated-spinkit';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const DropdownMenu = ({options, onSelect}) => {
  const [acccounts, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const {menuVisible, setMenuVisible, KeyModal, setKeyModal} =
    useContext(AuthContext);

  // const handleSelect = async item => {
  //   try {
  //     setLoading(true);
  //     await fetch(`https://payx.org.uk/api/connect-account/${item.id}`).then(
  //       res =>
  //         res.json().then(response => {
  //           if (response.status_code === 200) {
  //             Toast.show({
  //               type: ALERT_TYPE.SUCCESS,
  //               title: 'Your Account Activete successfully',
  //             });
  //             setIsOpen(false);
  //           } else if (response.status_code === 201) {
  //             Toast.show({
  //               type: ALERT_TYPE.SUCCESS,
  //               title: 'Your Account already Activete',
  //             });
  //             setIsOpen(false);
  //           } else {
  //             Toast.show({
  //               type: ALERT_TYPE.WARNING,
  //               title: 'Your Account connected Failed',
  //             });
  //             setIsOpen(false);
  //           }
  //         }),
  //     );
  //   } catch (error) {
  //     Toast.show({
  //       type: ALERT_TYPE.DANGER,
  //       title: error.message,
  //     });
  //   } finally {
  //     setLoading(false);
  //     setIsOpen(false);
  //     navigation.dispatch(DrawerActions.closeDrawer());
  //   }
  // };

  // useEffect(() => {
  //   getAccounts();
  // }, []);

  // const getAccounts = async () => {
  //   try {
  //     await fetch(`https://payx.org.uk/api/connected-accounts/2`).then(res =>
  //       res.json().then(response => {
  //         setAccount(response.data);
  //       }),
  //     );
  //   } catch (error) {
  //     Toast.show({
  //       type: ALERT_TYPE.DANGER,
  //       title: error.message,
  //     });
  //   }
  // };

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
        toValue: 90, // Set your dropdown height here
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleHowTo = () => {
    navigation.navigate('howto');
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleSecretKey = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    setKeyModal(true);
    setIsOpen(false);
  };

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity style={styles.item} onPress={() => handleDropDown(2)}>
        <Icon name="key" size={20} color={'black'} />
        <Text style={styles.itemTitle}>Secret Key</Text>
      </TouchableOpacity>
      {isOpen ? (
        <Animated.View style={[{height: slideAnim}]}>
          <View style={{marginLeft: 15}}>
            <TouchableOpacity
              onPress={() => handleHowTo()}
              style={[styles.dropdown]}>
              <Text style={styles.dot}></Text>
              <Text style={[styles.dropdownitem]}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.dropdown]}
              onPress={() => handleSecretKey()}>
              <Text style={styles.dot}></Text>
              <Text style={[styles.dropdownitem]}>Add Secret Key</Text>
              {isloading ? <Chase size={20} color={'black'} /> : null}
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItems: {
    marginVertical: 0,
    width: '95%',
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
    alignItems: 'center',
    flexDirection: 'row',
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

export default DropdownMenu;

const ModalContent = () => {
  return (
    <View>
      <Text>Body</Text>
    </View>
  );
};
