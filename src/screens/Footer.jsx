import {View, Text, StyleSheet, KeyboardAvoidingView, Linking} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Footer = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={styles.brandname}>Powered by</Text>
      <TouchableOpacity onPress={() => Linking.openURL("https://payx.org.uk")}>
        <Text style={styles.brandlink}>PayX Hub</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 15,
  },
  brandname: {
    fontWeight: '400',
    fontSize: 16,
    color: 'black',
    overflow: 'hidden',
  },
  brandlink: {
    color: '#006ace',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Footer;
