import React from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet, ScrollView} from 'react-native';


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
            <Text>
            ENDÜSTRI CALISANLARINDA KÜRESEL IKLIM KRIZi
            iLE KRONIK HASTALIKLAR ILISKISI ÜZERINE BILGi VE
            TUTUMUN DEGISTIRILMESINE YÖNELIK EDUTAINMENT
            VE VIDEO ANALIZ YÖNTEMI ILE INTERAKTIF EGITIM PROGRAMI VE MOBIL UYGULAMA GELISTIRILMESi
            PROJESI (KIKEVA-EP)
            </Text>
            <Text style={styles.head}>Proje Yürütücüsü</Text>
            <Text>
              Prof. Dr. Murat Topbas (KTU Tip Fakültesi Halk Sagligi AD)
            </Text>
            <Text style={styles.head}>Arastirmacilar</Text>
            <Text>
              Ars. Gör. Dr. Nalan Ozen
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            <Text>
              Prof. Dr. Nazim Ercüment Beyhun
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            <Text>
              Dr. Ögr. Üyesi Sevil Turhan (KTÜ Tip Fakültesi Halk Sagligi
              Anabilim Dali)
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            <Text>
              Prof. Dr. Erol Nezih Orhon (Anadolu Üniversitesi iletisim
              Bilimleri Fakultesi Sinema ve Televizyon Bolümü)
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            <Text>
            Prof. Dr. Ahmet Altı
            </Text>
            <View style={{padding: 1, marginVertical :2, backgroundColor: 'black'}}/>
            <Text>
            Yüksek Bilgisayar Müh. Yusuf Özen
            </Text>
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
  }
})