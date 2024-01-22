/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MENU, MENULEFT} from '../utils/Imagepath';

const Header = ({title, onPress}) => {
  return (
    <LinearGradient
      colors={['#febf00', '#c21800']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 60,
        zIndex: 3,
      }}>
      {/* <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: 'white',
        }}>
        {title}
      </Text> */}

      <Image
        source={MENULEFT}
        style={{
          height: 30,
          width: 30,
          resizeMode: 'contain',
        }}
      />
      <TouchableOpacity
        style={{
          height: 40,
          width: '7%',
          justifyContent: 'flex-end',
        }}
        onPress={onPress}>
        <Image
          style={{
            height: 30,
            width: 30,
            resizeMode: 'contain',
            tintColor: 'white',
          }}
          source={MENU}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Header;
