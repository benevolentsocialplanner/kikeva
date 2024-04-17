import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';


export const InfoScreen = () => {
  return (
    <SafeAreaView style={{marginHorizontal: 12}}>
      <ScrollView>
      <View style={styles.container}>
        <Image source={require('../assets/tuseb.png')} />
        <View style={{display: 'flex', flexDirection: 'row',gap: 5}}>
          <Image source={require('../assets/ktu.png')}/>
          <Image source={require('../assets/anadolu.png')}/>
          <Image source={require('../assets/zonguldak.png')}/>
        </View>
      </View>
      <View style={{padding: 10}}>
            <Text style={styles.head}>
              Kikeva Hakkında:
            </Text>
            <Text style={{color: 'black'}}>
            ENDÜSTRI CALISANLARINDA KÜRESEL IKLIM KRIZi
            iLE KRONIK HASTALIKLAR ILISKISI ÜZERINE BILGi VE
            TUTUMUN DEGISTIRILMESINE YÖNELIK EDUTAINMENT
            VE VIDEO ANALIZ YÖNTEMI ILE INTERAKTIF EGITIM PROGRAMI VE MOBIL UYGULAMA GELISTIRILMESi
            PROJESI (KIKEVA-EP)
            </Text>
            
            <Text style={styles.head}>Proje Yürütücüsü</Text>
            <Text style={{color: 'black'}} onPress={() => Linking.openURL('https://avesis.ktu.edu.tr/mtopbas')}>
              Prof. Dr. Murat Topbaş (KTU Tıp Fakültesi Halk Sağlığı AD)
            </Text>

            <Text style={styles.head}>Araştırmacılar</Text>
            <Text style={{color: 'black'}} onPress={() => Linking.openURL('https://avesis.ktu.edu.tr/nozen')}>
              Ars. Gör. Dr. Nalan Özen
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>

            <Text style={{color: 'black'}} onPress={() => Linking.openURL('https://avesis.ktu.edu.tr/ebeyhun')}>
              Prof. Dr. Nazım Ercüment Beyhun
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>

            <Text style={{color: 'black'}} onPress={() => Linking.openURL('https://avesis.ktu.edu.tr/sevilturhan')}>
              Dr. Öğr. Üyesi Sevil Turhan (KTÜ Tıp Fakültesi Halk Sağlığı Anabilim Dalı)
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>

            <Text style={{color: 'black'}} onPress={() => Linking.openURL('https://avesis.anadolu.edu.tr/enorhon')}>
              Prof. Dr. Erol Nezih Orhon (Anadolu Üniversitesi İletişim Bilimleri Fakültesi Sinema ve Televizyon Bölümü)
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            
        </View> 
        </ScrollView>     
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fb9e50',
  },
  head: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'black'
  }
})