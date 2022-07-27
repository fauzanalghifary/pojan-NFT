import React from 'react';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Collection Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
