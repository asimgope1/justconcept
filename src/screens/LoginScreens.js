/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Storage from '../utils/Storage';
import {LOGO} from '../utils/Imagepath';

const LoginScreen = ({onLogin, onLogout}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Your login logic here

      const result = 'login success'; // Replace with your actual login response

      // Store the login response and authenticated status in AsyncStorage
      await Storage.setLoginResponse(result);
      await Storage.setAuthenticatedStatus(true);

      // Check the result or handle it as needed
      console.log(result);

      // Assuming successful login, you can call onLogin to update authentication status
      onLogin();
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const handleLogout = async () => {
    await Storage.clearStorage();

    onLogout(); // Implement onLogout function to update authentication status
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        source={LOGO}
        style={{
          width: 200,
          height: 200,
          resizeMode: 'contain',
          marginBottom: 20,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.boldText}>Hello! let's get started</Text>
        <Text style={styles.regularText}>Sign in to continue.</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="grey"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>SignIn</Text>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 20,
            color: 'black',
          }}>
          Forgot Password ?
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textContainer: {
    width: '100%',
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    marginBottom: 5,
  },
  regularText: {
    fontSize: 15,
    color: 'black',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'black',
  },
  button: {
    width: '100%',
    backgroundColor: '#a347ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
