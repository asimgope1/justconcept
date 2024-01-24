/* eslint-disable prettier/prettier */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
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

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Student"
        component={StudentScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Timetable"
        component={TimetableScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="LogOut"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Lecture"
        component={Lecture}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="StudentDetails"
        component={StudentDetails}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Assignment"
        component={Assignment}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="AssignmentFinal"
        component={AssignmentFinal}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="AssignmentDetails"
        component={AssignmentDetails}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="StudentEdit"
        component={StudentEdit}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
