import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { globalStyle } from '../../utility';
import CardPost from '../../components/cardPost';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Formik } from 'formik';
import { CustomButton } from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

let loggedUser;

export default function Feed() {
  const [modalOpen, setModalOpen] = useState(false);
  const [allData, setAllData] = useState([]);
  const [token, setToken] = useState('');

  // const getCurrentLoggedInUserId = async () => {
  //   const UserId = await AsyncStorage.getItem('access_token');
  //   alert(`ini current logged in user ${UserId}`);
  //   loggedUser = UserId;
  // };

  useLayoutEffect(() => {
    (async () => {
      const UserId = await AsyncStorage.getItem('access_token');
      console.log(UserId);
      setToken(UserId);
    })();

    console.log(loggedUser, '<<<<<<<<<< sebelum axios');
    const fetchPosts = async () => {
      axios({
        method: 'GET',
        url: 'https://obscure-harbor-99680.herokuapp.com/posts',
        headers: {
          access_token: token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          setAllData(data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchPosts();
    console.log(loggedUser, '<<<<<<<<<< setelah axios');
  }, [token, allData, setAllData, setToken]);

  return (
    <>
      <View style={([globalStyle.flex1], { margin: 20, marginLeft: 30 })}>
        <Modal
          visible={modalOpen}
          animationType='slide'
          style={styles.modalToggle}
        >
          <View style={{ marginTop: 20, height: '70%', borderRadius: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <View>
                <Text style={{ fontFamily: 'comfortaa-bold', fontSize: 25 }}>
                  Create Post
                </Text>
              </View>
              <View>
                <SimpleLineIcons
                  name='close'
                  size={24}
                  color='black'
                  style={{ marginTop: 8 }}
                  onPress={() =>
                    Alert.alert(
                      'Cancel create post',
                      `You won't be able to revert this`,
                      [
                        {
                          text: 'OK',
                          onPress: () => setModalOpen(false),
                        },
                        {
                          text: 'Cancel',
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <Formik
                initialValues={{
                  title: '',
                  thumbnail_url: '',
                  caption: '',
                }}
                onSubmit={(values) => {
                  const { title, thumbnail_url, caption } = values;
                  console.log(title, thumbnail_url, caption);
                  axios({
                    url: 'https://obscure-harbor-99680.herokuapp.com/posts',
                    method: 'POST',
                    headers: {
                      access_token: token,
                    },
                    data: {
                      title,
                      thumbnail_url,
                      caption,
                    },
                  })
                    .then(() => {
                      setModalOpen(false);
                    })
                    .catch((err) => {
                      alert(err);
                      console.log(err);
                    });
                }}
              >
                {(props) => (
                  <View style={{ marginHorizontal: 30, marginVertical: 7 }}>
                    <TextInput
                      style={styles.input}
                      placeholder='Enter title'
                      onChangeText={props.handleChange('title')}
                      value={props.values.title}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder='Enter thumbnail URL'
                      onChangeText={props.handleChange('thumbnail_url')}
                      value={props.values.thumbnail_url}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder='Enter caption'
                      onChangeText={props.handleChange('caption')}
                      value={props.values.caption}
                      multiline
                    />
                    <CustomButton
                      title='Post'
                      onPress={props.handleSubmit}
                      btnStyle={{ width: '100%' }}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                fontFamily: 'comfortaa-bold',
                fontSize: 25,
                marginBottom: 20,
              }}
            >
              Feed
            </Text>
          </View>
          <View>
            <SimpleLineIcons
              name='plus'
              size={26}
              color='black'
              style={{ marginTop: 8 }}
              onPress={() => setModalOpen(true)}
            />
          </View>
        </View>
        <View>
          <FlatList
            style={{ marginBottom: 140 }}
            data={allData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardPost
                avatar_url={item.User.avatar_url}
                username={item.User.username}
                thumbnail_url={item.thumbnail_url}
                caption={item.caption}
                title={item.title}
              />
            )}
          ></FlatList>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: `#DDD`,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginVertical: 5,
  },
});
