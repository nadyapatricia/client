import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { globalStyle, color } from '../../utility';
import { InputField, Logo, CustomButton } from '../../components';

const Login = ({ navigation }) => {
  return (
    <View style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <Text>Login</Text>
      <View style={[globalStyle.containerCentered]}>
        <Logo />
      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField placeholder='Enter username' />
        <InputField placeholder='Enter password' secureTextEntry={true} />
        <CustomButton title='Login' />
      </View>
    </View>
  );
};

export default Login;
