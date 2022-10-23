import {customHeight, customWidth} from './../components/Styles';
import {StyleSheet, TextStyle, ViewStyle, ImageStyle} from 'react-native';

interface Style {
  mainViewStyle: ViewStyle;
  bottomViewStyle: ViewStyle;
  iconStyle: ViewStyle;
  titleStyle: TextStyle;
  cloudViewWrap: ViewStyle;
}

export default StyleSheet.create<Style>({
  mainViewStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  bottomViewStyle: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    height: customHeight(500),
    width: customWidth(470),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: customWidth(40),
  },
  iconStyle: {},
  titleStyle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#2F333B',
    alignSelf: 'center',
    paddingTop: customHeight(200),
    position: 'absolute',
    zIndex: 3,
  },
  cloudViewWrap: {
    zIndex: 2,
    alignSelf: 'center',
    position: 'absolute',
    height: customWidth(420),
    width: customWidth(380),
  },
});
