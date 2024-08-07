import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {
  Plane,
  Wave,
  Chase,
  Flow,
  CircleFade,
  Wander,
} from 'react-native-animated-spinkit';

const Initializing = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Image
          source={require('../assets/Logo/payx.png')}
          style={styles.logo}
        />
        <CircleFade style={styles.loading} color={'orange'} size={150} />
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
        <Text style={styles.text}>Initialising</Text>
        <Flow color={'black'} size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
});

export default Initializing;
