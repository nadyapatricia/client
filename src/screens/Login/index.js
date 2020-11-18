import React, { useState, useContext } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import { InputField, Logo, CustomButton } from '../../components';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { LinearGradient } from 'expo-linear-gradient';
// import {loginRequest} from '../../network'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage'
const baseURL = 'https://stormy-reef-75266.herokuapp.com/login';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const loginRequest = (email, password) => {
    return axios({
      method: 'POST',
      url: baseURL,
      data: {
        email,
        password,
      },
    });
  };

  const { email, password } = credentials;

  const onLoginPress =  () => {
    if (!email) {
      alert('Email is required');
    } else if (!password) {
      alert('Password is required');
    } else {
      // dispatchLoaderAction({
      //   type: LOADING_START,
      // });
      loginRequest (email,password)
      .then( async ({data}) => {
        console.log(data.id, "<<<<<<<<<<<<<<<< access token login ");
        await AsyncStorage.setItem('id', JSON.stringify(data.id))
        alert(data.id)
        if ( data.id != 2 ){
          navigation.navigate('DashboardAdvisor')
        } else {
          navigation.navigate('Dashboard');
        }
        // dispatchLoaderAction({
        //   type: LOADING_STOP,
        // });
      })
      .catch(err => {
        alert(err)
      })
      // setTimeout(() => {
      // }, 1500);
    }
  };

  const handleOnChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <View style={[globalStyle.flex1]}>
      <LinearGradient
        colors={['#C9D6FF', '#E2E2E2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 35,
          height: windowHeight,
        }}
      />
      <View style={[globalStyle.containerCentered, { marginTop: 150 }]}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require('../../../assets/img/docLogo.png')}
        />
        <Text
          style={{
            fontFamily: 'comfortaa-regular',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Advisory Board
        </Text>
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
        <CustomButton
          title='Login'
          onPress={() => onLoginPress()}
          style={[
            globalStyle.m_t_5,
            {
              fontFamily: 'roboto-regular',
            },
          ]}
        />
      </View>
    </View>
  );
};

export default Login;
