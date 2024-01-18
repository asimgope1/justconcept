/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import Header from '../components/Header';

const StudentScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <Header title="Student" onPress={() => navigation.openDrawer()} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Main Content of DashboardScreen */}
        <Text>StudentScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default StudentScreen;
