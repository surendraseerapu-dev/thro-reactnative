import {StyleSheet} from 'react-native';
import {headingColor, subHeadingColor, red} from './Colors';

export const appStyle = StyleSheet.create({
  item: {
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  header: {
    padding: 20,
    fontSize: 24,
    backgroundColor: '#ddd',
  },
  footer: {
    padding: 20,
    fontSize: 24,
    backgroundColor: '#ddd',
  },
  textHeading: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Nunito-Bold',
    color: headingColor,
  },
  textSubHeading: {
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    color: headingColor,
  },
  textRegular: {
    fontSize: 15,
    fontFamily: 'Nunito-Regular',
    color: subHeadingColor,
  },
  textError: {
    fontSize: 13,
    color: red,
  },
});
