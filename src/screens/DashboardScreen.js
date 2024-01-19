/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
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
    if (markedDates[date.dateString]) {
      const selectedDateDetail = allDates.find(
        selectedDate => selectedDate === date.dateString,
      );
      setSelectedDateDetails(selectedDateDetail);
    } else {
      const selectedDateDetail = allDates.find(
        selectedDate => selectedDate === date.dateString,
      );
      setSelectedDateDetails(selectedDateDetail);
    }
  };

  const handleScreenTap = () => {
    setSelectedDateDetails(null);
  };

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <SafeAreaView>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

        <ScrollView>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>DashboardScreen: {console.log('objects', markedDates)}</Text>
            <Calendar
              style={{
                borderWidth: 1,
                margin: 50,
                borderColor: 'gray',
                height: 400,
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

            {selectedDateDetails && (
              <View style={{marginTop: 20, marginBottom: 10}}>
                <Card style={{width: 350}}>
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
