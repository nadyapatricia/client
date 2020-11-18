import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './style';

export default function CardPost({
  avatar_url,
  username,
  thumbnail_url,
  caption,
  title,
}) {
  return (
    <>
      <TouchableOpacity style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.cardImage}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 50, top: -7 }}
              source={{ uri: avatar_url }}
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.cardNumber}>{username}</Text>
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
        </View>
        <View>
          <Image
            style={{
              width: '100%',
              height: 400,
              borderRadius: 10,
              marginTop: 16,
              marginBottom: 5,
            }}
            source={{ uri: thumbnail_url }}
          />
          <Text style={styles.cardAddress}>{caption}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
