import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login, Dashboard } from './src/screens';
import { color } from './src/utility';
import { Loader } from './src/components';

import { StoreProvider } from './src/context/store';

const Stack = createStackNavigator();

function App() {
  return (
    <StoreProvider>
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
            name='Dashboard'
            component={Dashboard}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Loader />
    </StoreProvider>
  );
}

export default App;
