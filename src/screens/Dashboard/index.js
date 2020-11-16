import React, { useLayoutEffect, Fragment, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardUser from '../../components/cardUser';
import SearchBar from '../../components/searchBar';
import filter from 'lodash.filter';
import axios from 'axios';

let dummyData = [
  {
    id: 17,
    name: 'David Smith',
    username: 'David32prof',
    email: 'David@mail.com',
    avatar_url: 'https://minotar.net/helm/user/100.png',
    str_number: '33.1.1.401.3.18.103711',
    work_address: 'RS Mitra Keluarga',
    password: '123',
    role: 'adviseryBoard',
    createdAt: '2020-11-16T06:03:21.692Z',
    updatedAt: '2020-11-16T06:03:21.692Z',
  },
  {
    id: 18,
    name: 'arief rachman',
    username: 'arief',
    email: 'arief@mail.com',
    avatar_url: 'https://minotar.net/avatar/user.png',
    str_number: '33.1.1.401.3.18.103800',
    work_address: 'RS Mitra Keluarga',
    password: 'didadadida',
    role: 'doctor',
    createdAt: '2020-11-16T06:03:21.692Z',
    updatedAt: '2020-11-16T06:03:21.692Z',
  },
  {
    id: 19,
    name: 'adrian',
    username: 'adss',
    email: 'adrian@mail.com',
    avatar_url: 'https://minotar.net/bust/user/100.png',
    str_number: '33.1.1.405.3.18.103800',
    work_address: 'RS Mitra Keluarga',
    password: '123',
    role: 'adviseryBoard',
    createdAt: '2020-11-16T06:03:21.692Z',
    updatedAt: '2020-11-16T06:03:21.692Z',
  },
  {
    id: 20,
    name: 'Bos Dira',
    username: 'dirabbieto',
    email: 'yoi@mail.com',
    avatar_url: 'https://minotar.net/cube/user/100.png',
    str_number: '33.1.1.405.3.18.103800',
    work_address: 'RS Mitra Keluarga',
    password: '123',
    role: 'adviseryBoard',
    createdAt: '2020-11-16T06:03:21.692Z',
    updatedAt: '2020-11-16T06:03:21.692Z',
  },
];

const Dashboard = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get('http://localhost:3000/users')
  //     .then(({ data }) => {
  //       setData(data);
  //       setFullData(data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       setError(err);
  //     });
  // }, []);

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

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder='Search'
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handlePress = (UserId) => {
    console.log(UserId);
  };

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(dummyData, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#5500dc' />
      </View>
    );
  } else if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  } else {
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
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardUser
                  image_url={item.avatar_url}
                  name={item.name}
                  str_number={item.str_number}
                  address={item.work_address}
                  onPress={() => handlePress(item.id)}
                />
              )}
              ListHeaderComponent={renderHeader}
            ></FlatList>
          </View>
        </View>
      </Fragment>
    );
  }
};

export default Dashboard;
