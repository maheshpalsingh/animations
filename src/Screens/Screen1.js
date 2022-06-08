import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const bgs = ['#A5BBAF', '#DDBEFB', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Multi-lateral intermediate moratorium',
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image:
      'https://www.artisanwine.asia/image/artisanwine/image/data/category/red.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'http://kazzit.com/custom/domain_1/image_files/sitemgr_whites.jpg',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image:
      'https://i1.wp.com/luxebeatmag.com/wp-content/uploads/2015/10/Domaine-Carneros-Sparkling.jpg',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image:
      'https://ilovewine.com/wp-content/uploads/2018/06/desert-wine-1024x478.jpg',
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
      }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 0.9, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              opacity,
              borderRadius: 5,
              backgroundColor: '#fff',
              margin: 10,
              transform: [{scale}],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Sqaure = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 1],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#fff',
        borderRadius: 86,
        top: -height * 0.65,
        left: -height * 0.3,
        right: -height * 0.2,
        position: 'absolute',
        transform: [{rotate}, {translateX}],
      }}
    />
  );
};

const Screen1 = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Sqaure scrollX={scrollX} />
      <FlatList
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={40}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        data={DATA}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <View
              style={{
                width,
                alignItems: 'center',
                padding: 20,
              }}>
              <View style={{flex: 0.7, justifyContent: 'center'}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View style={{flex: 0.3}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '800',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  {item.title}
                </Text>
                <Text style={{color: '#fff', fontWeight: '300', fontSize: 18}}>
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'stretch',
          bottom: 100,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.text}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Screen2')}>
          <Text style={styles.text}>Create account</Text>
        </TouchableOpacity>
      </View>

      <Indicator scrollX={scrollX} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    bottom: 20,
    left: 20,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'black',
    fontWeight: '500',
    fontSize: 18,
    // padding: 10,
  },
  container: {
    flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Screen1;
