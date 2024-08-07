import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../component/Home';
import CustomDrawer from './CustomDrawer';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';

const Drawer = createDrawerNavigator();

const Drawers = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get('window').width / 1.8,
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: props => <HeaderStyle {...props} />,
          headerRight: () => {
            return (
              <TouchableOpacity>
                <Icon name="bell" style={styles.notify} />
              </TouchableOpacity>
            );
          },
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  notify: {
    marginHorizontal: 10,
    color: '#0D7990',
    fontSize: 20,
  },
});

export default Drawers;

const HeaderStyle = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
      }}>
      <Image
        style={{width: 30, height: 25}}
        source={require('../assets/Logo/payx.png')}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '700',
          color: '#0D7990',
          textAlign: 'center',
        }}>
        PayX Hub
      </Text>
    </View>
  );
};
