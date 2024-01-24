/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Storage from '../utils/Storage';
import React, {useEffect} from 'react';
import Header from '../components/Header';

const AssignmentDetails = ({route, navigation}) => {
  const id = route.params.id;

  console.log(id);
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
          'https://justconcepts.in/app/justconceptapi/public/api/assignmentInfo/' +
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
          setResult(result.data.data);
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

      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
          {' '}
          Assignment Details
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.title}>Assignment Title</Text>
            <Text style={styles.cell}>{result?.title}</Text>
            <Text style={styles.title}>Marking System</Text>
            <Text style={styles.cell}>{result.marking_system}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>submission</Text>
            <Text style={styles.cell}>
              {result?.submission == '0' ? 'Not Required' : 'Required'}
            </Text>
            <Text style={styles.title}>Total Marking </Text>
            <Text style={styles.cell}>{result.total_marking}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Start Date</Text>
            <Text style={styles.cell}>{result.start_date}</Text>
            <Text style={styles.title}>Due Date </Text>
            <Text style={styles.cell}>{result.due_date}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Grade</Text>
            <Text style={styles.cell}>{result.grade}</Text>
            <Text style={styles.title}>Subject </Text>
            <Text style={styles.cell}>{result.subject}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>File upload</Text>
            <Text style={styles.cell}>{result.image_file}</Text>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.cell}>{result.description}</Text>
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
    borderRightWidth: 1,
    borderColor: '#ebedf2',
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

export default AssignmentDetails;
