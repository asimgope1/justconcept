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
  TouchableOpacity,
  Image,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Card, Title, Paragraph} from 'react-native-paper';
import Header from '../components/Header';
import Storage from '../utils/Storage';
import {DASHBOARD, IICON} from '../utils/Imagepath';
import LinearGradient from 'react-native-linear-gradient';

const DashboardScreen = ({navigation}) => {
  const [markedDates, setMarkedDates] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [lectureDetails, setLectureDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const {width, height} = Dimensions.get('window');
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
  useEffect(() => {
    fetchDates();
  }, []);
  const CustomArrows = ({onLeftPress, onRightPress}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={onLeftPress}>
        <View style={{backgroundColor: 'grey', padding: 10}}>
          <Text>{'<'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRightPress}>
        <View style={{backgroundColor: 'grey', padding: 10}}>
          <Text>{'>'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleLeftArrowPress = () => {
    // Implement your logic for left arrow press
    console.log('ss');
  };

  const handleRightArrowPress = () => {
    console.log('ss2222');
    // Implement your logic for right arrow press
  };

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
          Chem: 'purple',
          Bio: 'green',
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
            customStyles: {
              container: {
                backgroundColor: 'green',
                borderRadius: 0,
                height: 80,
                width: 40,
              },
            },
            selected: true,
            marked: true,
            dotColor,
            selectedColor: dotColor,
            lectureDetails: lecture,
          };
        });
        console.log(markedDatesData);
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
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          // position: 'absolute',
          // top: -30,
          // left: -150,
        }}>
        <TouchableOpacity onPress={handleCustomButtonPress}>
          <View
            style={{
              backgroundColor: '#2c3e50',
              // padding: 10,
              height: 40,
              width: 50,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Today</Text>
          </View>
        </TouchableOpacity>
        <Text style={{fontSize: 20, color: 'black'}}>{formattedDate}</Text>
        <View
          style={{
            backgroundColor: '#2c3e50',
            // padding: 10,
            height: 40,
            width: 50,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Month</Text>
        </View>
        {/* You can add more buttons or customize the layout as needed */}
      </View>
    );
  };

  const handleDayPress = date => {
    console.log(date);
    navigation.navigate('Lecture', {
      // data: foundData,
      id: date,
    });
  };

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        {/* <ImageBackground source={DASHBACK} style={styles.backgroundImage}> */}
        <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.mainContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#a347ff" />
            ) : (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <LinearGradient
                      colors={['#DA8CFF', '#9A55FF']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 5}}>
                      <View
                        style={{
                          // backgroundColor: '#a347ff',
                          padding: 7,
                          borderRadius: 5,
                        }}>
                        <Image
                          source={DASHBOARD}
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                            tintColor: 'white',
                          }}
                        />
                      </View>
                    </LinearGradient>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'black',
                        fontWeight: 'bold',
                        marginLeft: 5,
                      }}>
                      Dashboard
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',

                        marginLeft: 5,
                      }}>
                      Overview
                    </Text>
                    <Image
                      source={IICON}
                      style={{
                        width: 30,
                        height: 30,

                        resizeMode: 'contain',
                        tintColor: '#a347ff',
                      }}
                    />
                  </View>
                </View>
                <Calendar
                  current={currentMonth}
                  key={currentMonth}
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
                        height: 80,
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
                            height: 40,
                            width: 50,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 20}}>{'<'}</Text>
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
                            height: 40,
                            width: 50,
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 20}}>{'>'}</Text>
                        </View>
                      );
                    }
                  }}
                  dayComponent={({date}) => {
                    if (markedDates[date.dateString])
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            handleDayPress(
                              markedDates[date.dateString].lectureDetails.id,
                            )
                          }>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#f2edf3',
                            }}>
                            <Text
                              style={{
                                color: '#007BFF',
                              }}>
                              {date.day}
                            </Text>
                            <View
                              style={{
                                backgroundColor:
                                  markedDates[date.dateString].dotColor,
                                padding: 8,
                                marginTop: 5,
                                borderRadius: 3,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 12,
                                }}>
                                {
                                  markedDates[date.dateString].lectureDetails
                                    .grade
                                }
                                {console.log('state')}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    else
                      return (
                        <View
                          style={{
                            // justifyContent: 'center',
                            alignItems: 'center',
                            height: 80,
                            backgroundColor:
                              date.dateString ==
                              new Date().toLocaleDateString('en-CA')
                                ? '#F4EBD5'
                                : '#f2edf3',
                          }}>
                          <Text
                            style={{
                              color: '#007BFF',
                            }}>
                            {date.day}
                          </Text>
                        </View>
                      );
                  }}
                  onDayPress={handleDayPress}
                />
              </View>
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
    height: 0.71 * Dimensions.get('window').height,
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
});

export default DashboardScreen;
