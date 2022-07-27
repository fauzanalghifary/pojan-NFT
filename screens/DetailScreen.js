import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
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
import Chart from '../components/Chart';
import TokenCard from '../components/TokenCard';

const DetailScreen = ({route}) => {
  var win = Dimensions.get('window');
  const {external_id, numOfToken, tokens} = route.params;
  const baseUrl = `https://api-generator.retool.com`;
  const [collectionDetail, setCollectionDetail] = useState({});
  const [collectionStats, setCollectionStats] = useState([]);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const getCollectionDetailAndStats = async () => {
    try {
      const response = await axios.get(`${baseUrl}/j3Iz08/collections`);
      const targetCollection = response.data.filter(
        col => col.external_id === external_id,
      );
      const id = targetCollection[0].id;

      const {data: dataCollectionDetail} = await axios.get(
        `${baseUrl}/j3Iz08/collections/${id}`,
      );
      setCollectionDetail(dataCollectionDetail);

      const {data: dataCollectionStats} = await axios.get(
        `${baseUrl}/ELI42D/collection_stats?collection_id=${id}`,
      );
      setCollectionStats(dataCollectionStats);
      setIsLoadingFinish(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCollectionDetailAndStats();
  }, []);

  if (!isLoadingFinish) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={{color: 'black'}}>Loading ...</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({item}) => <TokenCard token={item} />;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={[styles.bannerImage, {width: win.width}]}
          source={{uri: collectionDetail.banner_image_url}}
          blurRadius={2}
        />
        <Image
          style={styles.image}
          source={{uri: collectionDetail.image_url}}
        />
      </View>
      <View style={styles.collectionTitleContainer}>
        <Text style={styles.collectionTitle}>
          Collection Name: {collectionDetail.name}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoChild}>
          <Text style={styles.infoTextTitle}>ITEMS</Text>
          <Text style={styles.infoTextContent}>{numOfToken}</Text>
        </View>
        <View style={styles.infoChild}>
          <Text style={styles.infoTextTitle}>TOTAL VOLUME</Text>
          <Text style={styles.infoTextContent}>
            {Number(collectionDetail.total_volume).toFixed(2)}
          </Text>
        </View>
        <View style={styles.infoChild}>
          <Text style={styles.infoTextTitle}>1 DAY</Text>
          {collectionDetail.one_day_change > 0 ? (
            <Text style={[styles.infoTextContent, {color: '#1DE273'}]}>
              ▲{Number(collectionDetail.one_day_change).toFixed(2)}%
            </Text>
          ) : (
            <Text style={[styles.infoTextContent, {color: '#DD2822'}]}>
              ▼{Number(collectionDetail.one_day_change).toFixed(2)}%
            </Text>
          )}
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Chart stats={collectionStats} />
      </View>
      <View style={styles.tokenContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={tokens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          columnWrapperStyle={{justifyContent: 'center'}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  bannerImage: {
    height: 180,
  },
  image: {
    width: 80,
    height: 80,
    margin: 6,
    borderRadius: 13,
    position: 'absolute',
    top: 10,
    borderColor: 'white',
    borderWidth: 4,
  },
  collectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
    zIndex: 1,
    marginTop: -70,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  collectionTitle: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    zIndex: 1,
    // marginTop: -30,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  infoChild: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextTitle: {
    color: '#8D8D92',
    fontSize: 12,
  },
  infoTextContent: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  chartContainer: {
    marginTop: 25,
    marginBottom: -20,
  },
  tokenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
