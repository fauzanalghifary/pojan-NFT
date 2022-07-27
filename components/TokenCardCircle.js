import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGem} from '@fortawesome/free-solid-svg-icons/faGem';

export default function TokenCardCircle({token}) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: token.image_url}} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: -20,
    borderRadius: 100,
  },
});
