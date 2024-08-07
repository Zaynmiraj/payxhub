import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const Slugan = () => {
  const {theme, appSetting} = useContext(AuthContext);
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.block,
          theme && {backgroundColor: theme.theme_background},
        ]}>
        {appSetting && appSetting.logo ? (
          <Image
            source={{
              uri: `https://www.payx.org.uk/public/uploads/${appSetting.logo}`,
            }}
            style={styles.logo}
          />
        ) : (
          <Image
            source={require('../assets/Image/Logo.png')}
            style={styles.logo}
          />
        )}
        <Text style={[styles.title]}>
          {appSetting && appSetting.title
            ? appSetting.title
            : 'Please donate generously'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: -25,
    marginVertical: 10,
  },
  block: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0D7990',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
  },
});

export default Slugan;
