import React, { useLayoutEffect, Fragment } from 'react';
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
import Search from 'react-native-search-box';
import CardUser from '../../components/cardUser';

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
        <Search backgroundColor='rgb(46, 46, 46)' />
        <View>
          <ScrollView>
            <CardUser
              image_url='https://minotar.net/armor/bust/user/100.png'
              name='Prof. James Smith'
              str_number='3.102.45.6723.892'
              availability='Mon-Fri 9am-3pm'
            />
          </ScrollView>
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
