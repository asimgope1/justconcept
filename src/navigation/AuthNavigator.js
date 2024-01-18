/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreens';

const Stack = createStackNavigator();

const AuthNavigator = ({onLogin}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <LoginScreen {...props} onLogin={onLogin} />}
      </Stack.Screen>
      {/* Add other authentication screens if needed */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
