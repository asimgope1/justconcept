/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../utils/Storage';

const DashboardScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [lectureDetails, setLectureDetails] = useState({});
  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      const storedAccessToken = await Storage.getAccessToken();

      if (!storedAccessToken) {
        console.error('Access token not found in AsyncStorage');
        return;
      }

      setAccessToken(storedAccessToken);

      const response = await fetch(
        'https://justconcepts.in/app/justconceptapi/public/api/lectureList',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error('Failed to fetch lectures:', response.status);
        return;
      }

      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const dates = result.data.map(lecture => lecture.date);
        setAllDates(dates);

        const subjectDotColorMap = {
          Chem: 'red',
          Bio: 'red',
          Science: 'red',
        };

        const markedDatesData = {};

        dates.forEach(dateString => {
          const lecture = result.data.find(
            lecture => lecture.date === dateString,
          );
          const subject = lecture ? lecture.subject : '';
          const dotColor = subjectDotColorMap[subject] || 'blue';

          markedDatesData[dateString] = {
            selected: true,
            marked: true,
            dotColor,
            lectureDetails: lecture,
          };
        });

        setMarkedDates(markedDatesData);
      } else {
        console.error('Data not available or empty array.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleLogout = async () => {
    await Storage.clearStorage();
    await Storage.setAuthenticatedStatus(false);

    navigation.navigate('Login');
  };

  const handleDayPress = date => {
    // Create a copy of the current markedDates state
    const updatedMarkedDates = {...markedDates};

    // Check if the selected date is already marked
    if (updatedMarkedDates[date.dateString]) {
      // Date is already marked, toggle the color
      updatedMarkedDates[date.dateString].dotColor = 'green'; // Set your desired color
    } else {
      // Date is not marked, mark it with a different color
      updatedMarkedDates[date.dateString] = {
        selected: true,
        marked: true,
        dotColor: 'orange', // Set your desired color for the new selection
        lectureDetails: allDates.find(
          selectedDate => selectedDate === date.dateString,
        ),
      };
    }

    // Update the state with the new markedDates
    setMarkedDates(updatedMarkedDates);

    // Set the selected date details
    setSelectedDateDetails(date.dateString);
  };

  const handleScreenTap = () => {
    setSelectedDateDetails(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

        <ScrollView
          contentContainerStyle={{
            // flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Calendar
              style={{
                borderWidth: 1,
                margin: 0.03 * width, // Use 5% of screen width as margin
                borderColor: 'gray',
                height: 0.4 * height, // Use 40% of screen height as height
                width: 0.8 * width, // Use 80% of screen width as width
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
              markedDates={markedDates}
              onDayPress={handleDayPress}
            />

            {selectedDateDetails && (
              <View
                style={{
                  marginTop: 0.05 * height,
                  marginBottom: 0.01 * height,
                  alignItems: 'center',
                }}>
                <Card style={{width: 0.8 * width}}>
                  <Card.Content>
                    <Title>{selectedDateDetails}</Title>
                    <Paragraph>
                      Start Time:{' '}
                      {
                        markedDates[selectedDateDetails].lectureDetails
                          .starttime
                      }
                    </Paragraph>
                    <Paragraph>
                      End Time:{' '}
                      {markedDates[selectedDateDetails].lectureDetails.endtime}
                    </Paragraph>
                    <Paragraph>
                      Teacher:{' '}
                      {
                        markedDates[selectedDateDetails].lectureDetails
                          .teachername
                      }
                    </Paragraph>
                    <Paragraph>
                      Subject:{' '}
                      {markedDates[selectedDateDetails].lectureDetails.subject}
                    </Paragraph>
                    <Paragraph>
                      Grade:{' '}
                      {markedDates[selectedDateDetails].lectureDetails.grade}
                    </Paragraph>
                    <Paragraph>
                      Classroom:{' '}
                      {
                        markedDates[selectedDateDetails].lectureDetails
                          .classroom_name
                      }
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default DashboardScreen;
