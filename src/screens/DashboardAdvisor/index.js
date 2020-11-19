import React, { useLayoutEffect, Fragment, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { globalStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardUser from '../../components/cardUser';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import 'firebase/firestore'

const DashboardAdvisor = ({ navigation }) => {
  const [userFiltered, setUserFiltered] = useState([]);
  const [users, setUser] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      axios({
        method: 'get',
        url: "https://obscure-harbor-99680.herokuapp.com/users"
      })
        .then(({ data }) => {
          let userTemp = []
          data.forEach(element => {
            if (element.role !== 'adviseryBoard') {
              userTemp.push(element)
            }
          })
          setUser(userTemp)
          setUserFiltered(userTemp)
        })
        .catch(err => {
          console.log(err);
        })
    }
    fetchUsers()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
          name='logout'
          size={26}
          color='white'
          style={{ right: 10 }}
          onPress={() =>
            Alert.alert(
              'Logout',
              'Are you sure to log out?',
              [
                {
                  text: 'Yes',
                  onPress: () => logout(),
                },
                {
                  text: 'No',
                },
              ],
              { cancelable: false }
            )
          }
        />
      ),
      headerLeft: () => (
        <SimpleLineIcons
          name='grid'
          size={26}
          color='white'
          style={{ left: 10 }}
          onPress={() => navigation.navigate('Feed', {})}
        />
      ),
    });
  }, [navigation]);

  const handlePress = async (UserDashboardId) => {
    console.log(UserDashboardId, "<<<<<<<< handlePRESS")
    const UserLoginId = await AsyncStorage.getItem('id');
    navigation.navigate('Chat', {
      UserDashboardId,
      UserLoginId
    });
  };

  const logout = () => {
    navigation.navigate('Login');
  };

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
          elevation: 5,
          marginHorizontal: 10,
        }}
      >
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
          onChangeText={(query) => handleSearch(query)}
          placeholder='Search for name or specialty'
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            width: '90%',
          }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    setUserFiltered(
      users.filter(
        (i) =>
          i.name.toLowerCase().includes(text.toLowerCase()) ||
          i.speciality.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <Fragment>
      <View style={([globalStyle.flex1], { margin: 20 })}>
        <Text
          style={{
            fontFamily: 'comfortaa-bold',
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Chats
        </Text>
        <View>
          {renderHeader()}
          <FlatList
            style={{ marginBottom: 140 }}
            data={userFiltered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => { handlePress(item.id) }}>
                <CardUser
                  image_url={item.avatar_url}
                  name={item.name}
                  str_number={item.str_number}
                  address={item.work_address}
                  speciality={item.speciality}
                />
              </TouchableOpacity>
            )}
          ></FlatList>
        </View>
      </View>
    </Fragment>
  );
};

export default DashboardAdvisor;

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 5,
  },
});