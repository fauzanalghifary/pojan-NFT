import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import axios from 'axios';

const DetailScreen = ({route, params}) => {
  const {external_id} = route.params;
  const baseUrl = `https://api-generator.retool.com`;
  // console.log(external_id);

  const [collectionDetail, setCollectionDetail] = useState({});
  const [collectionStats, setCollectionStats] = useState([]);

  const getCollectionDetailAndStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/j3Iz08/collections`);
      // console.log(response.data);
      const targetCollection = response.data.filter(
        col => col.external_id === external_id,
      );
      // console.log(targetCollection[0].id);

      const response2 = await axios.get(
        `${baseUrl}/j3Iz08/collections/${targetCollection[0].id}`,
      );

      // console.log(response2.data);
      setCollectionDetail(response2.data);

      const response3 = await axios.get(
        `${baseUrl}/ELI42D/collection_stats?collection_id=${targetCollection[0].id}`,
      );

      setCollectionStats(response3.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(collectionStats);

  useEffect(() => {
    getCollectionDetailAndStats();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          style={styles.image}
          source={{uri: collectionDetail.image_url}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 6,
    borderRadius: 13,
  },
});

export default DetailScreen;
