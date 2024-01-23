/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DASHBOARD,
  HOLIDAY,
  LOGO,
  MENU,
  STUDENT,
  TIMETABLE,
} from '../utils/Imagepath';
import {useIsFocused} from '@react-navigation/native';

const menuItems = [
  {screen: 'Dashboard', label: 'Dashboard', image: DASHBOARD, key: 1},
  {screen: 'Student', label: 'Assignment', image: STUDENT, key: 2},
  {screen: 'Timetable', label: 'Timetable', image: TIMETABLE, key: 3},
  {screen: 'Calendar', label: 'Holiday', image: HOLIDAY, key: 4},
];

const CustomDrawerContent = ({navigation}) => {
  // console.log(navigation);
  // console.log('');
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
      <View>
        <Image
          source={item.image}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            tintColor: 'white',
          }}
        />
      </View>
      <View
        style={{
          paddingLeft: 35,
        }}>
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 60,
          zIndex: -1,
          //   backgroundColor: 'red',
        }}
      />
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          width: '100%',
          height: Dimensions.get('window').height * 0.12,
          alignItems: 'center',
          //   justifyContent: 'center',
        }}>
        <Image
          source={LOGO}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            paddingLeft: 10,
          }}>
          <Text style={styles.Email}> {userEmail}</Text>
          <Text style={styles.Email}> Student</Text>
        </View>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: Dimensions.get('window').width * 0.08,
    backgroundColor: '#242121',
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  Email: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    height: Dimensions.get('window').height * 0.08,
    // backgroundColor: 'red',
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  itemText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});

export default CustomDrawerContent;
