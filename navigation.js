import { createStackNavigator } from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import HomeScreen from './Screens/HomeScreen'
import NewPostScreen from './Screens/NewPostScreen'
import { Text } from 'react-native'
import React from 'react'
import LoginScreen from './Screens/LoginScreen'
import SignupScreen from './Screens/SignupScreen'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => (
  <NavigationContainer>

    <Stack.Navigator
      initialRouteName = 'HomeScreen' 
      screenOptions = {screenOptions}
    >
    <Stack.Screen name = 'HomeScreen' component={HomeScreen} />
    <Stack.Screen name = 'NewPostScreen' component={NewPostScreen} />
    
    {/* <Stack.Screen name = 'SignupScreen' component={SignupScreen} /> */}
    </Stack.Navigator>

   </NavigationContainer>
)

export const SignedOutStack = () => (
  <NavigationContainer>

    <Stack.Navigator
      initialRouteName = 'LoginScreen' 
      screenOptions = {screenOptions}
    >
   
    {/* <Stack.Screen name = 'NewPostScreen' component={NewPostScreen} /> */}
    <Stack.Screen name = 'LoginScreen' component={LoginScreen} />
    <Stack.Screen name = 'SignupScreen' component={SignupScreen} />
    </Stack.Navigator>

   </NavigationContainer>
)

