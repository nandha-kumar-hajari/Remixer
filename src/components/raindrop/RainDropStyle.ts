import {customWidth} from './../Styles';
import {ImageStyle, StyleSheet, ViewStyle} from 'react-native';

interface Style {
  touchableViewStyle: ViewStyle;
  iconStyle: ImageStyle;
}

export default StyleSheet.create<Style>({
  touchableViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: customWidth(60),
    width: customWidth(60),
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#fff',
    shadowColor: '#EAEAEA',
    shadowOpacity: 14,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
  },
  iconStyle: {
    height: customWidth(30),
    width: customWidth(30),
    position: 'absolute',
    zIndex: 3,
  },
});
