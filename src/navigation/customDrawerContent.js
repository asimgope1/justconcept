// CustomDrawerContent.js
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
        <Text>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Student')}>
        <Text>Student</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Timetable')}>
        <Text>Timetable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.item}
        onPress={navigateToScreen('Calendar')}>
        <Text>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDrawerContent;
