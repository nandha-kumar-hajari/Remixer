import { customHeight, customWidth } from './../components/Styles';
import {
    StyleSheet,
    TextStyle,
    ViewStyle,
    ImageStyle,
  } from 'react-native';

  
  interface Style{
    mainViewStyle:ViewStyle,
    bottomViewStyle:ViewStyle
  }

  export default StyleSheet.create<Style>({
    mainViewStyle:{
        flex:1,
        backgroundColor:'#f2f2f2'
    },
    bottomViewStyle:{
      position: 'absolute',
      bottom: 0,
      zIndex:2,
      height: customHeight(500),
      width: customWidth(470),
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'flex-end',
      // backgroundColor:'red',
      paddingBottom:customWidth(40),
    }
  })

