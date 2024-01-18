/* eslint-disable prettier/prettier */
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/Header';
import {Calendar} from 'react-native-calendars';

const CalendarScreen = ({navigation}) => {
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

    fetch(
      'https://justconcepts.in/app/justconceptapi/public/api/holidaysList',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => console.log(JSON.stringify(result, null, 2)))
      .catch(error => console.log('error', error));
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <Header title="Calendar" onPress={() => navigation.openDrawer()} />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;
