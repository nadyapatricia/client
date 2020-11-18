import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login, Dashboard , Chat, DashboardAdvisor} from './src/screens';
import { color } from './src/utility';
import { Loader } from './src/components';

import { StoreProvider } from './src/context/store';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const Stack = createStackNavigator();

const getFonts = () =>
  Font.loadAsync({
    'comfortaa-bold': require('./assets/fonts/Comfortaa-Bold.ttf'),
    'comfortaa-regular': require('./assets/fonts/Comfortaa-Regular.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <StoreProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
              headerShown: true,
              headerStyle: { backgroundColor: '#00dfeb' },
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
            />
            <Stack.Screen
              name='Dashboard'
              component={Dashboard}
            />
            <Stack.Screen
              name='DashboardAdvisor'
              component={DashboardAdvisor}
            />
            <Stack.Screen
              name='Chat'
              component={Chat}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Loader />
      </StoreProvider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

export default App;
