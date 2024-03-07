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
import {DASHBOARD, EDIT, EYE, VIEW} from '../utils/Imagepath';
import {exportDataToExcel} from '../utils/fileSave';
const Student = ({route, navigation}) => {
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

  const handleViewPress = id => {
    // console.log(date);
    navigation.navigate('StudentDetails', {
      // data: foundData,
      id: id,
    });
  };
  const handleAssignmentPress = id => {
    navigation.navigate('Assignment', {
      // data: foundData,
      id: id,
    });
  };
  const handleEditPress = id => {
    navigation.navigate('StudentEdit', {
      // data: foundData,
      id: id,
    });
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        // Handle the back press (navigate to the previous screen)
        navigation.navigate('Dashboard');
        return true; // Prevent default behavior (exiting the app)
      },
    );

    const fetchStudent = async () => {
      try {
        const storedAccessToken = await Storage.getAccessToken();

        if (!storedAccessToken) {
          console.error('Access token not found in AsyncStorage');
          return;
        }
        setLoading(true);

        const response = await fetch(
          'https://justconcepts.in/app/justconceptapi/public/api/studentList',
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
          Student List
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View>
          <View style={styles.main}>
            <View style={styles.container}>
              <View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                  // onPress={() => exportDataToExcel(result, 'studentList')}
                  >
                    <LinearGradient
                      colors={['#90caf9', '#047edf']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{borderRadius: 5}}>
                      <View
                        style={{
                          // backgroundColor: '#a347ff',
                          alignItems: 'center',
                          padding: 7,
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white'}}>Excel</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
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
                          alignItems: 'center',
                          padding: 7,
                          borderRadius: 5,
                        }}>
                        <Text style={{color: 'white'}}>PDF</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: -50,
                }}>
                <Text style={styles.black}> Search:</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  style={styles.input}
                  placeholder="Master Search"
                  placeholderTextColor={'#555'}
                />
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Sr No</Text>
                  <Text style={styles.headerCell}>Name</Text>
                  <Text style={styles.headerCell}>School</Text>
                  <Text style={styles.headerCell}>Grade and Section</Text>
                  <Text style={styles.headerCell}>Enrollment No</Text>
                  <Text style={styles.headerCell}>Board</Text>
                  <Text style={styles.headerCell}>Mobile Number</Text>
                  <Text style={styles.headerCell}>Action</Text>
                </View>

                {result.length > 0 &&
                  result.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.cell}>{index + 1}</Text>
                      <Text style={styles.cell}>{item.name}</Text>
                      <Text style={styles.cell}>{item.school}</Text>
                      <Text style={styles.cell}>{item.grade_and_section}</Text>
                      <Text style={styles.cell}>{item.grade_and_section}</Text>
                      <Text style={styles.cell}>{item.board}</Text>
                      <Text style={styles.cell}>{item.mobile_number}</Text>
                      <View
                        style={[
                          styles.cell,
                          {
                            flexDirection: 'row',
                            marginLeft: 5,
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={() => handleViewPress(item.id)}>
                          <Image
                            source={EYE}
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                              tintColor: '#007BFF',
                              marginLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleEditPress(item.id)}>
                          <Image
                            source={EDIT}
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                              tintColor: '#0F9D0F',
                              marginLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleAssignmentPress(item.id)}>
                          <Image
                            source={VIEW}
                            style={{
                              width: 20,
                              height: 20,
                              resizeMode: 'contain',
                              tintColor: '#0F9D0F',
                              marginLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
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
    borderColor: '#EBEDF2',
    backgroundColor: '#FFF',
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

export default Student;
