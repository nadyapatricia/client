import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: windowWidth / 1.2,
    marginHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  cardNumber: {
    fontSize: 12,
    color: '#777',
    marginLeft: 10,
  },
  cardAvailability: {
    fontSize: 13,
    marginVertical: 8,
    marginLeft: 10,
  },
  cardImage: {
    padding: 0,
    flex: 0.3,
    top: 7,
  },
});
