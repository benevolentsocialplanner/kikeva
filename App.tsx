import React, {useState} from 'react';
import {Storage} from './utils/storage';
import {LoginScreen} from './screens/LoginScreen';
import {VideoDetailScreen} from './screens/VideoDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import UserDetailScreen from './screens/UserDetailScreen';
import AnswersScreen from './screens/AnswersScreen';
import axios from 'axios';
import {APIROUTES} from './constants/apiRoutes'; 

const Stack = createNativeStackNavigator();

// Create a context
export const AppContext = React.createContext({
  user: undefined,
  setUser: (obj: string | undefined) => obj,
  isAdmin: undefined,
  setIsAdmin: (obj: boolean | undefined) => obj,
  tokenType: undefined,
  setTokenType: (obj: string | undefined) => obj,
  videos: [],
  setVideos: (obj: unknown) => obj,
  users: [],
  setUsers: (obj: unknown) => obj,
});
function App() {
  const [user, setUser] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        user && await Storage.setItem('user', user);
        console.log(user, 'user');
      } catch (error) {
        console.error("Error loading user from storage", error);
      }
    }
    loadUser();
  }, [user]);

  React.useEffect(() => {
    const loadTokenType = async () => {
      try {
        tokenType && await Storage.setItem("tokenType", tokenType);

      } catch (error) {
        console.error("Error loading tokenType from storage", error);
      }
    }
    loadTokenType();
  }, [tokenType]);

  React.useEffect(() => {
    const loadIsAdmin = async () => {
      try {
        isAdmin && await Storage.setItem("isAdmin", isAdmin);
      } catch (error) {
        console.log("Error loading the permissions", error.message)
      }
    }
    loadIsAdmin();
  }, [isAdmin]);
  React.useEffect(() => {
    console.log(videos)
  },[videos])

  React.useEffect(() => {
    const loadCredentials = async () => {
      try {
        // oturumu açık tut
        const checkAdmin = await Storage.getItem("isAdmin")
        const checkType = await Storage.getItem("tokenType")
        const checkUser = await Storage.getItem("user")
        checkAdmin && setIsAdmin(checkAdmin)
        checkType && setTokenType(checkType)
        checkUser && setUser(checkUser)
      } catch (error) {
        console.log(error?.mesage, "error mounting")
      }
    }
    loadCredentials();
  },[])


  React.useEffect(() => {
    const fetchUsers = (headers: String) => {
      axios
        .get(APIROUTES.getUsers, {headers})
        .then(res => {
          setUsers(res.data);
        })
        .catch(err => {
          console.log(err.message);
        });
    };

    if(isAdmin && user) {
      let headers = {
        Authorization: `Bearer ${user}`
      }
      fetchUsers(headers);
    }

  }, [isAdmin]);

  return (
    <AppContext.Provider value={{user, setUser, tokenType, setTokenType, isAdmin, setIsAdmin, users, setUsers, videos,setVideos}}>
      {user?.length > 0 ? (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            options={{headerShown: false}}
            name={'BottomTabNavigation'}
            component={BottomTabNavigation}
            />
          <Stack.Screen
            options={{headerShown: false}}
            name={"VideoDetailScreen"}
            component={VideoDetailScreen}
            />
            <Stack.Screen
            options={{headerShown: false}}
            name={"UserDetailScreen"}
            component={UserDetailScreen}
            />
            <Stack.Screen
            options={{headerShown: false}}
            name={"AnswersScreen"}
            component={AnswersScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
      ) : (
        <LoginScreen/> 
      )}
    </AppContext.Provider>
  );
}

export default App;
