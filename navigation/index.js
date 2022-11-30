import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInScreen from '../screens/LogInScreen'
import MainScreen from '../screens/MainScreen'
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='LogIn' component={LogInScreen}/>
        <Stack.Screen name='Main' component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation