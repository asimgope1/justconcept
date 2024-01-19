/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper'; // Import Card components
import Header from '../components/Header';
import Storage from '../utils/Storage';

const CalendarScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      // Retrieve access token from AsyncStorage
      const storedAccessToken = await Storage.getAccessToken();

      if (!storedAccessToken) {
        console.error('Access token not found in AsyncStorage');
        return;
      }

      // Set the access token in state
      setAccessToken(storedAccessToken);

      // Now you can use the access token in your API requests
      const response = await fetch(
        'https://justconcepts.in/app/justconceptapi/public/api/holidaysList',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error('Failed to fetch holidays:', response.status);
        return;
      }

      const apiResponseData = await response.json();
      setApiResponse(apiResponseData);

      // Process API response to mark dates
      const markedDatesData = {};
      apiResponseData.data.forEach(holiday => {
        markedDatesData[holiday.start_date] = {marked: true, dotColor: 'red'};
      });

      setMarkedDates(markedDatesData);
    } catch (error) {
      console.error('Error fetching holidays:', error.message);
    }
  };

  const handleDayPress = date => {
    setSelectedDate(date.dateString);

    // Log the selected date to check if it's set correctly
    console.log('Selected Date:', date.dateString);

    // Find the title for the selected date
    const selectedHoliday = apiResponse?.data.find(
      holiday => holiday.start_date === date.dateString,
    );

    // Log the selected holiday to check if it's found
    console.log('Selected Holiday:', selectedHoliday);

    if (selectedHoliday) {
      setSelectedTitle(selectedHoliday.holiday_title);
    } else {
      setSelectedTitle('No Holiday');
    }
  };

  // Reset selected date and title on screen tap
  const handleScreenTap = () => {
    setSelectedDate(null);
    setSelectedTitle('');
    // Dismiss the keyboard (if open)
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <Header title="Calendar" onPress={() => navigation.openDrawer()} />

        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
              markedDates={markedDates}
              onDayPress={handleDayPress}
            />

            {selectedDate && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Card style={{marginTop: 10, width: 350, marginBottom: 10}}>
                  <Card.Content>
                    <Title>{selectedDate}</Title>
                    <Paragraph>{selectedTitle}</Paragraph>
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

export default CalendarScreen;
