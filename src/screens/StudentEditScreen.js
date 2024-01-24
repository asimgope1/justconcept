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
import {DASHBOARD, EYE, VIEW} from '../utils/Imagepath';

const StudentEdit = ({route, navigation}) => {
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
        navigation.navigate('Dashboard', 94);
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
          'https://justconcepts.in/app/justconceptapi/public/api/studentinfo/' +
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
    fetchStudent();
  }, []);

  const updateStudent = async () => {
    try {
      const storedAccessToken = await Storage.getAccessToken();

      if (!storedAccessToken) {
        console.error('Access token not found in AsyncStorage');
        return;
      }

      setLoading(true);

      // Your payload

      const response = await fetch(
        `https://justconcepts.in/app/justconceptapi/public/api/studentupdate/${id}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${storedAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result),
        },
      );

      // Log the response text
      const responseText = await response.text();
      console.log('Response Text:', responseText);

      if (!response.ok) {
        console.error('Failed to fetch lectures:', response.status);
        return;
      }

      navigation.navigate('Student', {
        id: id, // Change this to the correct ID
      });
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call the function
  // updateStudent();

  const handleUpdate = () => {
    updateStudent();
  };
  const handleChange = (name, value) => {
    setResult({...result, [name]: value});
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F2EDF3',
      }}>
      <Header onPress={() => navigation.openDrawer()} />

      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {' '}
          Student Edit
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View>
          <View style={[styles.card, styles.shadowProp]}>
            <View style={styles.container}>
              <View style={styles.main}>
                <Text style={styles.title}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Master Search"
                  value={result.name}
                  onChangeText={value => handleChange('name', value)}
                />
              </View>
              <View style={styles.main}>
                <Text style={styles.title}>Primary Mobile Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Master Search"
                  value={result.mobile_number}
                  onChangeText={value => handleChange('mobile_number', value)}
                />
              </View>
              <View style={styles.main}>
                <Text style={styles.title}>Father Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Master Search"
                  value={result.father_name}
                  onChangeText={value => handleChange('father_name', value)}
                />
              </View>
              <View style={styles.main}>
                <Text style={styles.title}>Mother Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Master Search"
                  value={result.mother_name}
                  onChangeText={value => handleChange('mother_name', value)}
                />
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View></View>
                <View style={styles.buttons}>
                  <TouchableOpacity onPress={() => handleUpdate()}>
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
                        <Text style={{color: 'white'}}>Submit</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttons}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Student', {
                        id: id,
                      })
                    }>
                    <View
                      style={{
                        backgroundColor: 'grey',
                        padding: 7,
                        borderRadius: 5,
                        // backgroundColor: '#a347ff',
                      }}>
                      <Text style={{color: 'white'}}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View></View>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    // width: '100%',
    marginVertical: 10,
    marginLeft: 10,
    padding: 10,
    marginRight: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
    marginBottom: -10,
  },
  input: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    fontSize: 14,
  },
  main: {
    justifyContent: 'left',
    alignItems: 'left',
  },
  buttons: {
    width: 60,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentEdit;
