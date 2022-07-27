import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

export default function Card({collection, navigation}) {
  //   console.log(collection.id);

  return (
    <View style={styles.card}>
      <TouchableHighlight
        underlayColor="none"
        onPress={() =>
          navigation.navigate('Detail', {
            external_id: collection.external_id,
            numOfToken: collection.numOfToken,
          })
        }>
        <Image style={styles.image} source={{uri: collection.image_url}} />
      </TouchableHighlight>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Detail', {
            external_id: collection.external_id,
            numOfToken: collection.numOfToken,
          })
        }>
        <Text>Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 25,
  },
  image: {
    width: 100,
    height: 150,
    margin: 6,
    borderRadius: 13,
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    backgroundColor: `#1fcf83`,
    margin: 4,
    borderRadius: 8,
  },
});
