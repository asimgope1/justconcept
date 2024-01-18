/* eslint-disable prettier/prettier */
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Calendar} from 'react-native-calendars';
import Storage from '../utils/Storage';

const DashboardScreen = ({navigation}) => {
  const handleLogout = async () => {
    await Storage.clearStorage();
    await Storage.setAuthenticatedStatus(false);

    navigation.navigate('Login');
  };

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
            margin: 50,
            borderColor: 'gray',
            height: 350,
            width: 350,
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
