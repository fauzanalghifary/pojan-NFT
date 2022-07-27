import React from 'react';
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

const DetailScreen = ({route, params}) => {
  const {id} = route.params;
  const baseUrl = `https://api-generator.retool.com/jlEsLB/`;
  console.log(id);
  return <Text>DetailScreen</Text>;
};

export default DetailScreen;
