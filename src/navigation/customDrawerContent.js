/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomDrawerContent = ({navigation}) => {
  const navigateToScreen = screen => () => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Dashboard')}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}>
          Dashboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Student')}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}>
          Assignment
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Timetable')}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}>
          Timetable
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Calendar')}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}>
          Holiday
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  item: {
    color: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDrawerContent;
