import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
  Image,
} from 'react-native';
import SelectableButton from '../../components/common/SelectableButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../../components/common/iconButton';
import PlaceItem from '../../components/place/PlaceItem';

export default function ChargerDetailScreen({route}) {
  const [category, setCategory] = useState('');
  const [showMore, setShowMore] = useState(false);

  const charger = route.params?.charger;

  if (!charger) return <Text>데이터 없음</Text>;

  const fullAddress = `${charger.address1} ${charger.address2 || ''}`.trim();
  const chargerList = charger.chargers ?? [];

  /* 🔵 샘플 PlaceItem 리스트 */
  const samplePlaces = [
    {
      name: '맛있는 국밥집',
      address1: '서울 강남구 테헤란로 123',
      address2: 'B1',
      phone: '02-123-4567',
      imageUri: null,
    },
    {
      name: '라떼맛집 카페',
      address1: '서울 강남구 역삼로 211',
      address2: '',
      phone: '02-000-0000',
      imageUri: null,
    },
  ];

  /* 🔵 카카오맵 실행 (앱 → 웹 fallback) */
  const openKakaoMap = async query => {
    const encoded = encodeURIComponent(query);
    const appUrl = `kakaomap://search?q=${encoded}`;
    const webUrl = `https://map.kakao.com/?q=${encoded}`;

    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      return Linking.openURL(appUrl);
    } else {
      return Linking.openURL(webUrl);
    }
  };

  /* 🔵 네이버맵 실행 (앱 → 웹 fallback) */
  const openNaverMap = async query => {
    const encoded = encodeURIComponent(query);
    const appUrl = `naversearchapp://keywordsearch?keyword=${encoded}`;
    const webUrl = `https://map.naver.com/v5/search/${encoded}`;

    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      return Linking.openURL(appUrl);
    } else {
      return Linking.openURL(webUrl);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔵 상단 고정 콘텐츠 */}
      <View style={styles.fixedContent}>
        {/* 상단 제목 + 오른쪽 맵 버튼 두 개 */}
        <View style={styles.headerRow}>
          {/* 왼쪽 제목 + 주소 */}
          <View style={{flex: 1}}>
            <Text style={styles.title}>{charger.name}</Text>

            <View style={styles.row}>
              <IconButton type="charge" size={16} color="#6B7280" />
              <Text style={styles.address}>{fullAddress}</Text>
            </View>
          </View>

          {/* 오른쪽 세로 버튼 2개 */}
          <View style={styles.mapColumn}>
            {/* 카카오맵 */}
            <Pressable
              onPress={() => openKakaoMap(fullAddress)}
              style={({pressed}) => [
                styles.headerMapButton,
                pressed && {backgroundColor: '#004E89', borderColor: '#004E89'},
              ]}>
              {({pressed}) => (
                <View style={styles.mapButtonInner}>
                  <Image
                    source={require('../../assets/images/kakao-logo.png')}
                    style={[styles.headerMapIcon]}
                  />
                  <Text
                    style={[
                      styles.headerMapButtonText,
                      pressed && {color: '#FFF'},
                    ]}>
                    카카오맵
                  </Text>
                </View>
              )}
            </Pressable>

            {/* 버튼 사이 간격 */}
            <View style={{height: 7}} />

            {/* 네이버지도 */}
            <Pressable
              onPress={() => openNaverMap(fullAddress)}
              style={({pressed}) => [
                styles.headerMapButton,
                pressed && {backgroundColor: '#004E89', borderColor: '#004E89'},
              ]}>
              {({pressed}) => (
                <View style={styles.mapButtonInner}>
                  <Image
                    source={require('../../assets/images/naver-logo.png')}
                    style={[styles.headerMapIcon]}
                  />
                  <Text
                    style={[
                      styles.headerMapButtonText,
                      pressed && {color: '#FFF'},
                    ]}>
                    네이버지도
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>

        {/* 회사명 */}
        <Text style={styles.company}>{charger.company}</Text>

        {/* 🔌 충전기 카드 */}
        <View style={styles.chargerCard}>
          {chargerList.map((c, index) => (
            <View key={index}>
              <View style={styles.chargerRow}>
                <MaterialCommunityIcons
                  name="flash"
                  size={22}
                  color={'#004E89'}
                  style={{marginRight: 8}}
                />

                <View style={styles.chargerInfo}>
                  <Text style={styles.chargerLabel}>
                    {c.type} {c.kw}kW
                  </Text>
                  <Text style={styles.chargerSub}>{c.rawType}</Text>
                </View>

                <Text style={styles.chargerStatus}>
                  충전가능 {c.available}대
                </Text>
                <Text style={styles.chargerTotal}>/ {c.total}대</Text>
              </View>

              {index < chargerList.length - 1 && (
                <View style={styles.divider} />
              )}
            </View>
          ))}
        </View>

        {/* 🔵 필터 버튼 */}
        <View style={styles.filterRow}>
          <SelectableButton
            label={<Text style={{fontSize: 11, lineHeight: 12}}>식당</Text>}
            icon={
              <MaterialCommunityIcons name="silverware-fork-knife" size={14} />
            }
            selected={category === 'food'}
            onPress={() => setCategory(category === 'food' ? '' : 'food')}
            style={styles.filterItem}
          />

          <SelectableButton
            label={<Text style={{fontSize: 11, lineHeight: 13}}>카페</Text>}
            icon={
              <MaterialCommunityIcons
                name="coffee-outline"
                size={13}
                style={{lineHeight: 16}}
              />
            }
            selected={category === 'cafe'}
            onPress={() => setCategory(category === 'cafe' ? '' : 'cafe')}
            style={styles.filterItem}
          />

          <SelectableButton
            label={<Text style={{fontSize: 11, lineHeight: 11}}>더보기</Text>}
            icon={<MaterialCommunityIcons name="chevron-down" size={14} />}
            selected={showMore}
            onPress={() => setShowMore(!showMore)}
            style={styles.filterItem}
          />
        </View>

        {/* 🔽 확장 영역 */}
        {showMore && (
          <View style={styles.moreList}>
            <SelectableButton
              label={<Text style={{fontSize: 11, lineHeight: 12}}>관광지</Text>}
              icon={
                <MaterialCommunityIcons
                  name="map-marker"
                  size={13}
                  style={{lineHeight: 17}}
                />
              }
              selected={category === 'tour'}
              onPress={() => setCategory(category === 'tour' ? '' : 'tour')}
              style={styles.moreItem}
            />
            <SelectableButton
              label={<Text style={{fontSize: 11, lineHeight: 12}}>놀거리</Text>}
              icon={
                <MaterialCommunityIcons
                  name="puzzle-outline"
                  size={13}
                  style={{lineHeight: 16}}
                />
              }
              selected={category === 'play'}
              onPress={() => setCategory(category === 'play' ? '' : 'play')}
              style={styles.moreItem}
            />
            <SelectableButton
              label={<Text style={{fontSize: 11, lineHeight: 12}}>영화관</Text>}
              icon={
                <MaterialCommunityIcons
                  name="filmstrip"
                  size={13}
                  style={{lineHeight: 16}}
                />
              }
              selected={category === 'cinema'}
              onPress={() => setCategory(category === 'cinema' ? '' : 'cinema')}
              style={styles.moreItem}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>주변식당</Text>
        <View style={[styles.divider, {marginTop: -3}]} />
      </View>

      {/* 🔵 스크롤 영역 */}
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}>
        <View style={styles.cardList}>
          {samplePlaces.map((place, index) => {
            const placeFullAddress = `${place.address1} ${
              place.address2 || ''
            }`.trim();

            return (
              <PlaceItem
                key={index}
                name={place.name}
                address1={place.address1}
                address2={place.address2}
                phone={place.phone}
                imageUri={place.imageUri}
                onPressKakao={() => openKakaoMap(placeFullAddress)}
                onPressNaver={() => openNaverMap(placeFullAddress)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

/* 🔵 스타일 */
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB'},

  fixedContent: {
    padding: 20,
    paddingBottom: 0,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  /* 오른쪽 맵 버튼 2개 */
  mapColumn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    gap: 12,
    marginTop: 3,
    marginRight: -11,
  },

  headerMapButton: {
    width: 95,
    height: 34,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
  },

  mapButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerMapIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },

  headerMapButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },

  title: {fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 6},
  address: {fontSize: 14, color: '#6B7280'},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -5,
    marginTop: 5,
  },
  company: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 15,
    marginLeft: 2,
  },

  chargerCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingRight: 16,
    paddingLeft: 16,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    elevation: 3,
  },

  chargerRow: {flexDirection: 'row', alignItems: 'center'},
  chargerInfo: {flex: 1},

  chargerLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginTop: 15,
  },

  chargerSub: {fontSize: 13, color: '#6B7280'},

  chargerStatus: {
    fontSize: 15,
    fontWeight: '700',
    color: '#004E89',
    marginRight: 4,
  },

  chargerTotal: {fontSize: 15, color: '#6B7280'},

  divider: {height: 1, backgroundColor: '#E5E7EB', marginVertical: 3},

  filterRow: {flexDirection: 'row', marginBottom: 10},
  filterItem: {marginRight: 10, height: 40, justifyContent: 'center'},

  moreList: {flexDirection: 'row'},
  moreItem: {marginRight: 10, height: 40},

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
    marginLeft: 2,
    marginTop: 5,
  },

  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  cardList: {
    gap: 14,
    paddingTop: 10,
  },
});
