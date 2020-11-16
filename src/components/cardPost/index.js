import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
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
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.cardImage}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 50 }}
            source={{ uri: avatar_url }}
          />
        </View>
        <View style={{ flex: 0.7, overflow: 'hidden', top: 2 }}>
          <Text style={styles.cardNumber}>{username}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </View>
      <View>
        <View>
          <Image
            style={{ width: 90, height: 40 }}
            source={{ uri: thumbnail_url }}
          />
          <Text style={styles.cardTitle}>{caption}</Text>
        </View>
      </View>
    </>
  );
}
