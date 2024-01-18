/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Calendar} from 'react-native-calendars';

const DashboardScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Main Content of DashboardScreen */}
        <Text>DashboardScreen</Text>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: 450,
            width: 400,
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
