import React, { useLayoutEffect, Fragment, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardUser from '../../components/cardUser';
import SearchBar from '../../components/searchBar';
import axios from 'axios'

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Dashboard = ({ navigation }) => {

  const [users, setUser] = useState([])
    useEffect (() => {
      const fetchUsers = async () => {
        axios({
          method: 'get',
          url: "http://192.168.1.5:3000/users"
        })
        .then(({data}) => {
          console.log(data);
          setUser(data)
        })
        .catch(err => {
          console.log(err);
        })
      }
      console.log(users, "<<<<<<<<<<< users");
      fetchUsers()
    }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SimpleLineIcons
          name='logout'
          size={26}
          color={color.WHITE}
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
    });
  }, [navigation]);

  const handlePickAdvisor = () => {
    navigation.navigate('Chat')
  }

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
          Search
        </Text>
        <SearchBar />
        <View>
          {users.map((user) => {
              return <ScrollView>
                <CardUser
                  image_url='https://minotar.net/armor/bust/user/100.png'
                  name={user.name}
                  str_number={user.str_number}
                  availability='Mon-Fri 9am-3pm'
                  onPress={handlePickAdvisor()}
                />
              </ScrollView>
            })}
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Dashboard;
