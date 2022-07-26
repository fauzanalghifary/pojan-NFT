import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const baseUrl = `https://api-generator.retool.com/jlEsLB/`;
  const [tokenCollections, setTokensCollections] = useState([]);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);

  const getAllTokens = async () => {
    const response = await axios.get(`${baseUrl}/wallet_content`);
    setTokensCollections(response.data);
    setIsLoadingFinish(true);
  };

  console.log(tokenCollections[4]?.name);

  useEffect(() => {
    getAllTokens();
  }, []);

  return (
    <View>
      <Text>Ini Main Page</Text>
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
