import {
  View,
  Text,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Style from './HomeScreenStyles';
import {WaveAnimation, BlueWave, RainAnimation} from '../assets/animations';
import Lottie from 'lottie-react-native';
import {Cloud, RainBow, RainDrop, Thunder} from '../components';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {customHeight, customWidth} from '../components/Styles';

type ContextType = {
  translateY: number;
};

export const HomeScreen: React.FC = () => {
  const [showButtons, setShowButtons] = useState(false);
  const translateY = useSharedValue(0);
  const [playCloudAnimation, setPlayCloudAnimation] = useState(false);
  const requestToPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Remixer',
          message: 'This App needs access to your save the audio files.Please enable it from settings.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setShowButtons(true);
      }
    } catch (err) {
      console.log("permission error",err);
    }
  };

  useEffect(() => {
    requestToPermissions();
  }, []);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateY.value ** 2);
      console.log('Distance moved', distance, translateY.value);
      if (translateY.value < -140) {
        translateY.value = withSpring(-140);
        console.log('Adjusted value', translateY.value);
      }
      if (translateY.value > 0) {
        translateY.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    //Main view is wrapped in gesture handler root view to support animated drag of button
    <GestureHandlerRootView
      style={Style.mainViewStyle}>
      <>
        <View style={Style.cloudViewWrap}>
          {/* Lottieview is used for smooth,performant and high quality animations */}
          <Lottie
            source={RainAnimation}
            autoPlay
            style={{marginLeft: -customWidth(22)}}
            loop
          />
          <Text style={Style.titleStyle}>Remixer</Text>
        </View>
        {/* Buttons will be only shown to the user when user gives the permission to save sound file to local storage */}
        {showButtons ? (
          <View style={Style.bottomViewStyle}>
            <PanGestureHandler onGestureEvent={panGestureEvent}>
              <Animated.View style={[rStyle]}>
                <RainDrop />
              </Animated.View>
            </PanGestureHandler>
            <Cloud />
            <Thunder />
            <RainBow />
          </View>
        ) : null}
      </>

      <Lottie source={WaveAnimation} autoSize autoPlay loop />
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
