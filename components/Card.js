import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import TokenCardCircle from '../components/TokenCardCircle';

export default function Card({collection, navigation}) {
  const renderItem = ({item}) => <TokenCardCircle token={item} />;

  return (
    <View style={styles.card}>
      <View style={styles.topContainer}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() =>
            navigation.navigate('Collection Detail', {
              external_id: collection.external_id,
              numOfToken: collection.numOfToken,
              tokens: collection.tokens,
            })
          }>
          <Image style={styles.image} source={{uri: collection.image_url}} />
        </TouchableHighlight>
        <View style={styles.collectionName}>
          <Text style={styles.collectionNameText}>{collection.name}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <FlatList
            contentContainerStyle={{
              alignSelf: 'flex-start',
            }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            numColumns={3}
            data={collection.tokens}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Collection Detail', {
              external_id: collection.external_id,
              numOfToken: collection.numOfToken,
              tokens: collection.tokens,
            })
          }>
          <Text>See Collections</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    borderColor: 'rgba(0, 23, 88, 0.73)',
    borderWidth: 2,
  },
  image: {
    width: 240,
    height: 240,
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  collectionName: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 23, 88, 0.3)',
    padding: 8,
    borderRadius: 8,
  },
  collectionNameText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    fontSize: 13,
    backgroundColor: `rgba(0, 23, 88, 0.73)`,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});
