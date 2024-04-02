import React from 'react'
import {StyleSheet, Text} from 'react-native';
import YouTube from 'react-native-youtube';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

export const VideoDetailScreen = ({route}) => {
  const {video} = route.params;
  const [value, setValue] = React.useState("")
  const [items,setItems] = React.useState([
    {label: 'test1', value: 'test1'},
    {label: 'test8', value: 'test8'}
  ])
  
  console.log(video)
  const videoId = video?.url?.split('=')[1];
    return (
      <>
        <Text style={styles.header}>{video.title}</Text>
        <YouTube
          videoId={videoId} // The YouTube video ID
          play // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop 
          style={styles.video}
        />
        <Text style={styles.desc}>{video.description}</Text>
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
      </>
    )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  video: {
    padding: 20,
    height: 260,
    marginHorizontal: 10,
  },
  desc:{
    padding: 20,
    fontSize: 16,
    textAlign: 'justify',
  }
})