import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';


export const PDFScreen = () => {
  return (
    <View  style={styles.container}>
    <ScrollView>
      <View style={styles.pdfContainer}>
       <WebView source={{uri: 'https://drive.google.com/file/d/1eB8LfjDjSZC7gJGDisnjubQfphcet5rS/view?usp=sharing'}} 
       style={styles.pdf} 
       javaScriptEnabled={true}
       scalesPageToFit={false}
       scrollEnabled={false}
       domStorageEnabled={true}
       />
      </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  pdf: {
    width: 400,
    height: 750,
    marginTop: -50
  },
  pdfContainer: {
    paddingVertical: 30,
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})