/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGO} from '../utils/Imagepath';

const menuItems = [
  {screen: 'Dashboard', label: 'Dashboard'},
  {screen: 'Student', label: 'Assignment'},
  {screen: 'Timetable', label: 'Timetable'},
  {screen: 'Calendar', label: 'Holiday'},
];

const CustomDrawerContent = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user email from AsyncStorage when component mounts
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    try {
      const responseString = await AsyncStorage.getItem('loginResponse');
      const loginResponse = responseString ? JSON.parse(responseString) : null;

      if (loginResponse && loginResponse.data.email) {
        setUserEmail(loginResponse.data.name);
      }
    } catch (error) {
      console.error('Error fetching user email from AsyncStorage:', error);
    }
  };

  const navigateToScreen = screen => () => {
    navigation.navigate(screen);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={navigateToScreen(item.screen)}>
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 250,
        }}>
        <Image
          source={LOGO}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'cover',
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.Email}> {userEmail}</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={item => item.screen}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Email: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});

export default CustomDrawerContent;
