/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Image,
  BackHandler,
} from 'react-native';
import Storage from '../utils/Storage';
import React, {useEffect} from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {DASHBOARD} from '../utils/Imagepath';

const AssignmentFinal = ({route, navigation}) => {
  const id = route.params.id;

  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const data = [
    // Your data goes here
    {
      srNo: '1',
      name: 'John Doe',
      school: 'Example School',
      gradeAndSection: '10A',
      enrollmentNo: '12345',
      board: 'State',
      mobileNumber: '123-456-7890',
    },
    {
      srNo: '1',
      name: 'John Doe',
      school: 'Example School',
      gradeAndSection: '10A',
      enrollmentNo: '12345',
      board: 'State',
      mobileNumber: '123-456-7890',
    },
    // Add more data as needed
  ];
  useEffect(() => {
    console.log('object', navigation.navigate);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle the back press (navigate to the previous screen)
        navigation.navigate('Assignment', 94);
        return true; // Prevent default behavior (exiting the app)
      },
    );

    const fetchStudent = async () => {
      try {
        // ... (Your existing code for fetching data)
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();

    // Cleanup the event listener on component unmount
    return () => backHandler.remove();
  }, [navigation, id]);
  const handleViewPress = id => {
    // console.log(date);
    navigation.navigate('AssignmentDetails', {
      // data: foundData,
      id: id,
    });
  };
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const storedAccessToken = await Storage.getAccessToken();

        if (!storedAccessToken) {
          console.error('Access token not found in AsyncStorage');
          return;
        }
        setLoading(true);

        const response = await fetch(
          'https://justconcepts.in/app/justconceptapi/public/api/stdassignmentstatus/' +
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
          // console.log(result.data);
        } else {
          console.error('Data not available or empty array.');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header onPress={() => navigation.openDrawer()} />

      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {' '}
          Assignment Status
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View>
          <Text>Assignment Status</Text>

          <View style={styles.main}>
            <View style={styles.container}>
              <View>
                <View style={styles.buttons}>
                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#90caf9', '#047edf']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 5}}>
                      <View
                        style={{
                          // backgroundColor: '#a347ff',
                          padding: 7,
                          borderRadius: 5,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{color: 'white'}}>Pdf</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Sr No</Text>
                  <Text style={styles.headerCell}>Student Name</Text>

                  <Text style={styles.headerCell}>Grade </Text>
                  <Text style={styles.headerCell}>Submitted On</Text>
                  <Text style={styles.headerCell}>Status</Text>
                  <Text style={styles.headerCell}>Teacher Remark</Text>
                  <Text style={styles.headerCell}>Min Scored Marks</Text>
                  <Text style={styles.headerCell}>Avg Scored Marks</Text>
                  <Text style={styles.headerCell}>Max Scored Marks</Text>
                  <Text style={styles.headerCell}>Marks Scored</Text>
                </View>

                {result?.data?.length > 0 &&
                  result?.data.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.cell}>{index + 1}</Text>
                      <Text style={styles.cell}>{item.student_name}</Text>

                      <Text style={styles.cell}>{item.grade}</Text>
                      <Text style={styles.cell}>{item.submitted_on}</Text>
                      <Text style={styles.cell}>{item.submit_status}</Text>
                      <Text style={styles.cell}>{item.teacher_remark}</Text>
                      <Text style={styles.cell}>{result.min_marks_scored}</Text>
                      <Text style={styles.cell}>
                        {result.average_marks_scored}
                      </Text>
                      <Text style={styles.cell}>{result.max_marks_scored}</Text>
                      <Text style={styles.cell}>{item.marks_scored}</Text>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    flexDirection: 'column',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    backgroundColor: '#f2edf3',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 80,
    color: 'black',
  },

  cell: {
    flex: 1,
    width: 80,
    textAlign: 'center',
    color: 'black',
  },
  black: {
    color: 'black',
    fontSize: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
  main: {
    backgroundColor: 'white',
    margin: 10,
    // borderWidth: 1,
    width: 0.95 * Dimensions.get('window').width,
    height: 0.5 * Dimensions.get('window').height,
    padding: 10,
  },
  buttons: {
    width: 50,
    marginBottom: 5,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'black',
  },
});

export default AssignmentFinal;
