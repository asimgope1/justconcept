/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper';
import Header from '../components/Header';
import Storage from '../utils/Storage';
import {DASHBACK} from '../utils/Imagepath';

const CalendarScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth() + '');
  function getCurrentMonth() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed in JavaScript dates
    const date = currentDate.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  }

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
          dotColor: 'none',
          customStyles: {
            container: {
              backgroundColor: 'green',
              borderRadius: 0,
              height: 0.1 * Dimensions.get('window').height,
              width: 0.127 * Dimensions.get('window').width,
            },
            text: {
              color: 'white',
            },
          },
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

  const handleCustomButtonPress = () => {
    console.log(getCurrentMonth());
    setCurrentMonth(getCurrentMonth() + '');
    // setCurrentMonth('2024-01-01');
  };
  useEffect(() => {
    setCurrentMonth();
  }, [currentMonth]);

  const CustomCalendarHeader = ({date, onPressCustomButton}) => {
    const formattedDate = date.toString('MMMM yyyy');
    return (
      <View
        style={{
          alignItems: 'left',

          marginLeft: -0.75 * Dimensions.get('window').width, //-250
          // marginLeft: -250,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginTop: 4,
              marginLeft: -2,
              width: 119,
            }}>
            {formattedDate}
          </Text>

          <View
            style={{
              backgroundColor: '#2c3e50',
              // padding: 10,
              height: 30,
              marginRight: 2,
              width: 47,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Month</Text>
          </View>
          <TouchableOpacity onPress={handleCustomButtonPress}>
            <View
              style={{
                backgroundColor: '#2c3e50',
                // padding: 10,
                height: 30,
                width: 47,

                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>Today</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* You can add more buttons or customize the layout as needed */}
      </View>
    );
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
        {/* <ImageBackground
          source={DASHBACK}
          style={{flex: 1, resizeMode: 'cover'}}> */}
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
              style={styles.calendar}
              theme={{
                backgroundColor: '#f2edf3',
                calendarBackground: '#f2edf3',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#DDDDDD',
                textMonthColor: '#007BFF',
                dayTextColor: '#2d4150',
                weekTextColor: '#007BFF',
                textDisabledColor: '#d9e',
                'stylesheet.calendar.header': {
                  week: {
                    marginTop: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    //color : '#007BFF'
                    color: '#007BFF',
                    borderWidth: 1,
                    borderColor: '#DDDDDD',
                  },
                },
                'stylesheet.calendar.main': {
                  container: {
                    // borderWidth: 1,
                    borderColor: '#DDDDDD',
                    borderRadius: 0,
                    overflow: 'hidden',
                  },
                  dayContainer: {
                    borderColor: '#DDDDDD',
                    borderWidth: 1,
                    flex: 1,
                    // padding: 10,
                    width: 40,
                    height: 0.1 * Dimensions.get('window').height,
                  },
                  emptyDayContainer: {
                    borderColor: '#DDDDDD',
                    borderWidth: 1,
                    flex: 1,
                    // padding: 10,
                  },
                  today: {
                    backgroundColor: 'red',
                    borderRadius: 0, // Set to 0 for a square or adjust as needed
                  },
                  week: {
                    marginTop: 0,
                    marginBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    color: '#007BFF',
                  },
                },
              }}
              markingType="custom"
              markedDates={markedDates}
              renderHeader={date => (
                <CustomCalendarHeader
                  date={date}
                  onPressCustomButton={handleCustomButtonPress}
                />
              )}
              renderArrow={direction => {
                if (direction === 'left') {
                  return (
                    // <TouchableOpacity onPress={handleLeftArrowPress}>
                    <View
                      style={{
                        backgroundColor: '#2c3e50',
                        // padding: 10,
                        height: 30,
                        width: 45,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 0.58 * Dimensions.get('window').width, //150
                      }}>
                      <Text style={{fontSize: 20, color: 'white'}}>{'<'}</Text>
                    </View>
                    // </TouchableOpacity>
                  );
                } else {
                  return (
                    // <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: '#2c3e50',
                        // padding: 10,
                        height: 30,
                        width: 45,
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: -0.05 * Dimensions.get('window').width, //-50
                      }}>
                      <Text style={{fontSize: 20, color: 'white'}}>{'>'}</Text>
                    </View>
                  );
                }
              }}
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
        {/* </ImageBackground> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f2edf3',
    height: 1 * Dimensions.get('window').height,
    width: 1 * Dimensions.get('window').width,
  },
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
    // borderWidth: 1,
    borderBottomWidth: 1,

    // borderRadius: 5,
    backgroundColor: '#f2edf3',
    margin: 0.03 * Dimensions.get('window').width,
    marginTop: 0.08 * Dimensions.get('window').width,
    borderColor: '#DDDDDD',
    height: 0.61 * Dimensions.get('window').height,
    width: 0.9 * Dimensions.get('window').width,
  },
  cardContainer: {
    marginTop: 0.05 * Dimensions.get('window').height,
    marginBottom: 0.01 * Dimensions.get('window').height,
    alignItems: 'center',
  },
  card: {
    width: 0.8 * Dimensions.get('window').width,
  },
  box: {},
});

export default CalendarScreen;
