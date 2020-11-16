import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { globalStyle } from '../../utility';
import CardPost from '../../components/cardPost';

const dummyData = [
  {
    id: 2,
    title: 'Testing Article',
    thumbnail_url: 'https://picsum.photos/200.jpg',
    caption: 'Lorem ipsum dolor sit amet bla bla bla',
    UserId: 2,
    createdAt: '2020-11-16T16:50:55.286Z',
    updatedAt: '2020-11-16T16:50:55.286Z',
    User: {
      id: 2,
      name: 'Ardira Fariz Pasha',
      username: 'dirabbieto',
      email: 'dira@mail.com',
      avatar_url: 'https://randomuser.me/api/portraits/men/71.jpg',
      str_number: '33.1.1.401.3.18.103800',
      work_address: 'RS Mitra Keluarga',
      password: '$2a$10$sr7Yz8QxhksRZgNHNkjKwO9capqTeM36aWy9TCMM.F3Bqu2WtSJ86',
      role: 'doctor',
      createdAt: '2020-11-16T16:50:54.999Z',
      updatedAt: '2020-11-16T16:50:54.999Z',
    },
  },
  {
    id: 3,
    title: 'Testing Article',
    thumbnail_url: 'https://picsum.photos/200.jpg',
    caption: 'Lorem ipsum dolor sit amet bla bla bla',
    UserId: 4,
    createdAt: '2020-11-16T16:50:55.286Z',
    updatedAt: '2020-11-16T16:50:55.286Z',
    User: {
      id: 4,
      name: 'Ridwan Wiriandi',
      username: 'iwa',
      email: 'Ridwan@mail.com',
      avatar_url: 'https://randomuser.me/api/portraits/men/80.jpg',
      str_number: '33.1.1.405.3.18.103800',
      work_address: 'RS Mitra Keluarga',
      password: '$2a$10$sr7Yz8QxhksRZgNHNkjKwO9capqTeM36aWy9TCMM.F3Bqu2WtSJ86',
      role: 'adviseryBoard',
      createdAt: '2020-11-16T16:50:55.268Z',
      updatedAt: '2020-11-16T16:50:55.268Z',
    },
  },
  {
    id: 4,
    title: 'Testing Article',
    thumbnail_url: 'https://picsum.photos/200.jpg',
    caption: 'Lorem ipsum dolor sit amet bla bla bla',
    UserId: 3,
    createdAt: '2020-11-16T16:50:55.286Z',
    updatedAt: '2020-11-16T16:50:55.286Z',
    User: {
      id: 3,
      name: 'Nadya Patricia',
      username: 'chameleonsoul',
      email: 'nadya@mail.com',
      avatar_url: 'https://randomuser.me/api/portraits/women/72.jpg',
      str_number: '33.1.1.405.3.18.103800',
      work_address: 'RS Mitra Keluarga',
      password: '$2a$10$sr7Yz8QxhksRZgNHNkjKwO9capqTeM36aWy9TCMM.F3Bqu2WtSJ86',
      role: 'adviseryBoard',
      createdAt: '2020-11-16T16:50:55.126Z',
      updatedAt: '2020-11-16T16:50:55.126Z',
    },
  },
];

export default function Feed() {
  return (
    <>
      <View style={([globalStyle.flex1], { margin: 20, marginLeft: 30 })}>
        <Text
          style={{
            fontFamily: 'comfortaa-bold',
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Feed
        </Text>
        <FlatList
          data={dummyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardPost
              avatar_url={item.User.avatar_url}
              title={item.title}
              caption={item.caption}
              username={item.User.username}
              thumbnail_url={item.thumbnail_url}
              onPress={() => handlePress(item.id)}
            />
          )}
        ></FlatList>
      </View>
    </>
  );
}
