import {View, Text} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

const WebViews = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{uri: 'https://www.payx.org.uk/addaccount'}}
      />
    </View>
  );
};

export default WebViews;
