/* eslint-disable prettier/prettier */
import {View, Text, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {Calendar} from 'react-native-calendars';
import Storage from '../utils/Storage';

const DashboardScreen = ({navigation}) => {
  const [selected, setSelected] = useState({});
  const [allDates, setAllDates] = useState([]);
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);

  useEffect(() => {
    fetchDates();
  }, []);

  const fetchDates = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDdiZWJiNjExYWMzZDY1MTkyM2UzOWQyYTU5NDE5NjdiMWE0MmQyZWQyMzQzMTNmYTBhMWJlZDAwMmUyN2FlNjBjZTljODM5Mzk1MDAxMjEiLCJpYXQiOjE3MDU1Njk3NDEuODAxNjU2MDA3NzY2NzIzNjMyODEyNSwibmJmIjoxNzA1NTY5NzQxLjgwMTY1NzkxNTExNTM1NjQ0NTMxMjUsImV4cCI6MTczNzE5MjE0MS43OTgyMDQ4OTg4MzQyMjg1MTU2MjUsInN1YiI6IjEwOCIsInNjb3BlcyI6W119.xACvAWbCGGFYN_tmzGdFJfLltbN8AXewaojaMCy3rim27oa6D44l3cD5iBWvIHrbI7jwfz4BC3cHgLfcFWDhXNRopGnjWJSDCrBEpg3aNGosRdYSMSxrQWDObKfMTnxfwf443YtYBhpZUlMMmoxE2SdYPtbgRO7ib3sGiEqaNpoUwJ2FyI3kbwB2WtGIXR_29iAbQpeXRGlVK_ZzipCH6u-TpG_VJvntUnV32waQKxfks97f_YegpHouwiKK020X7MVMA644cLFxmHxonx_I7f3NI5pGaTXaxWBqYbLV1fhjqGZWC-INPe90CCihE4J8U_tbwWDQbz5D5_lzpSvkXX10Jn1aDX-JgAYbT3Gf2uL4_WSvvDg3mE-v-6_vKa-zA1TKiYBDPt3X8iEKwMM6-tU2l0X2rpmPbrNEhQt-iDPEP8GTzDqNf1qukpkTaSO7DQNTOb_5Arxs-QKHD79QdnHh6vTChNg27yLmPSof4dzRKsxzkbuib5iCY3FQocwDhsmxTUa3ea1ae6bb05pMaKLApl2ht1KNWGKOXx-16qnXbwt2mKf74kjZH88DRP2DwzrBosIUaliPI99Gux1YyHKwMf1xGKS52sQbl8M2NJAjlBspNS_IheVxnL58UKOMaVmogBsA2cB48yD5Y29eweMvJIfKuF-cD_9O-5GaSMs',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'https://justconcepts.in/app/justconceptapi/public/api/lectureList',
        requestOptions,
      );

      const result = await response.json();
      console.log('object', result);

      if (result.data && result.data.length > 0) {
        const dates = result.data.map(lecture => lecture.date);
        setAllDates(dates);
        setSelected({
          ...selected,
          ...dates.reduce((acc, date) => {
            acc[date] = {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: 'blue',
            };
            return acc;
          }, {}),
        });
      } else {
        console.error('Data not available or empty array.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleLogout = async () => {
    await Storage.clearStorage();
    await Storage.setAuthenticatedStatus(false);

    navigation.navigate('Login');
  };

  const handleDayPress = day => {
    // If the selected date is pressed again, show additional details
    if (selected[day.dateString]) {
      const selectedDateDetail = allDates.find(date => date === day.dateString);
      setSelectedDateDetails(selectedDateDetail);
    } else {
      // Retrieve additional details for the selected date and update the state
      const selectedDateDetail = allDates.find(date => date === day.dateString);
      setSelectedDateDetails(selectedDateDetail);
      setSelected({
        [day.dateString]: {
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: 'blue',
        },
      });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <Header title="Dashboard" onPress={() => navigation.openDrawer()} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* Main Content of DashboardScreen */}
        <Text>DashboardScreen: {console.log('object', selected)}</Text>
        <Calendar
          style={{
            borderWidth: 1,
            margin: 50,
            borderColor: 'gray',
            height: 350,
            width: 350,
          }}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e',
          }}
          markedDates={selected}
          onDayPress={day => handleDayPress(day)}
        />
        {/* Display selected date details */}
        {selectedDateDetails && (
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Selected Date Details:
            </Text>
            <Text>Date: {selectedDateDetails}</Text>
            {/* Add more details as needed */}
          </View>
        )}
        {/* Display all dates */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            margin: 20,
            color: 'black',
          }}>
          All Dates: {JSON.stringify(allDates)}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
