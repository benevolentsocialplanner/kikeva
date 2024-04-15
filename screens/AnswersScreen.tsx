import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AnswersScreen = ({route}) => {
  const answers = route.params.answers;
  const navigation = useNavigation();

  console.log(answers)
  const renderQuestions = () => {
    const questions = [];

    for (let i = 1; i <= 30; i++) {
      const questionKey = `question_${i}`;
      const questionText = `Soru ${i}: `;
      const questionAnswer = answers[questionKey];
      questions.push(
        <View key={questionKey} style={{display: 'flex', flexDirection: 'row'}}>
          <Text key={questionKey} style={styles.title}>{questionText}</Text>
          <Text key={`${questionKey}${questionAnswer}`} style={{fontSize: 20}}>{JSON.stringify(questionAnswer)}</Text>
        </View>
    );
    }

    return questions;
  };

  return (
    <SafeAreaView>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.image}/>
        </TouchableOpacity>
        <Text style={styles.headText}>{route.params?.user?.name}</Text>
        <View style={styles.image}>
        </View>
      </View>
      <ScrollView style={styles.card}>
        <Text style={styles.title}>Rating: {answers.rating} </Text>
        {renderQuestions()}
      </ScrollView>
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
  title: {
    fontSize: 20, 
    fontWeight: 'bold'
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
  card: {
    backgroundColor: 'lightgrey',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  }
})

export default AnswersScreen;
