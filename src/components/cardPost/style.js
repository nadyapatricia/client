import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: windowWidth / 1.2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  cardTitle: {
    fontSize: 16,
    marginLeft: 10,
  },
  cardNumber: {
    fontSize: 12,
    color: '#777',
    marginLeft: 10,
  },
  cardAddress: {
    fontSize: 13,
    marginVertical: 8,
    marginLeft: 10,
  },
  cardImage: {
    padding: 0,
    top: 11,
    left: 3,
  },
  cardSpecialty: {
    fontSize: 12,
    marginLeft: 10,
    fontStyle: 'italic',
  },
});
