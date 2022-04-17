import React, {useState, useEffect, useContext, createContext} from 'react'
import { Text, View, ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from './src/screens/Home'
import Chat from './src/screens/Chat'
import Welcome from './src/screens/Welcome'
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/config.js'


const Stack = createNativeStackNavigator();
// createContext for Authenication
const UserContext = createContext({});

// create AuthProvider with child components
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
    )
}

const AuthStack = () => {
  return (
  <Stack.Navigator
  >
    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
  </Stack.Navigator>
  )
}

const ChatStack = () => {
  return (
    <Stack.Navigator 
      defaultScreenOptions={Home}
    >
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
          auth,
          async authenticatedUser => {
            authenticatedUser ? setUser(authenticatedUser) : setUser(null);
            setIsLoading(false);
          }
        );
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
      }, [user]);
      
      if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
        );
      }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <SafeAreaView style={{
      backgroundColor: 'white',
      flex : 1
    }}>
      <AuthProvider>
          <RootNavigator/>
      </AuthProvider>
    </SafeAreaView>
  );
}

