import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const customWidth = (wd:any) => {
  return Math.floor((wd * windowWidth) / 465);
};
export const customHeight = (hg:any) => {
  return Math.floor((hg * windowHeight) / 1037);
};
export const shadowStyles = {
  shadowColor: '#EAEAEA',
  shadowOpacity: 14,
  shadowRadius: 5,
  shadowOffset: {
    width: 2,
    height: 2,
  },
  elevation: 2,
};
