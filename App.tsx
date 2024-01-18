// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import Storage from './src/utils/Storage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedAuthentication = await Storage.getAuthenticatedStatus();
      setIsAuthenticated(storedAuthentication);
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <DrawerNavigator />
      ) : (
        <AuthNavigator onLogin={() => setIsAuthenticated(true)} />
      )}
    </NavigationContainer>
  );
};

export default App;
