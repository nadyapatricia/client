import React, { useLayoutEffect, Fragment } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import { globalStyle, color, appStyle } from '../../utility';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Search from 'react-native-search-box';

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

  const onSearch = (searchText) => {
    return new Promise((resolve, reject) => {
      console.log(searchText);
      console.log('Add your search function here.');
      resolve();
    });
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
        <Search backgroundColor='rgb(46, 46, 46)' onSearch={onSearch} />
      </View>
    </Fragment>
  );
};

export default Dashboard;
