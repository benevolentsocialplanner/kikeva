import React, {useState} from 'react';
import {Storage} from './utils/storage';
import {LoginScreen} from './screens/LoginScreen';
import {VideoDetailScreen} from './screens/VideoDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import UserDetailScreen from './screens/UserDetailScreen';
import AnswersScreen from './screens/AnswersScreen';

const Stack = createNativeStackNavigator();

// Create a context
export const AppContext = React.createContext({
  user: undefined,
  setUser: (obj: string | undefined) => obj,
  isAdmin: false,
  setIsAdmin: (obj: boolean) => obj,
  tokenType: undefined,
  setTokenType: (obj: string | undefined) => obj,
});
function App() {
  const [user, setUser] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        await Storage.setItem('user', user);
        console.log(user, 'user');
        console.log(await Storage.getItem('user'), 'user from storage');
      } catch (error) {
        console.error("Error loading user from storage", error);
      }
    }
    loadUser();
  }, [user]);

  React.useEffect(() => {
    const loadTokenType = async () => {
      try {
        await Storage.setItem("tokenType", tokenType);

      } catch (error) {
        console.error("Error loading tokenType from storage", error);
      }
    }
    loadTokenType();
  }, [tokenType]);

  React.useEffect(() => {
    const loadIsAdmin = async () => {
      try {
        await Storage.setItem("isAdmin", isAdmin);
      } catch (error) {
        console.log("Error loading the permissions", error.message)
      }
    }
    loadIsAdmin();
  }, [isAdmin])

  React.useEffect(() => {
    const loadCredentials = async () => {
      try {
        const checkAdmin = await Storage.getItem("isAdmin")
        const checkType = await Storage.getItem("tokenType")
        const checkUser = await Storage.getItem("user")
        checkAdmin && setIsAdmin(checkAdmin)
        checkType && setTokenType(checkType)
        checkUser && setUser(checkUser)
        console.log(checkAdmin, checkType, checkUser, "check")
      } catch (error) {
        console.log(error?.mesage, "error mounting")
      }
    }
    loadCredentials();
  },[])

  return (
    <AppContext.Provider value={{ user, setUser, tokenType, setTokenType, isAdmin, setIsAdmin }}>
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
