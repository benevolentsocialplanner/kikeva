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

type Video = {
  description: string;
  id: number;
  is_active: boolean;
  title: string;
  url: string;
};

export const VideoScreen = () => {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const {tokenType, user, setUser, isAdmin, setIsAdmin, setTokenType} = React.useContext(AppContext);

  const navigation = useNavigation();

  const handleLogout = () => {
    setUser(undefined);
    setIsAdmin(false);
    setTokenType(undefined);
  };

  const headers = {
    Authorization: `Bearer ${user}`
  };

  React.useEffect(() => {
    setIsLoading(true);

    const fetch = () => {
      

      axios
        .get(APIROUTES.getVideos, { headers })
        .then((res) => {
          setVideos(res.data)
          console.log(res.data, "videos fetched")
        })
        .catch((err) => {
          console.log('Error getting videos', err.message)
          setVideos([
            { id: 1, title: 'Video 1', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
            { id: 2, title: 'Video 2', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
            { id: 3, title: 'Video 3', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
            { id: 4, title: 'Video 4', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw' },
          ])
        })
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
      <ScrollView>
        <View style={styles.columnSection}>
          {videos.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={styles.titleWrapper}
              onPress={() => navigation.navigate('VideoDetailScreen', { video: video })}
            >
              <Text key={index} style={{ color: "black" }}>{video.title}</Text>
              {isAdmin && (
              <TouchableOpacity onPress={() => handleDelete(video)}>
                <Image source={require('../assets/trash.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
          <Button title="Logout" onPress={handleLogout} />
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
    backgroundColor: 'lightgrey',
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