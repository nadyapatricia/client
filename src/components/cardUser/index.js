import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './style';

export default function CardUser({
  name,
  str_number,
  image_url,
  availability,
  onPress,
}) {
  return (
    <>
      <TouchableOpacity style={styles.card}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.cardImage}>
            <Image
              style={{ width: '80%', height: '80%', borderRadius: 50 }}
              source={{ uri: image_url }}
            />
          </View>
          <View style={{ flex: 0.7, overflow: 'hidden', left: -10 }}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardNumber}>{str_number}</Text>
            <Text style={styles.cardAvailability}>{availability}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
