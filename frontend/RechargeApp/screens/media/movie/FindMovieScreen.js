import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MediaHomeContentCard from '../../../components/media/cards/MediaHeroContentCard';
import AiRecommendSection from '../../../components/media/cards/AiRecommendCard';
import Button from '../../../components/common/Button';
import GenreSelector from '../../../components/media/cards/GenreSelector';
import MediaListSection from '../../../components/media/lists/MediaListsSection';
import AiRecommendModal from '../../../components/media/contents/AiRecommendModal';

const TMDB_GENRES = [
  {id: 'ALL', name: '전체'},
  {id: 28, name: '액션'},
  {id: 35, name: '코미디'},
  {id: 10751, name: '가족'},
  {id: 14, name: '판타지'},
  {id: 27, name: '공포'},
  {id: 10749, name: '로맨스'},
  {id: 878, name: 'SF'},
  {id: 53, name: '스릴러'},
  {id: 12, name: '어드벤처'},
  {id: 16, name: '애니메이션'},
  {id: 80, name: '범죄'},
  {id: 99, name: '다큐멘터리'},
  {id: 18, name: '드라마'},
  {id: 36, name: '역사'},
  {id: 10402, name: '음악'},
  {id: 9648, name: '미스터리'},
  {id: 10770, name: 'TV 영화'},
  {id: 10752, name: '전쟁'},
  {id: 37, name: '서부'},
];

function FindMovieScreen() {
  const navigation = useNavigation();
  const [showAiModal, setShowAiModal] = useState(false);

  // 프론트 예시 영화
  const dummyMovies = [
    {
      id: '1',
      title: '타이타닉',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=Poster',
    },
    {
      id: '2',
      title: '인터스텔라',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=Poster',
    },
    {
      id: '3',
      title: '어벤져스',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=Poster',
    },
  ];

  // 이용자 게시글 프론트 더미
  const userPosts = [
    {
      id: '10',
      title: '오늘 본 영화 후기',
      author: '알꽁!',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=Poster',
    },
    {
      id: '11',
      title: '감동적인 명작 추천',
      author: '영화덕후',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=Poster',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <MediaHomeContentCard
          title="곧 개봉할 영화"
          subtitle="곧 영화관에서 만나요!"
          posters={[
            'https://dummyimage.com/393x590/cccccc/000000&text=Poster+1',
            'https://dummyimage.com/393x590/cccccc/000000&text=Poster+2',
            'https://dummyimage.com/393x590/cccccc/000000&text=Poster+3',
            'https://dummyimage.com/393x590/cccccc/000000&text=Poster+4',
            'https://dummyimage.com/393x590/cccccc/000000&text=Poster=5',
          ]}
        />
        {/* ai추천 섹션 */}
        <AiRecommendSection
          title="영화 AI 추천 받기"
          onPress={() => setShowAiModal(true)}
        />

        {/* 장르 선택 */}
        <GenreSelector
          genres={TMDB_GENRES}
          onSelect={genre => {
            console.log('선택된 장르:', genre);
          }}
        />

        {/* 인기 추천 */}
        <MediaListSection
          title="인기영화"
          items={dummyMovies}
          variant="movie"
          onPressItem={card =>
            navigation.navigate('MovieDetail', {movieId: card.id, type: 'tmdb'})
          }
        />
        {/*  이용자 추천 */}
        <MediaListSection
          title="이용자 추천영화"
          items={userPosts}
          variant="movie"
          onPressItem={card =>
            navigation.navigate('MovieDetail', {movieId: card.id, type: 'post'})
          }
        />

        <View style={styles.bottomArea}>
          <Button
            type="submit"
            text="영화 추천하러 가기"
            height={50}
            onPress={() => navigation.navigate('MoviePostScreen')}
          />
        </View>
      </ScrollView>
      {/* ai 모달 */}
      <AiRecommendModal
        visible={showAiModal}
        onClose={() => setShowAiModal(false)}
        contentType="movie" // 영화 모드
        onResultPress={(item, type) => {
          navigation.navigate('MovieDetail', {movieId: item.id});
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F9',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    padding: 16,
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});

export default FindMovieScreen;
