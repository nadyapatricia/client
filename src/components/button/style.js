import { StyleSheet } from 'react-native';
import { appStyle } from '../../utility';

export default StyleSheet.create({
  btn: {
    backgroundColor: '#00dfeb',
    width: '90%',
    height: appStyle.btnHeight,
    borderRadius: appStyle.btnBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: appStyle.btnMarginVertical,
  },
  text: { fontSize: 26, fontWeight: 'normal', color: appStyle.fieldTextColor },
});
