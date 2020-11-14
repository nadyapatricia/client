import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Dashboard from './src/screens/Dashboard';

import { color } from './src/utility';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: color.DARK_GRAY },
          headerTintColor: color.WHITE,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Dashboard'
          component={Dashboard}
          options={{ headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
