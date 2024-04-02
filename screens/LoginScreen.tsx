import React from 'react'
import {ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Config from "react-native-config";
import {APIROUTES} from '../constants/apiRoutes';
import axios from 'axios';
import {AppContext} from '../App';
import { Storage } from '../utils/storage';

export const LoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const {setUser, setTokenType} = React.useContext(AppContext);

  const onPress = async () => {

    setIsLoading(true)
    if(!password && !username) {
      setError('Kullanıcı adı veya şifre boş olamaz');
      return;
    }
    var bodyFormData = new FormData();
    
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    axios({
      method: "post",
      url: APIROUTES.login,
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => {
      setTokenType(res.data?.token_type)
      setUser(res.data?.access_token)
      console.log(res.data, `data`)
    setIsLoading(false)
    })
    .catch((err)=>{
      console.log('Error logging in', err.message)
    setIsLoading(false)
    })

  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={{color: "black"}}>
          LOGO
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Kullanıcı adı..."
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
          autoCapitalize="none"

        />
        <TextInput
          placeholder="Şifre..."
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCapitalize="none"

          secureTextEntry={true}
        />
        {error && <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>}
        {!isLoading ? 
        <TouchableOpacity onPress={onPress} style={styles.button} >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        : 
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Text stlye={{color: "black", fontSize: 16}}>Loading...</Text></View>}
      </View>
    <Text style={styles.infoText}>
      ENDÜSTRİ ÇALIŞANLARINDA KÜRESEL İKLİM KRİZİ İLE KRONİK HASTALIKLAR İLİŞKİSİ ÜZERİNE BİLGİ VE TUTUMUN DEĞİŞTİRİLMESİNE YÖNELİK EDUTAINMENT VE VİDEO ANALİZ YÖNTEMİ İLE İNTERAKTİF EĞİTİM PROGRAMI VE MOBİL UYGULAMA GELİŞTİRİLMESİ PROJESİ 
    </Text>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 50,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    height: 200,
    margin: 'auto',
  },
  formContainer: {
    marginTop: 60,
  },
  infoText: {
    fontSize: 10,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: '65%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderColor: 'lightgray',
    padding: 10,
    color: 'black'
  },
});