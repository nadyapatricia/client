import React from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './style';

export default function CardUser({
  name,
  str_number,
  image_url,
  address,
  handlePickAdvisor,
}) {

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={handlePickAdvisor}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.cardImage}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: image_url }}
            />
          </View>
          <View style={{ flex: 0.7, overflow: 'hidden', left: -10 }}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardNumber}>{str_number}</Text>
            <Text style={styles.cardAddress}>{address}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
