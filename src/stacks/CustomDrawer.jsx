import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import DropdownMenu from './Dropdown';
import {AuthContext} from '../context/AuthContext';
import SettingDropDown from './SettingDropDown';
import ReadersDropdown from './ReadersDropdown';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {
  Plane,
  Wave,
  Chase,
  Flow,
  CircleFade,
  Wander,
} from 'react-native-animated-spinkit';
import {KeyContext} from '../context/KeyContext';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';

const CustomDrawer = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {logout, user} = useContext(AuthContext);
  const {key, mode, setMode, SetReaderMode} = useContext(KeyContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const {connectedReader, disconnectReader} = useStripeTerminal();

  const toggleSwitch = () => {
    setMode(isEnabled);
    SetReaderMode(prevState => !prevState);
    setIsEnabled(prevState => !prevState);
    if (connectedReader) {
      disconnectReader().then(() => {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Reader Disconnected Please Reconnect',
        });
      });
    }
  };

  const handleTransaction = async () => {
    try {
      setLoading(true);
      await fetch(
        'https://www.payx.org.uk/api/get-transaction-history/' + key,
      ).then(res =>
        res.json().then(response => {
          if (response.status_code === 200) {
            navigation.navigate('transactionhistory', {
              transactions: response.data,
            });
            navigation.dispatch(DrawerActions.closeDrawer());
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

  const handleLogOut = async () => {
    logout();
  };
  return (
    <View style={[styles.container]}>
      <SafeAreaView
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
        <View style={[styles.logos]}>
          {user.user && user.user.profile_photo_path ? (
            <Image
              source={{
                uri: `https://www.payx.org.uk/public/user-profile/${user.user.profile_photo_path}`,
              }}
              style={styles.logo}
            />
          ) : (
            <Image
              source={require('../assets/Logo/payx.png')}
              style={styles.logo}
            />
          )}
        </View>
        <Text style={styles.logoTitle}>
          {user.user && user.user.name ? user.user.name : 'No Name'}
        </Text>
        <Text style={styles.logoTitles}>
          {user.user && user.user.email
            ? user.user.email
            : 'Need refresh the app'}
        </Text>
      </SafeAreaView>
      <ScrollView
        style={{width: '90%', paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.drawerItems]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={[styles.item]}>
            <Icon name="home" size={20} color={'black'} />
            <Text style={styles.itemTitle}>Home</Text>
          </TouchableOpacity>
          <ReadersDropdown />
          <DropdownMenu />
          <TouchableOpacity
            onPress={() => handleTransaction()}
            style={[styles.item]}>
            <Icon name="history" size={20} color={'black'} />
            <Text style={styles.itemTitle}>Transactions</Text>
            {loading ? <Chase size={20} color={'black'} /> : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('howto');
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
            style={[styles.item]}>
            <Icon name="info" size={20} color={'black'} />
            <Text style={styles.itemTitle}>How To Use</Text>
          </TouchableOpacity>
          <SettingDropDown />
          <TouchableOpacity style={[styles.item]}>
            <Icon name="indent" size={20} color={'black'} />
            <Text style={styles.itemTitle}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogOut()}
            style={[styles.item]}>
            <Icon name="arrow-left" size={20} color={'black'} />
            <Text style={styles.itemTitle}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.item]}>
            <Icon name="mobile" size={25} color={'black'} />
            <Text style={styles.itemTitle}> Version : 2.0.0</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.toggleButton}>
        <Text style={{color: 'black', fontWeight: '600', fontSize: 16}}>
          Live Mode
        </Text>
        <Switch
          trackColor={{false: '#e6e6e6', true: '#008fe8'}}
          thumbColor={isEnabled ? '#f4f4f4' : 'white'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={mode}
          shouldRasterizeIOS={true}
          style={styles.toggleButtons}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  toggleButtons: {},
  logos: {
    width: 90,
    height: 90,
  },
  logo: {
    width: 80,
    height: 80,
    padding: 5,
    borderRadius: 100,
  },
  logoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  logoTitles: {
    fontWeight: '600',
    fontSize: 14,
    color: 'gray',
  },
  drawerItems: {
    marginVertical: 10,
    width: '100%',
    paddingBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  item: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 3,
    borderBottomColor: '#eeea',
    borderBottomWidth: 2,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  itemTitle: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },

  androidShadow: {
    elevation: 3,
  },
  iosShadow: {
    shadowColor: '#eeea',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

export default CustomDrawer;
