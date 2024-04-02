import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import {APIROUTES} from '../constants/apiRoutes';
import {useNavigation} from '@react-navigation/native';
import { AppContext } from '../App';

type Video = {
  description: string;
  id: number;
  is_active: boolean;
  title: string;
  url: string;
}

export const VideoScreen = () => {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const {tokenType, user} = React.useContext(AppContext);

  const navigation = useNavigation();
  

  React.useEffect(() => {

    setIsLoading(true)
    
      const fetch = () => {
        const headers = {
          Authorization: `Bearer ${user}`
        };
        console.log(headers, `headers`)
  
        axios.get(APIROUTES.getVideos, { headers })
        .then((res) => {
          console.log(res)
          setVideos(res.data)
        })
        .catch((err)=> {
          console.log('Error getting videos', err.message)
          setVideos([
            {id: 1, title: 'Video 1', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw'},
            {id: 2, title: 'Video 2', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw'},
            {id: 3, title: 'Video 3', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw'},
            {id: 4, title: 'Video 4', url: 'https://www.youtube.com/watch?v=gvkqT_Uoahw'},
          ])
        })
      }

      fetch();
      setIsLoading(false)
  },[])

  return (
    <SafeAreaView>
      {isLoading && <Text>Loading...</Text>}
      <Text style={styles.head}>Videolar</Text>
      <View style={styles.columnSection}>
      {videos.map((video, index) => (
        <TouchableOpacity 
        key={index}
        style={styles.titleWrapper}
        onPress={()=> navigation.navigate('VideoDetailScreen', {video: video})}
        > 
          <Text key={index}>{video.title}</Text>
        </TouchableOpacity>
      ))}
      </View>
    </SafeAreaView>
  )

};

const styles = StyleSheet.create({
  head: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleWrapper: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  columnSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 10,
    padding: 10,
  }
})