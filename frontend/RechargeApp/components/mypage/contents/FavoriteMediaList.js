import React, {useRef, useCallback, useState} from 'react';
import {View, ScrollView, StyleSheet, Text, Dimensions} from 'react-native';
import MediaCards from '../../media/cards/MediaCards';
import MediaTab from '../buttontabs/MediaTab';

const {width} = Dimensions.get('window');

export default function FavoriteMediaList({
  favoriteMovies,
  favoriteMusic,
  onPressItem,
}) {
  const [activeTab, setActiveTab] = useState('movie');
  const scrollRef = useRef(null);

  // ⭐ 임시 더미 데이터 (영화)
  const dummyMovies = [
    {
      id: 'M1',
      title: '인터스텔라',
      author: null,
      poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    },
    {
      id: 'M2',
      title: '내 추천글',
      author: '알꽁님',
      image: 'https://placehold.co/300x450?text=MyPost',
    },
    {
      id: 'M3',
      title: '이용자 추천글',
      author: 'movie_fan',
      image: 'https://placehold.co/300x450?text=User',
    },
  ];

  // ⭐ 임시 더미 데이터 (음악)
  const dummyMusic = [
    {
      id: 'S1',
      title: '좋은 날',
      image: 'https://placehold.co/200x200?text=IU',
      author: '아이유',
    },
    {
      id: 'S2',
      title: 'Weekend',
      image: 'https://placehold.co/200x200?text=Taeyeon',
      author: '태연',
    },
    {
      id: 'S3',
      title: 'Best Hits',
      image: 'https://placehold.co/200x200?text=Hits',
      author: 'playlist',
    },
  ];

  const movies = favoriteMovies ?? dummyMovies;
  const music = favoriteMusic ?? dummyMusic;

  // 이미지 처리
  const getMovieImage = item =>
    item.poster_path
      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
      : (item.image ?? '');

  const getMusicImage = item => item.image || '';

  // 탭을 눌렀을 때 → 슬라이드 이동
  const handleTabPress = useCallback(
    tab => {
      setActiveTab(tab);
      scrollRef.current?.scrollTo({
        x: tab === 'movie' ? 0 : width,
        animated: true,
      });
    },
    [scrollRef],
  );

  // 스크롤 완료 → 탭 상태 변경
  const handleScrollEnd = useCallback(e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / width);
    setActiveTab(pageIndex === 0 ? 'movie' : 'music');
  }, []);

  return (
    <View style={styles.container}>
      {/* 🟦 상단 탭 */}
      <MediaTab activeTab={activeTab} onChangeTab={handleTabPress} />

      {/* 🟦 슬라이드 페이저 */}
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.pager}>
        {/* 🎬 영화 카드 */}
        <View style={[styles.page, {width}]}>
          <ScrollView contentContainerStyle={styles.grid}>
            {movies.length > 0 ? (
              movies.map(item => (
                <MediaCards
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  image={getMovieImage(item)}
                  style={styles.card}
                  variant="movie"
                  onPress={() => onPressItem?.(item, 'movie')}
                />
              ))
            ) : (
              <Text style={styles.empty}>즐겨찾기한 영화가 없습니다.</Text>
            )}
          </ScrollView>
        </View>

        {/* 🎵 음악 카드 (musicChart) */}
        <View style={[styles.page, {width}]}>
          <ScrollView contentContainerStyle={styles.grid}>
            {music.length > 0 ? (
              music.map(item => (
                <MediaCards
                  key={item.id}
                  title={item.title}
                  author={item.author} // ⭐ 여기서 author 정상 전달!
                  image={getMusicImage(item)}
                  style={styles.card}
                  variant="musicChart"
                  onPress={() => onPressItem?.(item, 'music')}
                />
              ))
            ) : (
              <Text style={styles.empty}>즐겨찾기한 음악이 없습니다.</Text>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  pager: {
    marginTop: 20,
  },
  page: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 22,
    marginRight: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    paddingVertical: 40,
  },
});
