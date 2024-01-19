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
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
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
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {width, height} = Dimensions.get('window');

  // Move getTodayDate function declaration here
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    try {
      setLoading(true);
      const storedAccessToken = await Storage.getAccessToken();

      if (!storedAccessToken) {
        console.error('Access token not found in AsyncStorage');
        return;
      }

      setAccessToken(storedAccessToken);

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
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDayPress = date => {
    setSelectedDate(date.dateString);

    const selectedHoliday = apiResponse?.data.find(
      holiday => holiday.start_date === date.dateString,
    );

    if (selectedHoliday) {
      setSelectedTitle(selectedHoliday.holiday_title);
    } else {
      setSelectedTitle('No Holiday');
    }
  };

  const handleScreenTap = () => {
    setSelectedDate(null);
    setSelectedTitle('');
    Keyboard.dismiss();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDates();
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <ImageBackground
          source={BACKGROUND}
          style={{flex: 1, resizeMode: 'cover'}}>
          <Header title="Calendar" onPress={() => navigation.openDrawer()} />

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                  margin: 0.05 * width,
                  marginTop: 0.15 * width,
                  borderColor: 'gray',
                  height: 0.45 * height,
                  width: 0.8 * width,
                }}
                theme={{
                  backgroundColor: 'transparent',
                  calendarBackground: 'white',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00adf5',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e',
                }}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                current={getTodayDate()} // Set the initial date
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
