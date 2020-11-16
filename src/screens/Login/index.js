import React, { useState, useContext } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import { InputField, Logo, CustomButton } from '../../components';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/type';
import { LinearGradient } from 'expo-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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
      setTimeout(() => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        navigation.navigate('Dashboard');
      }, 1500);
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
            fontFamily: 'comfortaa-bold',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          MedRx
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
