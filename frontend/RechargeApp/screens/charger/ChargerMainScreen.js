import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import TextInput from '../../components/common/TextInput';
import IconButton from '../../components/common/iconButton';
import ChargerList from '../../components/charger/ChargerList';
import SelectableButton from '../../components/common/SelectableButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChargerFilter from '../../components/charger/ChargerFilter';
import {WebView} from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';

export default function ChargerMainScreen({navigation}) {
  /** ---------------- 필터 상태 ---------------- */
  const [pressed, setPressed] = useState(false);
  const [speed, setSpeed] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);
  const [filterCompany, setFilterCompany] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [filterSpeed, setFilterSpeed] = useState([]);
  const [filterOpenType, setFilterOpenType] = useState('');
  const [filterWait, setFilterWait] = useState('');

  const webRef = useRef(null);
  const isMapReady = useRef(false);

  const toggleValue = (list, value) =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value];

  /** ---------------- 위치권한 ---------------- */

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '현재 위치 접근',
            message: '지도를 위해 위치 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('위치 권한 허용됨');
        } else {
          console.log('위치 권한 거부됨');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    // 안드로이드에서만 요청 → iOS는 따로 처리
    if (Platform.OS === 'android') {
      requestPermission();
    }
  }, []);

  /** ---------------- 지도api ---------------- */

  const safePostMessage = msg => {
    if (!webRef.current) {
      console.log('⚠️ WebView 로드 전 메시지 → 무시');
      return;
    }
    webRef.current.postMessage(msg);
  };

  const sendToWebView = msg => safePostMessage(msg);

  const moveToCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const payload = JSON.stringify({
          type: 'moveTo',
          lat: latitude,
          lng: longitude,
        });

        console.log('현재 위치:', latitude, longitude);

        safePostMessage(payload);
      },
      error => {
        console.log('현재 위치 오류:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const payload = JSON.stringify({
          type: 'init',
          lat: latitude,
          lng: longitude,
        });

        console.log('초기 위치:', latitude, longitude);

        safePostMessage(payload);
      },
      error => {
        console.log('초기 위치 가져오기 오류:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, []);

  /** ---------------- 바텀시트 ---------------- */
  const SHEET_HEIGHT = 450;
  const PEEK_AREA = 80;
  const CLOSED_Y = SHEET_HEIGHT - PEEK_AREA;
  const OPEN_Y = 0;
  const SNAP = 40;

  const sheetY = useRef(new Animated.Value(CLOSED_Y)).current;
  const lastYRef = useRef(CLOSED_Y);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 4,
      onPanResponderMove: (_, gesture) => {
        let newY = lastYRef.current + gesture.dy;
        if (newY < OPEN_Y) newY = OPEN_Y;
        if (newY > CLOSED_Y) newY = CLOSED_Y;
        sheetY.setValue(newY);
      },
      onPanResponderRelease: (_, gesture) => {
        let newY = lastYRef.current + gesture.dy;

        const mid = (OPEN_Y + CLOSED_Y) / 2;
        const toValue =
          newY < mid - SNAP
            ? OPEN_Y
            : newY > mid + SNAP
            ? CLOSED_Y
            : newY - OPEN_Y < CLOSED_Y - newY
            ? OPEN_Y
            : CLOSED_Y;

        Animated.spring(sheetY, {
          toValue,
          useNativeDriver: false,
        }).start(() => {
          lastYRef.current = toValue;
          sheetY.setValue(toValue);
        });
      },
    }),
  ).current;

  /** ---------------- 더미 데이터 ---------------- */
  const stationData = [
    {
      name: '강남 공영주차장 충전소',
      company: '환경부',
      address1: '서울 강남구 테헤란로 123',
      address2: 'B1',
      distanceKm: 1.2,
      chargers: [
        {type: 'DC콤보', kw: 120, available: 1, total: 3},
        {type: 'AC완속', kw: 7, available: 2, total: 4},
      ],
    },
    {
      name: '서초구청 충전소',
      company: '한국전력',
      address1: '서울 서초구 서초대로 45',
      address2: '',
      distanceKm: 2.8,
      chargers: [
        {type: '차데모', kw: 50, available: 0, total: 1},
        {type: 'DC콤보', kw: 100, available: 0, total: 3},
      ],
    },
  ];

  const onPressItem = item => {
    navigation.navigate('ChargerDetail', {charger: item});
  };

  /** ---------------- 필터 애니메이션 ---------------- */
  const FILTER_HEIGHT = 450;
  const filterY = useRef(new Animated.Value(FILTER_HEIGHT)).current;
  const [filterOpen, setFilterOpen] = useState(false);

  const openFilter = () => {
    setFilterOpen(true);
    Animated.timing(filterY, {
      toValue: 0,
      duration: 280,
      useNativeDriver: false,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(filterY, {
      toValue: FILTER_HEIGHT,
      duration: 260,
      useNativeDriver: false,
    }).start(() => setFilterOpen(false));
  };

  // 🔧 여기만 수정: 적용하기 눌렀을 때 부모 필터 상태 저장 + 닫기
  const applyFilter = (company, type, speed, open, wait) => {
    setFilterCompany(company);
    setFilterType(type);
    setFilterSpeed(speed);
    setFilterOpenType(open);
    setFilterWait(wait);
    closeFilter();
  };

  /** ---------------- 렌더링 ---------------- */
  return (
    <View style={styles.container}>
      {/* WebView 지도 */}
      <WebView
        ref={webRef}
        source={{uri: 'file:///android_asset/map.html'}}
        style={styles.map}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        injectedJavaScript={`window.ReactNativeWebView = window.ReactNativeWebView || {};`}
        onMessage={e => console.log('HTML → RN 메시지:', e.nativeEvent.data)}
      />
      {/* 검색창 */}
      <View style={styles.searchWrapper} pointerEvents="box-none">
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
            searchPressed && {backgroundColor: '#003766'},
          ]}>
          <MaterialCommunityIcons name="magnify" size={20} color="white" />
        </Pressable>
      </View>

      {/* 필터 버튼 + 셀렉터 */}
      <View style={styles.filterRadio} pointerEvents="box-none">
        <IconButton
          type="filter"
          size={15}
          onPress={openFilter}
          style={[styles.filterButton, {elevation: 15}]}
        />

        <SelectableButton
          label={<Text style={{fontSize: 14}}>무료</Text>}
          icon={<MaterialCommunityIcons name="parking" />}
          onPress={() => setPressed(prev => !prev)}
          selected={pressed}
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

      {/* Zoom 버튼 */}
      <View style={styles.zoomWrapper} pointerEvents="box-none">
        <Pressable
          style={styles.zoomBtn}
          onPress={() => sendToWebView('zoomIn')}>
          <Text style={styles.zoomText}>+</Text>
        </Pressable>
        <Pressable
          style={styles.zoomBtn}
          onPress={() => sendToWebView('zoomOut')}>
          <Text style={styles.zoomText}>-</Text>
        </Pressable>
      </View>

      {/* 현재 위치 버튼 */}
      <IconButton
        type="currentLocation"
        style={styles.currentLocation}
        size={20}
        color="#004E89"
        onPress={moveToCurrentLocation}
      />

      {/* 바텀시트*/}
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: SHEET_HEIGHT,
            transform: [{translateY: sheetY}],
            zIndex: 50,
          },
        ]}
        {...panResponder.panHandlers}>
        <ChargerList
          data={stationData}
          count={stationData.length}
          onPressItem={onPressItem}
        />
      </Animated.View>

      {/* 필터 모달 */}
      {filterOpen && (
        <View style={styles.overlay}>
          <Pressable style={styles.overlayBackground} onPress={closeFilter} />

          <Animated.View
            style={[
              styles.filterWrapper,
              {height: FILTER_HEIGHT, transform: [{translateY: filterY}]},
            ]}>
            <ChargerFilter
              company={filterCompany}
              type={filterType}
              speed={filterSpeed}
              open={filterOpenType}
              wait={filterWait}
              onClose={closeFilter}
              onApply={applyFilter} // ✅ 여기 수정: 값 받아서 저장 + 닫기
              onChangeCompany={setFilterCompany}
              onChangeType={setFilterType}
              onChangeSpeed={setFilterSpeed}
              onChangeOpen={setFilterOpenType}
              onChangeWait={setFilterWait}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},

  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },

  searchWrapper: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 20,
    flexDirection: 'row',
    zIndex: 10,
  },

  searchInput: {
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },

  searchButton: {
    marginLeft: 5,
    backgroundColor: '#004E89',
    width: 48,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterRadio: {
    position: 'absolute',
    top: 80,
    left: 10,
    right: 20,
    flexDirection: 'row',
    zIndex: 10,
  },

  filterButton: {
    backgroundColor: '#fff',
    width: 50,
    height: 35,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  filterItem: {
    paddingVertical: 8,
    marginRight: 6,
    elevation: 5,
  },

  currentLocation: {
    position: 'absolute',
    bottom: 90,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    elevation: 6,
    zIndex: 10,
  },

  zoomWrapper: {
    position: 'absolute',
    top: 150,
    right: 10,
    alignItems: 'center',
    zIndex: 10,
  },

  zoomBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffffdd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  zoomText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#ffffffdd',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 998,
  },

  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },

  filterWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 30,
    zIndex: 999,
  },
});
