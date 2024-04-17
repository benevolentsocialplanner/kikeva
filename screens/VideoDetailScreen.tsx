import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import SelectMultiple from 'react-native-select-multiple';
import YouTube from 'react-native-youtube';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {APIROUTES} from '../constants/apiRoutes';
import {AppContext} from '../App';
import axios from 'axios';
import {VideoForm} from '../components/VideoForm';
import WebView from 'react-native-webview';

export const VideoDetailScreen = ({route}) => {
  
  const [rating, setRating] = React.useState(3);
  const [isRated, setIsRated] = React.useState(false);

  const {video} = route.params;
  const {user, isAdmin} = React.useContext(AppContext);
  const navigation = useNavigation();

  const fruits = [
    'İnsanların doğaya karşı duyarsız davranması',
    'Egzoz gazları',
    'Kentleşme',
    'Yeşil alanların yok edilmesi',
    'Endüstriyel atıklar/fabrika atıkları',
    'Plastik atıklar',
    'Mevsimlerin kayması/yer değiştirmesi',
    'Mevsimlerin özelliklerinin değişmesi',
    'Aşırı sıcak havalar',
    'Kuraklık',
    'Orman yangınları',
    'Hava kirliliği',
    'Toprak kirliliği',
    'Tarım ürünlerinin veriminin ve kalitesinin düşmesi',
    'Su kaynaklarının olumsuz etkilenmesi',
    'Balıkların ve suda yaşayan diğer canlıların olumsuz etkilenmesi',
    'Gıda krizi',
    'Su krizi',
    'Hastalıklar',
    'Erken yaşta ölümler',
  ];


  const [value, setValue] = React.useState("")
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [selectedFruits, setSelectedFruits] = React.useState([]);
  const [info, setInfo] = React.useState('')
  const headers = {
    Authorization: `Bearer ${user}`
  };

  React.useEffect(()=>{
    axios
    .get(APIROUTES.postRating.replace("video_id", video?.id), {headers})
    .then(res => {
      if(res.data.rating) setIsRated(true)
        setInfo('Cevaplarınız kaydedildi.')
    })
    .catch(err => {
      console.log(err.message)
    })
  },[])
  
  const onSelectionsChange = (selected) => {
   setSelectedFruits(selected);
  }

  const ratingCompleted = (rating) => {
    setRating(rating)
  }
  
  const handleEdit = () => {
    setIsFormOpen(!isFormOpen)
  }

  const onSave = () => {
    const selectedQuestions = {};

    // Extracting labels from selectedFruits array
    const selectedLabels = selectedFruits.map(fruit => fruit.label);

    // Iterating over fruits array to match selected labels and mark them as selected
    fruits.forEach((question, index) => {
        const isSelected = selectedLabels.includes(question);
        selectedQuestions[`question_${index + 1}`] = isSelected;
    });

    selectedQuestions["rating"] = rating;
    axios
    .post(APIROUTES.postRating.replace("video_id", video.id), selectedQuestions , {headers})
    .then(response => {
        console.log(response.data, "kaydettin")
    })
    .catch(error => {
        console.error('Error occurred while saving questions:', error.message);
    });
  }

  const renderLabel = (label, style) => {
    return (
        <View style={{marginLeft: 10}}>
          <Text style={{color: 'black'}}>{label}</Text>
        </View>
    )
  }

  const videoEmbedUrl = video.url.replace('watch?v=', 'embed/');
    return (
      <SafeAreaView>
      <ScrollView>
      <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
        <View style={{width: 30, height: 30, justifyContent: 'center'}} >
          <TouchableOpacity onPress={() => navigation.navigate('Videolar')}>
            <Image source={require('../assets/back.png')} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, height: '100%' }} >
        <Text style={styles.header}>{video?.title}</Text>
        </View>
        <View style={{ width: 30, height: 30, }} >
          {isAdmin && (<TouchableOpacity onPress={() => handleEdit()}> 
            <Image source={require('../assets/edit.png')} style={{width: 30, height: 30}}/>
            </TouchableOpacity>)}
        </View>
      </View>


        <TouchableWithoutFeedback onPress={() => {}}>
          {video && <WebView
        style={{marginTop: 20, width: '90%', height: 230, marginHorizontal: 'auto', alignSelf: 'center'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{uri: videoEmbedUrl}}
      />}
        </TouchableWithoutFeedback>
        {isFormOpen && <VideoForm editVideoData={video}>form</VideoForm>}
        <Text style={styles.desc}>{video?.description}</Text>
        {!isRated ? <View style={styles.questionsWrapper}>
          <Text style={{color: 'black', fontSize: 20, marginBottom: 25}}>Videoda ne dikkatinizi çekti?</Text>
          <SelectMultiple
            items={fruits}
            selectedItems={selectedFruits}
            onSelectionsChange={onSelectionsChange}
            renderLabel={renderLabel}
          />
          <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Text style={[styles.infoText, {marginTop: 20, fontWeight: 'bold', fontSize: 16}]}>Videoya puanınız nedir?</Text>
          <AirbnbRating 
            size={20}
            reviews={[1,2,3,4,5]}
            reviewSize={16}
            onFinishRating={ratingCompleted}
          />
          </View>
          
          <TouchableOpacity onPress={onSave} style={styles.button}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', textAlign:'center'}}>Cevapları Gönder</Text>
          </TouchableOpacity>
          <View style={{marginBottom: 130, justifyContent: 'center'}}>
            {info && <Text style={styles.infoText}>{info}</Text>}
          </View>
        </View>: 
        <Text style={styles.infoText}>Cevaplarınız önceden kaydedildi.</Text>}
      </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'black',
  },
  video: {
    padding: 20,
    height: 260,
    marginHorizontal: 10,
  },
  desc: {
    padding: 20,
    fontSize: 18,
    overflow: 'hidden',
    textAlign: 'justify',
    color: 'black',
  },
  questionsWrapper: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: 'black',
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    marginBottom: 100,
    borderRadius: 50,
    backgroundColor: '#fb9e50',
    width: 130,
    padding: 20,
    alignSelf: 'center',
  }
});