
// const Feed = () => {

// }

export default Feed

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
          headerLeft: () => (
            <SimpleLineIcons
              name='grid'
              size={26}
              color={color.WHITE}
              style={{ left: 10 }}
              onPress={() => navigation.navigate('Feed')}
            />
          ),
        });
      }, [navigation]);

  const [users, setUser] = useState([])
    useEffect (() => {
      const fetchUsers = async () => {
        axios({
          method: 'get',
          // url: "http://192.168.1.5:3000/users"
          url: "https://jsonplaceholder.typicode.com/users"
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

  const handlePress = (UserId) => {
    console.log("<<<<<<<< handlePRESS");
    navigation.navigate('Chat', {
      UserId,
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
              <TouchableOpacity style={styles.card} onPress={handlePress}>
              <CardUser
                image_url='https://minotar.net/armor/bust/user/100.png'
                name={item.name}
                // str_number={item.str_number}
                // address={item.work_address}
                onPress={() => handlePress(item.id)}/>
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
