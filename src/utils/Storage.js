/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LOGIN_RESPONSE: 'loginResponse',
  AUTHENTICATED: 'authenticated',
};

const Storage = {
  setLoginResponse: async response => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LOGIN_RESPONSE, response);
    } catch (error) {
      console.error('Error setting login response in AsyncStorage:', error);
    }
  },

  getLoginResponse: async () => {
    try {
      const response = await AsyncStorage.getItem(STORAGE_KEYS.LOGIN_RESPONSE);
      return response;
    } catch (error) {
      console.error('Error getting login response from AsyncStorage:', error);
      return null;
    }
  },

  setAuthenticatedStatus: async status => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AUTHENTICATED, status.toString());
    } catch (error) {
      console.error(
        'Error setting authenticated status in AsyncStorage:',
        error,
      );
    }
  },

  getAuthenticatedStatus: async () => {
    try {
      const status = await AsyncStorage.getItem(STORAGE_KEYS.AUTHENTICATED);
      return status === 'true'; // Convert to boolean
    } catch (error) {
      console.error(
        'Error getting authenticated status from AsyncStorage:',
        error,
      );
      return false;
    }
  },

  clearStorage: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.LOGIN_RESPONSE);
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTHENTICATED);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  },
};

export default Storage;
