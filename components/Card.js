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
  return (
    <View style={styles.card}>
      <TouchableHighlight
        underlayColor="none"
        onPress={() =>
          navigation.navigate('Detail', {
            external_id: collection.external_id,
            numOfToken: collection.numOfToken,
            tokens: collection.tokens,
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
            tokens: collection.tokens,
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
