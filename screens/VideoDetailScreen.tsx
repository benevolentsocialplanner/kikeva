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
import { AirbnbRating } from 'react-native-ratings';
import SelectMultiple from 'react-native-select-multiple';
import YouTube from 'react-native-youtube';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { APIROUTES } from '../constants/apiRoutes';
import { AppContext } from '../App';
import axios from 'axios';
import { VideoForm } from '../components/VideoForm';
import WebView from 'react-native-webview';

export const VideoDetailScreen = ({ route }) => {

  const [rating, setRating] = React.useState(3);
  const [isRated, setIsRated] = React.useState(false);

  const { video } = route.params;
  const { user, isAdmin } = React.useContext(AppContext);
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
  const secondFruits = [
    'Kanser',
    'Solunum yolu hastalıkları',
    'Alerjik Hastalıklar',
    'Cilt hastalıkları',
    'Göz hastalıkları',
    'Diyabet Hastalığı',
    'Hipertansiyon',
    'Kalp ve damar hastalıkları',
    'Böbrek hastalıkları',
    'Üreme sağlığını etkileyen hastalıklar',
    'Psikiyatrik hastalıklar',
  ];

  const [value, setValue] = React.useState("")
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [selectedFruits, setSelectedFruits] = React.useState([]);
  const [selectedFruitsSecond, setSelectedFruitsSecond] = React.useState([]);

  const [info, setInfo] = React.useState('')
  const headers = {
    Authorization: `Bearer ${user}`
  };

  React.useEffect(() => {
    axios
      .get(APIROUTES.postRating.replace('video_id', video?.id), { headers })
      .then(res => {
        if (res.data.rating) setIsRated(true);
        setInfo('Cevaplarınız kaydedildi.');
        setVideos(prevVideos => {
          return prevVideos.map(vid => {
            if (vid.id === video?.id) {
              return { ...vid, is_rated: true };
            } else {
              return vid;
            }
          });
        });
      })
      .catch(err => {
        console.error(err.message);
      });
  }, []);


  const onSelectionsChange = (selected) => {
    setSelectedFruits(selected);
  }

  const onSelectionsSecondChange = (selected) => {
    setSelectedFruitsSecond(selected)
  }

  const ratingCompleted = (rating) => {
    setRating(rating)
  }

  const handleEdit = () => {
    setIsFormOpen(!isFormOpen)
  }
  const mergeQuestionObjects = (first, second) => {
    return {...first, ...second};  // Combine both objects into one
};

  const onSave = () => {
    const selectedQuestions = {};
    const selectedLabels = selectedFruits.map(fruit => fruit.label);
    const selectedQuestionsSecond = {};
    const selectedLabelsSecond = selectedFruitsSecond.map(fruit => fruit.label);

    fruits.forEach((question, index) => {
      const isSelected = selectedLabels.includes(question);
      selectedQuestions[`question_${index + 1}`] = isSelected;
    });

    secondFruits.forEach((question, index) => {
      const isSelected = selectedLabelsSecond.includes(question);
      selectedQuestionsSecond[`question_${index + 21}`] = isSelected;
    });

    selectedQuestions["rating"] = rating;
    const mergedQuestions = mergeQuestionObjects(selectedQuestions, selectedQuestionsSecond);

    axios
      .post(APIROUTES.postRating.replace("video_id", video?.id), mergedQuestions, { headers })
      .then(response => {
        navigation.navigate('Videolar');
        setInfo('Başarıyla kaydedildi.')
      })
      .catch(error => {
        console.error('Error occurred while saving questions:', error.message);
        setInfo('Bir hata oluştu. Lütfen tekrar deneyin.');
      });
  }

  const renderLabel = (label, style) => {

    return (
      <View style={{ marginLeft: 10 }}>
        <Text style={{ color: 'black' }}>{label}</Text>
      </View>
    )
  }

  const videoEmbedUrl = video.url.replace('watch?v=', 'embed/');
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
          <View style={{ width: 30, height: 30, justifyContent: 'center' }} >
            <TouchableOpacity onPress={() => navigation.navigate('Videolar')}>
              <Image source={require('../assets/back.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, height: '100%' }} >
            <Text style={styles.header}>{video?.title}</Text>
          </View>
          <View style={{ width: 30, height: 30, }} >
            {isAdmin && (<TouchableOpacity onPress={() => handleEdit()}>
              <Image source={require('../assets/edit.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>)}
          </View>
        </View>

        <View style={{ backgroundColor: 'white' }}>
          <TouchableWithoutFeedback onPress={() => { }} style={{}}>
            {video && <WebView
              style={{ marginTop: -74, width: 1000, height: 370, marginHorizontal: 'auto', alignSelf: 'center' }}
              javaScriptEnabled={true}
              scalesPageToFit={false}
              scrollEnabled={false}
              domStorageEnabled={true}
              source={{ uri: video.url }}
            />}
          </TouchableWithoutFeedback>
          {isFormOpen && <View style={{ height: 350, backgroundColor: 'white', paddingTop: 10, marginTop: -60 }}><VideoForm editVideoData={video}>form</VideoForm></View>}
          <Text style={[styles.desc, { marginTop: -70, backgroundColor: 'white', height: 70 }]}>{video?.description}</Text>
          {!isRated ? <View style={styles.questionsWrapper}>
            <Text style={{ color: 'black', fontSize: 20, marginBottom: 25, marginTop: -15, zIndex: 999 }}>Videoda dikkatinizi çeken iklim krizi özellikleri nelerdir? (Birden fazla seçenek işaretlenebilir)</Text>
            <SelectMultiple
              items={fruits}
              selectedItems={selectedFruits}
              onSelectionsChange={onSelectionsChange}
              renderLabel={renderLabel}
            />
            <Text style={{ color: 'black', fontSize: 20, marginBottom: 25, marginTop: 15, zIndex: 999 }}>Videoda dikkatinizi çeken kronik hastalık/sağlık özellikleri nelerdir? (Birden fazla seçenek işaretlenebilir)</Text>
            <SelectMultiple
              items={secondFruits}
              selectedItems={selectedFruitsSecond}
              onSelectionsChange={onSelectionsSecondChange}
              renderLabel={renderLabel}
            />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={[styles.infoText, { marginTop: 20, fontWeight: 'bold', fontSize: 16 }]}>Videoya puanınız nedir?</Text>
              <AirbnbRating
                size={20}
                reviews={[1, 2, 3, 4, 5]}
                reviewSize={16}
                onFinishRating={ratingCompleted}
              />
            </View>

            <TouchableOpacity onPress={onSave} style={styles.button}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Cevapları Gönder</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 130, justifyContent: 'center' }}>
              {info && <Text style={styles.infoText}>{info}</Text>}
            </View>
          </View> :
            <Text style={styles.infoText}>Cevaplarınız önceden kaydedildi.</Text>}
        </View>
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
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: 'black',
    marginHorizontal: 20,
    alignSelf: 'center',
    paddingBottom: 50
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