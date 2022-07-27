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
  const baseUrl = `https://api-generator.retool.com/jlEsLB/`;
  const [tokenCollections, setTokensCollections] = useState([]);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collectionIdList, setCollectionIdList] = useState([]);

  const getAllTokens = async () => {
    const response = await axios.get(`${baseUrl}/wallet_content`);
    setTokensCollections(response.data);

    tokenCollections.forEach(token => {
      const parsingCollection = JSON.parse(token.collection_json);

      if (!collectionIdList.includes(parsingCollection.id)) {
        const oldIdCollections = collectionIdList;
        oldIdCollections.push(parsingCollection.id);
        setCollectionIdList(oldIdCollections);

        const oldCollections = collectionList;
        oldCollections.push(parsingCollection);
        setCollectionList(oldCollections);
      }
    });

    // INI MASIH HARDCODE. TODO
    if (collectionList.length === 3) {
      setIsLoadingFinish(true);
    }
  };

  //   console.log(collectionList[0], isLoadingFinish);
  useEffect(() => {
    getAllTokens();
  }, [collectionList]);

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
});

export default HomeScreen;
