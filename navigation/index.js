import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInScreen from '../screens/LogInScreen'
import MainScreen from '../screens/MainScreen'
import ShoppingCartScreen from '../screens/ShoppingCartScreen'
const Stack = createNativeStackNavigator();

const Navigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name='LogIn' component={LogInScreen} />
        <Stack.Screen name='Main' component={MainScreen} initialParams={{shoppingCart:[]}}/>
        <Stack.Screen
          name="Shopping Cart"
          component={ShoppingCartScreen}

        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation