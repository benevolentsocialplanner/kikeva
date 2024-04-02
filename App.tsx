import React, {createContext, useState} from 'react';
import {Storage} from './utils/storage';
import {LoginScreen} from './screens/LoginScreen';
import {VideoScreen} from './screens/VideoScreen';
import {VideoDetailScreen} from './screens/VideoDetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();


// Create a context
export const AppContext = React.createContext({
  user: undefined,
  setUser: (obj: string | undefined) => obj,
  tokenType: undefined,
  setTokenType: (obj: string | undefined) => obj,
});
function App() {
  // Define state for user
  const [user, setUser] = useState(null);
  const [tokenType, setTokenType] = useState(null);

  React.useEffect( () => {
    const loadUser = async () => {
      try {
        const user = await Storage.getItem("user");
        user && setUser(user);

      } catch (error) {
        console.error("Error loading user from storage", error);
      }
    }
    loadUser();
  }, [user]);

  React.useEffect( () => {
    const loadTokenType = async () => {
      try {
        const tokenType = await Storage.getItem("tokenType");
        tokenType && setTokenType(tokenType);

      } catch (error) {
        console.error("Error loading tokenType from storage", error);
      }
    }
    loadTokenType();
  }, [tokenType]);

  return (
    // Wrap the application with the context provider
    <AppContext.Provider value={{ user, setUser, tokenType, setTokenType }}>
      {user && tokenType ? 
        <>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="VideoScreen" component={VideoScreen} />
              <Stack.Screen name="VideoDetailScreen" component={VideoDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
        : 
        <LoginScreen/> 
        }
    </AppContext.Provider>
  );
}

export default App;
