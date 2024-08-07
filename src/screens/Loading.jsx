import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React, {useContext} from 'react';
import {
  Plane,
  Wave,
  Chase,
  Flow,
  CircleFade,
  Wander,
} from 'react-native-animated-spinkit';
import {AuthContext} from '../context/AuthContext';

const Loading = () => {
  const {status, theme} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Image
          source={require('../assets/Logo/payx.png')}
          style={styles.logo}
        />
        <CircleFade
          style={styles.loading}
          color={theme ? theme.theme_background : '#0D7990'}
          size={150}
        />
      </View>
      <View
        style={{
          display: 'flex',
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 20,
        }}>
        <Text style={styles.text}>{status || 'Please wait'}</Text>
        <Flow color={'black'} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 1,
    position: 'absolute',
  },
  block: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 110,
    height: 110,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
