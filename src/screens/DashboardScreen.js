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
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper';
import Header from '../components/Header';
import Storage from '../utils/Storage';
import {DASHBACK} from '../utils/Imagepath';

const DashboardScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [lectureDetails, setLectureDetails] = useState({});
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await Storage.clearStorage();
    await Storage.setAuthenticatedStatus(false);

    navigation.navigate('Login');
  };

  const handleDayPress = date => {
    const selectedDateDetail = allDates.find(
      selectedDate => selectedDate === date.dateString,
    );

    setSelectedDateDetails(selectedDateDetail);
  };

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <ImageBackground source={DASHBACK} style={styles.backgroundImage}>
          <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View>
              {loading ? (
                <ActivityIndicator size="large" color="#a347ff" />
              ) : (
                <Calendar
                  style={styles.calendar}
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
                />
              )}

              {selectedDateDetails !== null && (
                <View style={styles.cardContainer}>
                  <Card style={styles.card}>
                    <Card.Content>
                      <Title>{selectedDateDetails}</Title>
                      {markedDates[selectedDateDetails] &&
                      markedDates[selectedDateDetails].lectureDetails ? (
                        // Display class details if the date is found in markedDates and lectureDetails is available
                        <>
                          <Paragraph>
                            Start Time:{' '}
                            {
                              markedDates[selectedDateDetails].lectureDetails
                                .starttime
                            }
                          </Paragraph>
                          <Paragraph>
                            End Time:{' '}
                            {
                              markedDates[selectedDateDetails].lectureDetails
                                .endtime
                            }
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
                            {
                              markedDates[selectedDateDetails].lectureDetails
                                .subject
                            }
                          </Paragraph>
                          <Paragraph>
                            Grade:{' '}
                            {
                              markedDates[selectedDateDetails].lectureDetails
                                .grade
                            }
                          </Paragraph>
                          <Paragraph>
                            Classroom:{' '}
                            {
                              markedDates[selectedDateDetails].lectureDetails
                                .classroom_name
                            }
                          </Paragraph>
                        </>
                      ) : (
                        // Display a message if no matching date or lecture details are found
                        <Paragraph>No class on this date.</Paragraph>
                      )}
                    </Card.Content>
                  </Card>
                </View>
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 0.03 * Dimensions.get('window').width,
    borderColor: 'gray',
    height: 0.45 * Dimensions.get('window').height,
    width: 0.8 * Dimensions.get('window').width,
  },
  cardContainer: {
    marginTop: 0.05 * Dimensions.get('window').height,
    marginBottom: 0.01 * Dimensions.get('window').height,
    alignItems: 'center',
  },
  card: {
    width: 0.8 * Dimensions.get('window').width,
  },
});

export default DashboardScreen;
