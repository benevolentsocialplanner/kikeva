import React from 'react'
import {StyleSheet, Text, View} from 'react-native';
import YouTube from 'react-native-youtube';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback} from 'react-native';

export const VideoDetailScreen = ({route}) => {
  const {video} = route.params;
  const [value, setValue] = React.useState("")
  const [items, setItems] = React.useState([
    { label: 'İnsanların doğaya karşı duyarsız davranması', value: 'İnsanların doğaya karşı duyarsız davranması' },
    { label: 'Egzoz gazları', value: 'Egzoz gazları' },
    { label: 'Kentleşme', value: 'Kentleşme' },
    { label: 'Yeşil alanların yok edilmesi', value: 'Yeşil alanların yok edilmesi' },
    { label: 'Endüstriyel atıklar/fabrika atıkları', value: 'Endüstriyel atıklar/fabrika atıkları' },
    { label: 'Plastik atıklar', value: 'Plastik atıklar' },
    { label: 'Mevsimlerin kayması/yer değiştirmesi', value: 'Mevsimlerin kayması/yer değiştirmesi' },
    { label: 'Mevsimlerin özelliklerinin değişmesi', value: 'Mevsimlerin özelliklerinin değişmesi' },
    { label: 'Aşırı sıcak havalar', value: 'Aşırı sıcak havalar' },
    { label: 'Kuraklık', value: 'Kuraklık' },
    { label: 'Orman yangınları', value: 'Orman yangınları' },
    { label: 'Hava kirliliği', value: 'Hava kirliliği' },
    { label: 'Toprak kirliliği', value: 'Toprak kirliliği' },
    { label: 'Tarım ürünlerinin veriminin ve kalitesinin düşmesi', value: 'Tarım ürünlerinin veriminin ve kalitesinin düşmesi' },
    { label: 'Su kaynaklarının olumsuz etkilenmesi', value: 'Su kaynaklarının olumsuz etkilenmesi' },
    { label: 'Balıkların ve suda yaşayan diğer canlıların olumsuz etkilenmesi', value: 'Balıkların ve suda yaşayan diğer canlıların olumsuz etkilenmesi' },
    { label: 'Gıda krizi', value: 'Gıda krizi' },
    { label: 'Su krizi', value: 'Su krizi' },
    { label: 'Hastalıklar', value: 'Hastalıklar' },
    { label: 'Erken yaşta ölümler', value: 'Erken yaşta ölümler' }
  ]);
  
  
  console.log(video)
  const videoId = video?.url?.split('=')[1];
    return (
      <ScrollView>
        <Text style={styles.header}>{video.title}</Text>
        <TouchableWithoutFeedback onPress={() => {}}>
          <YouTube
            videoId={videoId} // The YouTube video ID
            play={true}// control playback of video with true/false
            fullscreen // control whether the video should play in fullscreen or inline
            loop 
            style={styles.video}
          />
        </TouchableWithoutFeedback>
        <Text style={styles.desc}>{video.description}</Text>
        <View style={styles.questionsWrapper}>
          <Text style={{color: 'black', fontSize: 20, marginBottom: 25}}>Videoda ne dikkatinizi çekti?</Text>
        <RadioForm
        radio_props={items}
        initial={0}
        value={value}
        setValue={setValue}
        withLabels={true}
        buttonOuterColor={'#008AD8'}
        defaultButtonColor={'#00000050'}
        buttonOuterSize={30}
        buttonInnerColor={'#008AD8'}
        buttonInnerSize={25}
        radioFormStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}
        radioButtonItemStyle={{
          backgroundColor: '#d3d3d9',
          width: 80,
          marginBottom: 10,
        }}
        radioButtonLabelStyle={{
          fontSize: 16,
          color: '#008AD8'
        }}
        onPress={() => {
          console.log("clicked!")
        }}
        />
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'black'
  },
  video: {
    padding: 20,
    height: 260,
    marginHorizontal: 10,
  },
  desc: {
    padding: 20,
    fontSize: 16,
    textAlign: 'justify',
    color: 'black'
  },
  questionsWrapper: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 20,
    }
})