// DropdownMenu.js
import React, {useContext, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {
  Plane,
  Wave,
  Chase,
  Flow,
  CircleFade,
  Wander,
} from 'react-native-animated-spinkit';
import {AuthContext} from '../context/AuthContext';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const ReadersDropdown = ({options, onSelect}) => {
  const {disconnectReader, connectedReader} = useStripeTerminal();
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setLoading] = useState(false);
  const {readerVisile, readersVisible, menuVisible, setMenuVisible} =
    useContext(AuthContext);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleSelect = option => {
    onSelect(option);
  };

  const handleDisconnect = () => {
    try {
      setLoading(true);
      if (connectedReader) {
        disconnectReader()
          .then(() => {
            Toast.show({
              type: ALERT_TYPE.WARNING,
              title: 'Reader Disconnected successfully',
            });
          })
          .catch(error => {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: error.message,
            });
          });
      } else {
        readerVisile(true);
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: error.message,
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  };

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
        toValue: 60, // Set your dropdown height here
        duration: 400,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.drawerItems}>
      <TouchableOpacity style={styles.item} onPress={() => handleDropDown(1)}>
        <Icon name="wifi" size={20} color={'black'} />
        <Text style={styles.itemTitle}>Readers</Text>
      </TouchableOpacity>
      {isOpen ? (
        <Animated.View style={[{height: slideAnim}]}>
          <TouchableOpacity
            style={[styles.dropdown]}
            onPress={() => handleDisconnect()}>
            <Text
              style={[
                styles.dot,
                connectedReader
                  ? {backgroundColor: '#00a2ff'}
                  : {backgroundColor: '#ff9900'},
              ]}></Text>
            <Text style={[styles.dropdownitem]}>
              {connectedReader
                ? 'Disconnect ' + connectedReader.deviceType
                : 'Reconnect Reader'}
            </Text>
            {isloading ? <Chase size={20} color={'#0091ff'} /> : null}
          </TouchableOpacity>
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
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dropdownitem: {
    fontSize: 15,
    color: '#000000ae',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 15,
  },
});

export default ReadersDropdown;
