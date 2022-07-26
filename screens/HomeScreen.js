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

const HomeScreen = () => {
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

    setIsLoadingFinish(true);
  };

  console.log(collectionList.length);
  useEffect(() => {
    getAllTokens();
  }, []);

  const renderItem = ({item}) => <Text>{item.name}</Text>;

  return (
    <View>
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
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default HomeScreen;
