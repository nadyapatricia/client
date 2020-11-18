import React from 'react';
import { View, Text, Image } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './style';

export default function CardUser({
  name,
  str_number,
  image_url,
  address,
  speciality,
}) {

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.cardImage}>
          <Image
            style={{ width: 65, height: 65, borderRadius: 50 }}
            source={{ uri: image_url }}
          />
        </View>
        <View style={{ flex: 0.7, overflow: 'hidden', left: -10, top: 2 }}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={styles.cardNumber}>{str_number}</Text>
          <Text style={styles.cardSpecialty}>{speciality}</Text>
          <Text style={styles.cardAddress}>{address}</Text>
        </View>
      </View>
    </>
  );
}
