import React, { useLayoutEffect, Fragment, useEffect, useState } from 'react';
import { View, Alert, TextInput, FlatList, Text } from 'react-native';
import { globalStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CardUser from '../../components/cardUser';
import axios from 'axios';

const Dashboard = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userFiltered, setUserFiltered] = useState([]);

  useEffect(() => {
    axios
      .get('https://stormy-reef-75266.herokuapp.com/users')
      .then(({ data }) => {
        setData(data);
        setUserFiltered(data);
      });
  });

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
          onPress={() => navigation.navigate('Feed')}
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
          elevation: 5,
          marginHorizontal: 10,
        }}
      >
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='always'
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder='Search for name or specialty'
          style={{
            backgroundColor: '#fff',
            paddingHorizontal: 20,
          }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    setUserFiltered(
      data.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
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
          Consultation
        </Text>
        <View>
          <FlatList
            style={{ marginBottom: 140 }}
            data={userFiltered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardUser
                image_url={item.avatar_url}
                name={item.name}
                str_number={item.str_number}
                address={item.work_address}
                specialty={item.speciality}
                onPress={() => handlePress(item.id)}
              />
            )}
            ListHeaderComponent={renderHeader}
          ></FlatList>
        </View>
      </View>
    </Fragment>
  );
};

export default Dashboard;
