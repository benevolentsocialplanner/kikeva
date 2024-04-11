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
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={{color: "black", fontWeight: '700', fontSize: 26}}>
          KIKEVA
        </Text>
        <Text style={{color: "black", fontWeight: '400', fontSize: 14, marginTop: 12}}>
          Hoşgeldiniz
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

        <>
        <TouchableOpacity style={styles.forgotWrapper}>
          <Text style={styles.forgot}>Forgot?</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={onPress} style={styles.button} >
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}> Kayıt ol </Text>
          </TouchableOpacity>
        </>
        : 
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}><Text style={{color: "black", fontSize: 16, marginTop: 20}}>Loading...</Text></View>}
      </View>
    <Text style={styles.infoText}>
      ENDÜSTRİ ÇALIŞANLARINDA KÜRESEL İKLİM KRİZİ İLE KRONİK HASTALIKLAR İLİŞKİSİ ÜZERİNE BİLGİ VE TUTUMUN DEĞİŞTİRİLMESİNE YÖNELİK EDUTAINMENT VE VİDEO ANALİZ YÖNTEMİ İLE İNTERAKTİF EĞİTİM PROGRAMI VE MOBİL UYGULAMA GELİŞTİRİLMESİ PROJESİ 
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fb9e50',
    borderRadius: 10,
    height: 240,
    margin: 'auto',
  },
  formContainer: {
    marginTop: 60,
    borderWidth: 2,
    borderColor: 'lightgray',
    marginHorizontal: 20,
    justifyContent: "center",
    display: "flex",
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5
  },
  infoText: {
    fontSize: 10,
    padding: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fb9e50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  input: {
    height: 50,
    marginTop: 12,
    borderWidth: 2,
    borderColor: 'lightgray',
    padding: 16,
    borderRadius: 5,
    color: 'black',
    width: '100%',
  },
  registerButton: {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  registerText: {
    color: '#fb9e50',
    fontWeight: '800'
  },
  forgotWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgot: {
    color: '#fb9e50',
  }
});