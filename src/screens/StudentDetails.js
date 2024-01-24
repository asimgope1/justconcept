/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Storage from '../utils/Storage';
import React, {useEffect} from 'react';
import Header from '../components/Header';

const StudentDetails = ({route, navigation}) => {
  const id = route.params.id;

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
          Student Details
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#a347ff" />
      ) : (
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.cell}>{result?.name}</Text>
            <Text style={styles.title}>School</Text>
            <Text style={styles.cell}>{result.school}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Grade And Section</Text>
            <Text style={styles.cell}>{result?.grade_and_section}</Text>
            <Text style={styles.title}>Enrollment No </Text>
            <Text style={styles.cell}>{result.enrolment_no}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Board</Text>
            <Text style={styles.cell}>{result.board}</Text>
            <Text style={styles.title}>Agreed Fees </Text>
            <Text style={styles.cell}>{result.agreed_fees}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Agreed Installments Breakup</Text>
            <Text style={styles.cell}>{result.agreed_installments}</Text>
            <Text style={styles.title}>Mobile Number </Text>
            <Text style={styles.cell}>{result.mobile_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.cell}>{result.email}</Text>
            <Text style={styles.title}>Gender</Text>
            <Text style={styles.cell}>{result.gender}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Status</Text>
            <Text style={styles.cell}>
              {result.status == '1' ? 'Active' : 'Inactive'}
            </Text>
            <Text style={styles.title}>Father Name</Text>
            <Text style={styles.cell}>{result.father_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Father Phone</Text>
            <Text style={styles.cell}>{result.father_phone}</Text>
            <Text style={styles.title}>Father Email</Text>
            <Text style={styles.cell}>{result.father_email}</Text>
          </View>
          <View style={styles.row2}>
            <Text style={styles.title}>Mother Name</Text>
            <Text style={styles.cell}>{result.mother_name}</Text>
            <Text style={styles.title}>Mother Phone</Text>
            <Text style={styles.cell}>{result.mother_phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Mother Email</Text>
            <Text style={styles.cell}>{result.mother_email}</Text>
            <Text style={styles.title}></Text>
            <Text style={styles.cell}></Text>
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

export default StudentDetails;
