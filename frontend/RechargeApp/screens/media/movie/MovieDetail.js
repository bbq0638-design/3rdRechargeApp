import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CommentSection from '../../../components/common/CommentSection';
import MovieInfo from '../../../components/media/contents/MovieInfo';
import FavoriteButton from '../../../components/media/contents/FavoriteButton';
import UserRecommendBox from '../../../components/media/contents/UserRecommendBox';
import MediaListSection from '../../../components/media/lists/MediaListsSection';

export default function MovieDetail({route}) {
  const {movieId, type} = route.params;

  const isUserPost = type === 'post';
  const similarMovies = [
    {
      id: '21',
      title: '마션',
      poster_path: '/gEU2QniE6E77NI6xxx.jpg',
    },
    {
      id: '22',
      title: '그래비티',
      poster_path: '/gEU2QniE6E77NI6555.jpg',
    },
    {
      id: '23',
      title: '몰라씨발',
      poster_path: '/gEU2QniE6E77NI6555.jpg',
    },
  ];

  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const fakeMovie = {
    title: '인터스텔라',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    vote_average: 8.7,
    genres: [{name: 'SF'}, {name: '드라마'}],
    release_date: '2014-11-07',
    runtime: 169,
    overview:
      '지구의 마지막 남은 자원을 찾아 우주로 떠난 이들의 모험을 그린 SF 대작입니다.',
    director: '크리스토퍼 놀란',
    actors: '매튜 맥커너히, 앤 해서웨이, 제시카 채스테인',
  };

  const testReason =
    '스토리 전개가 너무 좋고, 몰입감 있는 연출 덕분에 강력 추천합니다!';
  const nickname = 'charger_user';
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 50}}>
      {/* ⭐ 영화 정보 */}
      <MovieInfo
        movie={fakeMovie}
        isAdmin={false}
        isMine={true}
        isPost={true}
      />

      {/* 즐겨찾기 */}
      <FavoriteButton
        isFavorite={isFavorite}
        onPress={() => setIsFavorite(p => !p)}
        style={{marginTop: 10}}
      />

      {/* 추천 이유 컴포넌트 */}
      {isUserPost && (
        <UserRecommendBox
          reason={testReason}
          nickname={nickname}
          style={{marginTop: 20}}
          onPressNickname={() =>
            navigation.navigate('MyPage', {
              screen: 'MyPageScreen',
              params: {isMine: false},
            })
          }
        />
      )}

      {/* ⭐ 댓글 */}
      <View style={{marginTop: 10}}>
        <CommentSection />
      </View>

      <MediaListSection
        title="비슷한 장르의 영화"
        items={similarMovies}
        variant="movie"
        onPressItem={movie =>
          navigation.navigate('MovieDetail', {movieId: movie.id})
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
});
