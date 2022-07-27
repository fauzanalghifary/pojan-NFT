import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';

const Chart = ({stats}) => {
  var win = Dimensions.get('window');
  //   console.log(stats);

  const [floorPriceData, setFloorPriceData] = useState([]);
  const [isLoadingFinish, setIsLoadingFinish] = useState(false);
  const [arrayKosong, setarrayKosong] = useState([]);

  useEffect(() => {
    setFloorPriceData([]);
    stats.forEach(stat => {
      setFloorPriceData(current => [Number(stat.floor_price_eth), ...current]);
    });

    setIsLoadingFinish(true);
  }, [isLoadingFinish]);

  console.log(floorPriceData.length);

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 1,

    fillShadowGradientFrom: 'skyblue',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientFromOffset: 0,

    fillShadowGradientTo: 'white',
    fillShadowGradientToOpacity: 0,
    fillShadowGradientToOffset: 1,

    strokeWidth: 4,
    decimalPlaces: 2,
    color: (opacity = 1) => `blue`,
    style: {
      borderRadius: 16,
    },
  };
  return (
    <>
      {isLoadingFinish ? (
        <>
          <View style={styles.chartHeader}>
            <View>
              <Text>
                {' '}
                <FontAwesomeIcon icon={faMugSaucer} />
              </Text>
              <Text style={{color: 'black'}}>⟠ 15.12</Text>
              <Text style={{color: 'black'}}>20%</Text>
            </View>
            <View>
              <Text style={styles.daysContainer}>30 days</Text>
            </View>
          </View>
          <LineChart
            data={{
              datasets: [
                {
                  data: floorPriceData.slice(-30),
                },
              ],
            }}
            width={win.width - 20}
            height={220}
            chartConfig={chartConfig}
            //   fromZero={true}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            //   withVerticalLabels={false}
            //   withVerticalLines={false}
            //   withHorizontalLabels={false}
            //   withHorizontalLines={false}
            style={styles.chart}
            bezier
          />
        </>
      ) : null}

      <Text>INI CHART</Text>
    </>
  );
};

const styles = StyleSheet.create({
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  daysContainer: {
    backgroundColor: 'skyblue',
    color: 'black',
    fontSize: 13,
    padding: 6,
    borderRadius: 10,
    textAlign: 'center',
  },
  chart: {
    paddingVertical: 4,
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: -20,
  },
});

export default Chart;
