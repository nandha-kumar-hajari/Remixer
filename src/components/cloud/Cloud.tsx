import {View, Text, Image} from 'react-native';
import React from 'react';
import {customWidth} from '../Styles';
import {CloudIcon} from '../../assets/images';

export const Cloud: React.FC = () => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: customWidth(60),
        width: customWidth(60),
        borderRadius: 100,
      }}>
      <Image
        source={CloudIcon}
        style={{
          height: customWidth(30),
          width: customWidth(30),
          position: 'absolute',
          zIndex: 3,
        }}
      />
    </View>
  );
};
export default Cloud;
