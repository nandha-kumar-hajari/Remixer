
import React from 'react';
import { LogBox } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
LogBox.ignoreAllLogs()

export const App: React.FC = () => {

  return <HomeScreen />;
};

export default App;
