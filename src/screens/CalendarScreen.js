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
  ImageBackground, // Import ImageBackground component
  ActivityIndicator, // Import ActivityIndicator component
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper';
import Header from '../components/Header';
import Storage from '../utils/Storage';
import {BACKGROUND} from '../utils/Imagepath';

const CalendarScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading

  const {width, height} = Dimensions.get('window');

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

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
        markedDatesData[holiday.start_date] = {
          marked: true,
          dotColor: 'green',
        };
      });

      setMarkedDates(markedDatesData);
    } catch (error) {
      console.error('Error fetching holidays:', error.message);
    } finally {
      setLoading(false); // Set loading to false after API call is complete
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

        <ImageBackground
          source={BACKGROUND}
          style={{flex: 1, resizeMode: 'cover'}}>
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
                  borderRadius: 8,
                  margin: 0.03 * width,
                  borderColor: 'gray',
                  height: 0.45 * height,
                  width: 0.8 * width,
                }}
                theme={{
                  backgroundColor: 'transparent', // Set background color to transparent
                  calendarBackground: 'white', // Set calendar background color to transparent
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
                  <Card
                    style={{
                      marginTop: 10,
                      width: 0.8 * width,
                      marginBottom: 10,
                    }}>
                    <Card.Content>
                      <Title>{selectedDate}</Title>
                      <Paragraph>{selectedTitle}</Paragraph>
                    </Card.Content>
                  </Card>
                </View>
              )}

              {loading && (
                <ActivityIndicator
                  style={{marginTop: 20}}
                  size="large"
                  color="#a347ff"
                />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default CalendarScreen;
