import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeScreen from './src/screens/HomeScreen';

export const App: React.FC = () => {


  useEffect(() => {
  }, []);
  return <HomeScreen />;
};

export default App;
