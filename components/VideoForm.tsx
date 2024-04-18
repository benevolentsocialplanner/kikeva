import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {APIROUTES} from '../constants/apiRoutes';
import {AppContext} from '../App';
import axios from 'axios';
import {SelectList} from 'react-native-dropdown-select-list';

export const VideoForm = ({editVideoData}) => {
  const [videoFormData, setVideoFormData] = React.useState(editVideoData ? editVideoData : {
    url: '',
    title: '',
    description: '',
    is_active: true,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [info, setInfo] = React.useState('');
  const [selected, setSelected] = React.useState(false);

  const {user, videos, setVideos} = React.useContext(AppContext);

  const status = [
    {key: 1, value: "true"},
    {key: 2, value: "false"},
  ];

  const headers = {
    Authorization: `Bearer ${user}`
  };

  const handleVideoSubmit = () => {
    setIsLoading(true);
    setInfo('');
    editVideoData ? 
    axios
    .put(`${APIROUTES.postVideo}${editVideoData.id}`, videoFormData, {headers})
    .then(res=>{
      console.log(res.data, `guncellendi`)
      setInfo('Video başarıyla eklendi');
    })
    .catch(err=>{
      console.log(err.message, "gncellenemedi")
    })
    : (axios
      .post(APIROUTES.postVideo, videoFormData, {headers})
      .then((res) => {
        setInfo('Video başarıyla eklendi');
        setVideos([...videos, res.data])
        console.log(res.data, "VIDEO")
      })
      .catch((err) => {
        console.log(err.message);
        setInfo('Video eklenirken bir hata oluştu');
      })
      .finally(() => {
        setIsLoading(false);
      }))
  };


  return (
    <ScrollView>
      <TextInput
        style={styles.textInput}
        placeholder="URL"
        value={videoFormData.url}
        placeholderTextColor={'#000'}
        onChangeText={(value) => setVideoFormData({ ...videoFormData, url: value })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Title"
        value={videoFormData.title}
        placeholderTextColor={'#000'}
        onChangeText={(value) => setVideoFormData({ ...videoFormData, title: value })}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        value={videoFormData.description}
        placeholderTextColor={'#000'}
        onChangeText={(value) => setVideoFormData({ ...videoFormData, description: value })}
        multiline={true}
      />
      <View style={styles.selectWrapper}>
          <SelectList
            search={false}
            setSelected={(val) => setSelected(val)} 
            data={status} 
            dropdownTextStyles={{color: 'black'}}
            inputStyles={{color: 'black'}}
            save="value"
            placeholder="Select status"
          />
        </View>
      <TouchableOpacity onPress={handleVideoSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
      {info && info.length > 0 && <Text style={{fontSize: 18, textAlign: 'center', margin: 10, color: 'black'}}>{info}</Text>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  selectWrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
});