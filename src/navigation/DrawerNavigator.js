/* eslint-disable prettier/prettier */
// DrawerNavigator.js
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './customDrawerContent';
import DashboardScreen from '../screens/DashboardScreen';
import StudentScreen from '../screens/StudentScreen';
import TimetableScreen from '../screens/TimetableScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Student" component={StudentScreen} />
      <Drawer.Screen name="Timetable" component={TimetableScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
