import {
  View,
  Text,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Style from './HomeScreenStyles';
import {WaveAnimation, BlueWave} from '../assets/animations';
import Lottie from 'lottie-react-native';
import {customWidth, customHeight} from '../components/Styles';
import {Cloud, RainBow, RainDrop, Thunder} from '../components';

export const HomeScreen: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);

  const requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Remixer',
          message: 'App needs access to your Audio Files... ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setShowButtons(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    requestToPermissions();
  }, []);
  return (
    // Adding safe area view to eliminate issues when screen is viewed on devices with different kind of notches
    <SafeAreaView style={Style.mainViewStyle}>
      <>
        {showButtons ? (
          <View style={Style.bottomViewStyle}>
            <RainDrop />
            <Cloud/>
            <Thunder/>
            <RainBow/>
          </View>
        ) : null}
      </>

      {/* Lottieview is used for smooth,performant and high quality animations */}
      <Lottie source={WaveAnimation} autoSize autoPlay loop />
    </SafeAreaView>
  );
};

export default HomeScreen;
