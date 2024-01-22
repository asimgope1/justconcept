/* eslint-disable prettier/prettier */
import {View, Text} from 'react-native';
import React from 'react';
import Header from '../components/Header';

const Lecture = ({route, navigation}) => {
  const {date} = route.params.data[0];
  const {
    classroom,
    classroom_name,
    grade,
    teachername,
    subject,
    starttime,
    endtime,
    weekdays,
  } = route.params.data[0].lectureDetails;

  console.log('object', date);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header onPress={() => navigation.openDrawer()} />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            marginTop: 10,
            weight: 100,
          }}>
          <Text>Lectures</Text>
        </View>
        <View
          style={{
            height: '50%',
            weight: '80%',
            backgroundColor: 'white',
          }}>
          <View
            style={{
              height: '10%',
              weight: '100%',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                paddingLeft: 10,
              }}>
              Lecture Details
            </Text>
          </View>
          <View
            style={{
              height: '10%',
              weight: '100%',
            }}>
            <View
              style={{
                height: '90%',
                weight: '100%',
                alignItems: 'center',
                backgroundColor: '#f2edf3',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  alignItems: 'center',
                  paddingLeft: 25,
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  Teacher
                </Text>
              </View>
              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  alignItems: 'center',
                  paddingLeft: 25,
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  {teachername}
                </Text>
              </View>

              <View
                style={{
                  height: '10%',
                  width: 10,
                }}
              />

              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  alignItems: 'center',
                  paddingLeft: 25,
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  Grade
                </Text>
              </View>
              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  alignItems: 'center',
                  paddingLeft: 25,
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  {grade}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '90%',
                weight: '100%',
                alignItems: 'center',
                paddingLeft: 25,
                backgroundColor: '#f2edf3',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: '90%',
                  weight: '100%',

                  alignItems: 'center',
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  Subject
                </Text>
              </View>

              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  paddingLeft: 25,

                  alignItems: 'center',
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  {subject}
                </Text>
              </View>

              <View
                style={{
                  height: '10%',
                  width: 10,
                }}
              />

              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  paddingLeft: 25,
                  alignItems: 'center',
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  Date
                </Text>
              </View>
              <View
                style={{
                  height: '90%',
                  weight: '100%',
                  paddingLeft: 25,
                  alignItems: 'center',
                  backgroundColor: '#f2edf3',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'black',
                    paddingLeft: 10,
                  }}>
                  {date}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '90%',
                weight: '100%',
                alignItems: 'center',
                paddingLeft: 25,
                backgroundColor: '#f2edf3',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Time
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                {starttime} - {endtime}
              </Text>
              <View
                style={{
                  height: '10%',
                  width: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Classroom
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                {classroom}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Lecture;
