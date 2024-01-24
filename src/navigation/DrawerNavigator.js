/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustomDrawerContent from './customDrawerContent';
import DashboardScreen from '../screens/DashboardScreen';
import StudentScreen from '../screens/StudentScreen';
import TimetableScreen from '../screens/TimetableScreen';
import CalendarScreen from '../screens/CalendarScreen';
import LoginScreen from '../screens/LoginScreens';
import Lecture from '../screens/Lecture';
import StudentDetails from '../screens/StudentDetails';
import Assignment from '../screens/AssignmentScreen';
import AssignmentDetails from '../screens/AssignmentDetails';
import AssignmentFinal from '../screens/AssignmentFinalScreen';
import StudentEdit from '../screens/StudentEditScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const ScreensStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Student"
      component={StudentScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Timetable"
      component={TimetableScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="LogOut"
      component={LoginScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Lecture"
      component={Lecture}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="StudentDetails"
      component={StudentDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Assignment"
      component={Assignment}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AssignmentFinal"
      component={AssignmentFinal}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="AssignmentDetails"
      component={AssignmentDetails}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="StudentEdit"
      component={StudentEdit}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ScreensStack"
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="ScreensStack"
        component={ScreensStack}
        options={{drawerLabel: 'Home', headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
