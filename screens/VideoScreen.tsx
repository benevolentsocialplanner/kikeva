import axios from 'axios';
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  View,
} from 'react-native';
import {APIROUTES} from '../constants/apiRoutes';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../App';
import { Storage } from '../utils/storage';

type Video = {
  description: string;
  id: number;
  is_active: boolean;
  title: string;
  url: string;
};

export const VideoScreen = () => {
  const {videos, setVideos} = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const {tokenType, user, setUser, isAdmin, setIsAdmin, setTokenType, setUsers} = React.useContext(AppContext);

  const navigation = useNavigation();

  const handleLogout = async () => {
    setUser(undefined);
    setIsAdmin(false);
    setTokenType(undefined);
    await Storage.setItem('user', undefined);
    await Storage.setItem('tokenType', undefined);
    await Storage.setItem('isAdmin', false);
    setVideos([]);
    setUsers([]);
  };

  const headers = {
    Authorization: `Bearer ${user}`
  };

  React.useEffect(() => {
    setIsLoading(true);

    const fetch = () => {
      if(isAdmin) {
        axios
        .get(APIROUTES.getVideosAdmin, { headers })
        .then((res) => {
          setVideos(res.data)
          console.log(res.data, "videos fetched")
        })
        .catch((err) => {
          console.log('Error getting videos', err.message)
          setVideos([])
        })
      } else {
        axios
        .get(APIROUTES.getVideos, { headers })
        .then((res) => {
          setVideos(res.data)
          console.log(res.data, "videos fetched")
        })
        .catch((err) => {
          console.log('Error getting videos', err.message)
          setVideos([])
        })
      }

      
    }

    fetch();
    setIsLoading(false)
  }, [])

  const handleDelete = (item) => {
    axios
    .delete(APIROUTES.deleteVideo.replace('video_id', item?.id), {headers})
    .then(res => {
      console.log(res.data, "silindi")
      setVideos(prevVideos => prevVideos.filter(video => video.id !== item.id));

    })
    .catch(err => {
      console.log(err, "silinemedi")
    })

  }

  return (
    <SafeAreaView>
      {isLoading && <Text>Loading...</Text>}
      <Text style={styles.head}>Videolar</Text>
      <ScrollView style={{marginBottom: 130}}>
        <View style={styles.columnSection}>
          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.titleWrapper, video.is_rated ? {backgroundColor: 'green'} : {backgroundColor: 'lightgray'}]}
              onPress={() => navigation.navigate('VideoDetailScreen', { video: video })}
            >
              <Text key={index} style={ video.is_rated ? {color: 'white', fontWeight: 600} : {color: 'black', fontWeight: 600}}>{video.title}</Text>
              {isAdmin && (
              <TouchableOpacity onPress={() => handleDelete(video)}>
                <Image source={require('../assets/trash.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
          <Button title="Çıkış Yap" onPress={handleLogout} />
        </View>
      </ScrollView>

    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  head: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  titleWrapper: {
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
    padding: 10,
  }
})