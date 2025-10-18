import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

const WebViewScreen = () => {
  const [showWebView, setShowWebView] = useState(true);

  const handleCancel = () => {
    setShowWebView(false);
  };

  return (
    <WebView
      source={{uri: 'https://www.google.com'}}
      javaScriptEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    width: '100%',
    height: '100%',
  },
});

export default WebViewScreen;
