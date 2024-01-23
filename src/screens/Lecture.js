/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Storage from '../utils/Storage';
import React, {useEffect} from 'react';
import Header from '../components/Header';

const Lecture = ({route, navigation}) => {
  const id = route.params.id;

  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const {
  //   classroom,
  //   classroom_name,
  //   grade,
  //   teachername,
  //   subject,
  //   starttime,
  //   classroomTitle,
  //   endtime,
  //   weekdays,
  //   fileUpload,
  //   repeat,
  // } = route.params.data[0].lectureDetails;
  // console.log('inside', id);
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const storedAccessToken = await Storage.getAccessToken();

        if (!storedAccessToken) {
          console.error('Access token not found in AsyncStorage');
          return;
        }
        setLoading(true);

        const response = await fetch(
          'https://justconcepts.in/app/justconceptapi/public/api/lectureinfo/' +
            id,
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

        if (result.data) {
          setResult(result.data);
        } else {
          console.error('Data not available or empty array.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDates();
  }, [id]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header onPress={() => navigation.openDrawer()} />
      {/* <View
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
      </View> */}

      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {' '}
          Lecture Details
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.title}>Teacher</Text>
            <Text style={styles.cell}>{result?.teachername}</Text>
            <Text style={styles.title}>Grade</Text>
            <Text style={styles.cell}>{result.grade}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Subject</Text>
            <Text style={styles.cell}>{result?.subject}</Text>
            <Text style={styles.title}>Date</Text>
            <Text style={styles.cell}>{result.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Time</Text>
            <Text style={styles.cell}>
              {result.starttime + '-' + result.endtime}
            </Text>
            <Text style={styles.title}>Classroom</Text>
            <Text style={styles.cell}>{result.classroom_name}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Repeat</Text>
            <Text style={styles.cell}>
              {result.repeat != '0' ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.title}>Classroom Title</Text>
            <Text style={styles.cell}>{result.classroomTitle}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Weekdays</Text>
            <Text style={styles.cell}>{result.weekdays}</Text>
            <Text style={styles.title}>File Download</Text>
            <Text style={styles.cell}>
              {result.fileUpload ? result.fileUpload : 'No file'}
            </Text>
          </View>
          {/* Add more rows as needed */}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#f2edf3'},
  head: {height: 40, backgroundColor: '#000000'},
  text: {margin: 6, color: 'red'},
  table: {
    // borderWidth: 1,
    // borderColor: 'black',
    marginBottom: 10,
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2EDF3',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    padding: 10,
    // borderWidth: 1,
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    // borderColor: 'black',
  },
  title: {
    flex: 1,
    padding: 10,
    // borderWidth: 1,
    width: 50,
    height: 50,
    //make it bold
    borderRightWidth: 1,
    borderColor: '#ebedf2',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
});

export default Lecture;
