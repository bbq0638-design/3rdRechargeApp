import React, {useRef, useCallback, useState, useEffect} from 'react';
import {View, ScrollView, Dimensions, StyleSheet, Text} from 'react-native';
import MediaTab from '../buttontabs/MediaTab';
import MediaCards from '../../media/cards/MediaCards';
import {fetchUserMoviePosts} from '../../../utils/Movieapi';
import {fetchUserMusicPosts} from '../../../utils/Musicapi';

const {width} = Dimensions.get('window');

export default function MyPostMediaList({userId, onPressItem}) {
  const [activeTab, setActiveTab] = useState('movie');
  const scrollRef = useRef(null);

  const [moviePosts, setMoviePosts] = useState([]);
  const [musicPosts, setMusicPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      try {
        setLoading(true);

        const movieData = await fetchUserMoviePosts(userId);
        const musicData = await fetchUserMusicPosts(userId);
        setMoviePosts(
          movieData.map(item => ({
            id: item.moviePostId,
            title: item.moviePostTitle,
            author: item.userNickname,
            image: item.moviePoster,
          })),
        );

        setMusicPosts(
          musicData.map(item => ({
            id: item.musicPostId,
            title: item.musicPostTitle,
            author: item.userNickname,
            image: item.firstImagePath,
          })),
        );
      } catch (e) {
        console.log('마이페이지 게시글 로드 실패:', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  /** 🔹 탭 클릭 → 슬라이드 이동 */
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

  /** 🔹 스와이프 → 탭 변경 */
  const handleScrollEnd = useCallback(e => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveTab(index === 0 ? 'movie' : 'music');
  }, []);

  const getMovieImage = item =>
    `https://image.tmdb.org/t/p/w500${item.poster_path ?? item.image ?? ''}`;

  const getMusicImage = item => item.image ?? '';

  return (
    <View style={styles.container}>
      {/* 탭 */}
      <MediaTab activeTab={activeTab} onChangeTab={handleTabPress} />

      {/* 영화 / 음악 슬라이드 페이저 */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.pager}>
        {/* 🎬 영화 */}
        <View style={[styles.page, {width}]}>
          <ScrollView contentContainerStyle={styles.gridWrapper}>
            {moviePosts?.length > 0 ? (
              moviePosts.map(item => (
                <MediaCards
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  image={getMovieImage(item)}
                  variant="movie"
                  style={styles.card}
                  onPress={() => onPressItem?.(item, 'movie')}
                />
              ))
            ) : (
              <Text style={styles.empty}>등록된 영화 추천글이 없습니다.</Text>
            )}
          </ScrollView>
        </View>

        {/* 🎵 음악 */}
        <View style={[styles.page, {width}]}>
          <ScrollView contentContainerStyle={styles.gridWrapper}>
            {musicPosts?.length > 0 ? (
              musicPosts.map(item => (
                <MediaCards
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  image={getMusicImage(item)}
                  variant="music"
                  style={styles.card}
                  onPress={() => onPressItem?.(item, 'music')}
                />
              ))
            ) : (
              <Text style={styles.empty}>등록된 음악 추천글이 없습니다.</Text>
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

  /** ⭐ FavoriteMediaList와 동일하게 만든 gridWrapper */
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    paddingBottom: 50,
    marginLeft: 30, // 핵심!!
  },

  /** 카드 스타일도 동일하게 유지해야 layout이 정확히 맞음 */
  card: {
    marginBottom: 22,
    marginRight: 16,
  },

  empty: {
    textAlign: 'left',
    color: '#777',
    fontSize: 14,
    paddingLeft: 14,
    paddingVertical: 40,
  },
});
