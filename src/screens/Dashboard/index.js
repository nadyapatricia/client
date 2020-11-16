import React, { useLayoutEffect, Fragment, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardUser from '../../components/cardUser';
import SearchBar from '../../components/searchBar';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

let dummyData;

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
    });
  }, [navigation]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://192.168.1.5:3000/users`,
    })
      .then(({ data }) => {
        dummyData = data;
      })
      .catch((err) => {
        throw err;
      });
  });

  const handlePress = (UserId) => {
    console.log(UserId);
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
          Search
        </Text>
        <SearchBar />
        <View>
          <FlatList
            data={dummyData}
            renderItem={({ item }) => (
              <CardUser
                image_url={item.avatar_url}
                name={item.name}
                str_number={item.str_number}
                address={item.work_address}
                onPress={() => handlePress(item.id)}
              />
            )}
          ></FlatList>
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
