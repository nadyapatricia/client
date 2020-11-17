import React, { useLayoutEffect, Fragment, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
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
          // url: "http://192.168.1.5:3000/users"
          url: "https://stormy-reef-75266.herokuapp.com/users"
        })
        .then(({data}) => {
          let advisoryTemp = []
          data.forEach(element => {
            if(element.role === 'adviseryBoard'){
              advisoryTemp.push(element)
            }
          })
          setUser(advisoryTemp)
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

  const handlePress = async ({item}) => {
    console.log(AdvisorId, "<<<<<<<< handlePRESS");
    let { id , name } = item
    await AsyncStorage.setItem('AdvisorId', JSON.stringify(id))
    await AsyncStorage.setItem('user', JSON.stringify(name))
    navigation.navigate('Chat', {
      AdvisorId,
    });
  };

  return (
    <Fragment>
      {/* <Text>{JSON.stringify(users, null, 2)}</Text> */}
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
        <SafeAreaView>
          <FlatList
            data={users}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.card} onPress={() => {handlePress(item)}}>
              <CardUser
                image_url='https://minotar.net/armor/bust/user/100.png'
                name={item.name}
                str_number={item.str_number}
                address={item.work_address}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          ></FlatList>
        </SafeAreaView>
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
