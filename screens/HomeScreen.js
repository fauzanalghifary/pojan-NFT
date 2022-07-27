import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';

const HomeScreen = ({navigation}) => {
  const baseUrl = `https://api-generator.retool.com`;
  const [tokenCollections, setTokensCollections] = useState([]);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionIdList, setCollectionIdList] = useState([]);

  const getAllTokens = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${baseUrl}/jlEsLB/wallet_content`);
        setTokensCollections(response.data);

        collectionList.forEach(col => {
          col.numOfToken = 0;
        });

        tokenCollections.forEach(token => {
          const parsingCollection = JSON.parse(token.collection_json);

          if (!collectionIdList.includes(parsingCollection.id)) {
            const oldIdCollections = collectionIdList;
            oldIdCollections.push(parsingCollection.id);
            setCollectionIdList(oldIdCollections);

            const oldCollections = collectionList;
            parsingCollection.numOfToken = 1;
            oldCollections.push(parsingCollection);
            setCollectionList(oldCollections);
          } else {
            const indexOf = collectionIdList.indexOf(parsingCollection.id);
            const oldCollections = collectionList;
            oldCollections[indexOf].numOfToken += 1;
            setCollectionList(oldCollections);
          }
        });
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    getAllTokens().then(() => {
      setIsLoadingFinish(true);
    });
  }, [collectionList.length, tokenCollections.length, isLoadingFinish]);

  if (!isLoadingFinish) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{color: 'black'}}>Loading ...</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({item}) => (
    <Card navigation={navigation} collection={item} />
  );

  return (
    <View style={styles.sectionContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={collectionList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 400}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
