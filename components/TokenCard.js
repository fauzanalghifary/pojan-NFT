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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGem} from '@fortawesome/free-solid-svg-icons/faGem';

export default function TokenCard({token}) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: token.image_url}} />
      <View style={styles.infoContainer}>
        <FontAwesomeIcon icon={faGem} color={'skyblue'} />
        <Text style={styles.infoToken}>#{token.token_id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    margin: 6,
    borderRadius: 13,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(1, 1, 1, 0.75)',
    padding: 5,
    borderRadius: 10,
  },
  infoToken: {
    color: 'white',
    fontWeight: '800',
    marginLeft: 6,
  },
});
