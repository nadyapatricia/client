import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { globalStyle, color } from '../../utility';
import { InputField, Logo, CustomButton } from '../../components';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import loginRequest from '../../network/login';

const Login = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = credentials;

  const onLoginPress = () => {
    if (!email) {
      alert('Email is required');
    } else if (!password) {
      alert('Password is required');
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      loginRequest(email, password)
        .then((res) => {
          alert(res.data);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          navigation.replace('Dashboard');
        })
        .catch((err) => {
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(err);
        });
    }
  };

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <View style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <Text>Login</Text>
      <View style={[globalStyle.containerCentered]}>
        <Logo />
      </View>
      <View style={[globalStyle.flex2, globalStyle.sectionCentered]}>
        <InputField
          placeholder='Enter email'
          value={email}
          onChangeText={(text) => handleOnChange('email', text)}
        />
        <InputField
          placeholder='Enter password'
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => handleOnChange('password', text)}
        />
        <CustomButton title='Login' onPress={() => onLoginPress()} />
      </View>
    </View>
  );
};

export default Login;
