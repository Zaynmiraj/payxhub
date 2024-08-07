import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useContext, useState} from 'react';
import {WebView} from 'react-native-webview';
import {AuthContext} from '../context/AuthContext';
import Loading from '../screens/Loading';

const TermWebView = () => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <WebView
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{flex: 1}}
        source={{uri: 'https://www.payx.org.uk/term-conditions'}}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'relative',
  },
  loadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default TermWebView;
