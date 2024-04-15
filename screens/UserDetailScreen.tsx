import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { APIROUTES } from '../constants/apiRoutes';
import { AppContext } from '../App';

const UserDetailScreen = ({route}) => {
  console.log(route.params.user);
  const navigation = useNavigation();
  const [answeredVids, setAnsweredVids] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const {user} = React.useContext(AppContext);


  const headers = {
    Authorization: `Bearer ${user}`
  }

  React.useEffect(() => {
    axios
    .get(APIROUTES.getRatingByUser.replace("user_id", route.params.user.id), {headers})
    .then(res => {
      console.log(res.data, "başarılı fetch")
      const result = res.data
      setAnsweredVids(result)
    })
    .catch(err => {
      console.log(err.message)
    })

    // axios
    // .post(`${APIROUTES.getRatings}70`, {rating: "4"}, {headers})
    // .then(res => {
    //   console.log(res.data, "başarılı")
    // })
    // .catch(err => {
    //   console.log(err.message, "hata")
    // })
  }, [])

  return (
    <SafeAreaView>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.image}/>
        </TouchableOpacity>
        <Text style={styles.headText}>{route.params?.user.name}</Text>
        <View style={styles.image}>
        </View>
      </View>
      {answeredVids.length > 0 && (
        answeredVids.map((answers, index) => {
          return(
            <TouchableOpacity key={index} style={styles.tabContainer} onPress={() => navigation.navigate('AnswersScreen', {answers, user: route.params.user})}>
              <Text>
                {answers.video.title}
              </Text>
              {answers.rating && <Text>Rating: {JSON.stringify(answers.rating)}</Text>}
            </TouchableOpacity>
          )
        })
    )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  image: {
    width: 30,
    height: 30,
  },
  headText: {
    alignSelf: 'center',
    margin: 'auto',
    fontSize: 24,
    overflow: 'hidden',
  },
  tabContainer: {
    top: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row"
  }
});

export default UserDetailScreen