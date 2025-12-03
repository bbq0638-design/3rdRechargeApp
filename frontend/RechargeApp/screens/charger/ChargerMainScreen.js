import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Animated,
  PanResponder,
} from 'react-native';
import TextInput from '../../components/common/TextInput';
import IconButton from '../../components/common/iconButton';
import ChargerList from '../../components/charger/ChargerList';
import SelectableButton from '../../components/common/SelectableButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChargerMainScreen() {
  const [pressed, setPressed] = useState(false);
  const [speed, setSpeed] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);

  // 🔥 Bottom Sheet 설정
  const SHEET_HEIGHT = 570; // 바텀시트 전체 높이
  const PEEK_AREA = 130; // 기본으로 보여줄 영역 높이
  const CLOSED_Y = SHEET_HEIGHT - PEEK_AREA; // 기본 위치
  const OPEN_Y = 0; // 위로 올렸을 때 위치
  const SNAP_THRESHOLD = 40; // 스냅 여유값

  // 현재 translateY 값
  const sheetY = useRef(new Animated.Value(CLOSED_Y)).current;
  // 현재 위치를 기억 (다음 드래그의 기준점)
  const lastYRef = useRef(CLOSED_Y);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 4,

      onPanResponderMove: (_, gesture) => {
        // 직전 위치 + 이번 드래그 거리
        let newY = lastYRef.current + gesture.dy;

        // 위/아래 경계값 제한
        if (newY < OPEN_Y) newY = OPEN_Y;
        if (newY > CLOSED_Y) newY = CLOSED_Y;

        sheetY.setValue(newY);
      },

      onPanResponderRelease: (_, gesture) => {
        let newY = lastYRef.current + gesture.dy;

        if (newY < OPEN_Y) newY = OPEN_Y;
        if (newY > CLOSED_Y) newY = CLOSED_Y;

        const midPoint = (OPEN_Y + CLOSED_Y) / 2;

        const toValue =
          newY < midPoint - SNAP_THRESHOLD
            ? OPEN_Y
            : newY > midPoint + SNAP_THRESHOLD
            ? CLOSED_Y
            : newY - OPEN_Y < CLOSED_Y - newY
            ? OPEN_Y
            : CLOSED_Y;

        Animated.spring(sheetY, {
          toValue,
          useNativeDriver: false,
        }).start(() => {
          // 다음 드래그 기준점 업데이트
          lastYRef.current = toValue;
          sheetY.setValue(toValue);
        });
      },
    }),
  ).current;

  // 테스트용 데이터
  const stationData = [
    {
      name: '강남 공영주차장 충전소',
      company: '환경부',
      address1: '서울 강남구 테헤란로 123',
      address2: 'B1',
      available: 3,
      total: 6,
      speedKw: 120,
      types: ['DC콤보', 'AC완속'],
      distanceKm: 1.2,
    },
    {
      name: '서초구청 충전소',
      company: '한국전력',
      address1: '서울 서초구 서초대로 45',
      address2: '',
      available: 0,
      total: 4,
      speedKw: 50,
      types: ['차데모', 'DC콤보'],
      distanceKm: 2.8,
    },
    {
      name: '롯데월드타워 충전소',
      company: 'LG U+',
      address1: '서울 송파구 올림픽로 300',
      address2: '지하2층',
      available: 7,
      total: 10,
      speedKw: 200,
      types: ['DC콤보'],
      distanceKm: 4.3,
    },
    {
      name: '롯데월드타워 충전소',
      company: 'LG U+',
      address1: '서울 송파구 올림픽로 300',
      address2: '지하2층',
      available: 7,
      total: 10,
      speedKw: 200,
      types: ['DC콤보'],
      distanceKm: 4.3,
    },
    {
      name: '롯데월드타워 충전소',
      company: 'LG U+',
      address1: '서울 송파구 올림픽로 300',
      address2: '지하2층',
      available: 7,
      total: 10,
      speedKw: 200,
      types: ['DC콤보'],
      distanceKm: 4.3,
    },
    {
      name: '롯데월드타워 충전소',
      company: 'LG U+',
      address1: '서울 송파구 올림픽로 300',
      address2: '지하2층',
      available: 7,
      total: 10,
      speedKw: 200,
      types: ['DC콤보'],
      distanceKm: 4.3,
    },
    {
      name: '롯데월드타워 충전소',
      company: 'LG U+',
      address1: '서울 송파구 올림픽로 300',
      address2: '지하2층',
      available: 7,
      total: 10,
      speedKw: 200,
      types: ['DC콤보'],
      distanceKm: 4.3,
    },
  ];

  return (
    <View style={styles.container}>
      {/* 지도 백그라운드 */}
      <Image
        source={require('../../assets/images/map.jpg')}
        style={styles.image}
      />

      {/* 검색창 */}
      <View style={styles.searchWrapper}>
        <TextInput
          placeholder="주소를 입력하세요."
          width="88%"
          inputStyle={styles.searchInput}
        />
        <Pressable
          onPress={() => console.log('검색')}
          onPressIn={() => setSearchPressed(true)}
          onPressOut={() => setSearchPressed(false)}
          style={[
            styles.searchButton,
            {elevation: 50},
            searchPressed && {backgroundColor: '#003766'},
          ]}>
          <MaterialCommunityIcons name="magnify" size={20} color="white" />
        </Pressable>
      </View>

      {/* 필터 */}
      <View style={styles.filterRadio}>
        <IconButton
          type="filter"
          size={15}
          style={[styles.filterButton, {elevation: 15}]}
        />

        <SelectableButton
          label={<Text style={{fontSize: 14}}>무료 주차장</Text>}
          icon={<MaterialCommunityIcons name="parking" />}
          onPress={() => setPressed(prev => !prev)}
          selected={pressed === true}
          style={styles.filterItem}
        />

        <SelectableButton
          label={<Text style={{fontSize: 14}}>급속</Text>}
          icon={<MaterialCommunityIcons name="lightning-bolt-outline" />}
          selected={speed === 'fast'}
          onPress={() => setSpeed(speed === 'fast' ? '' : 'fast')}
          style={styles.filterItem}
        />

        <SelectableButton
          label={<Text style={{fontSize: 14}}>완속</Text>}
          icon={<MaterialCommunityIcons name="power-plug-outline" />}
          selected={speed === 'slow'}
          onPress={() => setSpeed(speed === 'slow' ? '' : 'slow')}
          style={styles.filterItem}
        />
      </View>

      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: SHEET_HEIGHT,
            transform: [{translateY: sheetY}],
          },
        ]}
        {...panResponder.panHandlers}>
        {/* 현재 위치 버튼 */}
        <IconButton
          type="currentLocation"
          style={styles.currentLocation}
          size={20}
          color="#004E89"
        />

        {/* 리스트 */}
        <ChargerList data={stationData} count={stationData.length} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  /** 검색창 **/
  searchWrapper: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    padding: 4,
  },
  searchInput: {
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 5,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#004E89',
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /** 필터 **/
  filterRadio: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#F9FAFB',
    width: 50,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  filterItem: {
    paddingVertical: 8,
    overflow: 'visible',
    alignItems: 'center',
    marginRight: 5,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 3,
    elevation: 5,
  },

  /** Bottom Sheet **/
  listWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    zIndex: 999,
    elevation: 30,
  },

  currentLocation: {
    backgroundColor: '#F9FAFB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    marginLeft: 15,
    elevation: 3,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginBottom: 8,
    color: '#111827',
  },
});
