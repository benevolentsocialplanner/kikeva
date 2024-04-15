import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, ViewStyle, StyleSheet, Dimensions} from 'react-native';
import {VideoScreen} from '../screens/VideoScreen';
import {AppContext} from '../App';
import {AdminScreen} from '../screens/AdminScreen';
import {InfoScreen} from '../screens/InfoScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

const Tab = createBottomTabNavigator();
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    marginBottom: 75,
    backgroundColor: '#fb9e50',
    borderRadius: 50,
    left: '20%',
    width: '60%',
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 10,
    position: 'absolute',
    zIndex: 100,
    height: SCREEN_HEIGHT * 0.07, // Set height to 10% of screen height
  } as ViewStyle,
};

const BottomTabNavigation = ({navigation}) => {
  const {isAdmin} = React.useContext(AppContext);
  
  return (
    <>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={styles.imageDiscover}
                  source={focused ? require('../assets/play-button.png') : require('../assets/play.png')}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  style={styles.imageDiscover}
                  source={focused ? require('../assets/infoFocused.png') : require('../assets/info.png')}
                />
              );
            },
          }}
        />
        {isAdmin &&(
            <Tab.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{
              tabBarIcon: ({focused}) => {
                return (
                  <Image
                    style={styles.imageDiscover}
                    source={focused ? require('../assets/databaseFocused.png') : require('../assets/database.png')}
                  />
                );
              },
            }}
          />
        )}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    justifyContent: 'center',
  },
  imageDiscover: {
    width: 30,
    height: 30,
  },
  imageHome: {
    width: 30,
    height: 30,
  },
  imageProfile: {
    width: 24.3,
    height: 30,
  },
});

export default BottomTabNavigation;