import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MediaHomeContentCard from '../../../components/media/cards/MediaHeroContentCard';
import AiRecommendSection from '../../../components/media/cards/AiRecommendCard';
import Button from '../../../components/common/Button';
import GenreSelector from '../../../components/media/cards/GenreSelector';
import MediaListSection from '../../../components/media/lists/MediaListsSection';
import AiRecommendModal from '../../../components/media/contents/AiRecommendModal';
import {fetchAllMusic} from '../../../utils/Musicapi';

const MUSIC_GENRES = [
  {id: 'ALL', name: '전체'},
  {id: 'MUSIC1', name: '국내'},
  {id: 'MUSIC2', name: '해외'},
];

function FindMusicScreen() {
  const navigation = useNavigation();
  const [showAimodal, setShowAiModal] = useState(false);

  const [allMusic, setAllMusic] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState({});

  const toggleFavorite = id => {
    setFavoriteMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));

    // 화면에 보이는 리스트에서도 갱신
    setAllMusic(prev =>
      prev.map(item =>
        item.id === id ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  };

  useEffect(() => {
    loadAllMusic();
  }, []);

  const loadAllMusic = async () => {
    try {
      const data = await fetchAllMusic();

      const formatted = data.map(m => {
        const highRes = m.musicImagePath
          ? m.musicImagePath.replace(/\/\d+x\d+bb\.jpg/, '/200x200bb.jpg')
          : null;

        return {
          id: m.musicId,
          title: m.musicTitle,
          author: m.musicSinger,
          image: highRes,
          categoryId: m.commonCategoryId, // MUSIC1 / MUSIC2
        };
      });

      setAllMusic(formatted);
      setLoading(false);
    } catch (err) {
      console.log('전체 음악 로딩 실패:', err);
      setLoading(false);
    }
  };

  const filteredMusic =
    selectedCategory === 'ALL'
      ? allMusic
      : allMusic.filter(m => m.categoryId === selectedCategory);

  const userMusicPosts = [
    {
      id: 'pm1',
      title: '집중할 때 듣기 좋은 음악 추천',
      author: '알꽁!',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
    },
    {
      id: 'pm2',
      title: '비 올 때 듣기 좋은 노래',
      author: '음악덕후',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 상단 히어로 섹션 */}
        <MediaHomeContentCard
          title="콘서트 정보"
          subtitle="아니 카리나를 실제로 본다고요"
          posters={[
            'https://dummyimage.com/393x393/cccccc/000000&text=A1',
            'https://dummyimage.com/393x393/cccccc/000000&text=A2',
            'https://dummyimage.com/393x393/cccccc/000000&text=A3',
            'https://dummyimage.com/393x393/cccccc/000000&text=A4',
          ]}
        />
        {/* AI 추천 */}
        <AiRecommendSection
          title="음악 AI 추천 받기"
          onPress={() => setShowAiModal(true)}
        />
        {/* 해외/국내 선택 */}
        <GenreSelector
          genres={MUSIC_GENRES}
          onSelect={genre => {
            setSelectedCategory(genre.id);
          }}
        />

        {/* 인기 음악 spotify 이용 예정 */}
        <MediaListSection
          title="인기 음악"
          items={filteredMusic}
          variant="musicChart"
          onFavoriteToggle={toggleFavorite}
        />

        {/* 이용자 추천 음악 */}
        <MediaListSection
          title="이용자 추천 음악"
          items={userMusicPosts}
          variant="music"
          onPressItem={music =>
            navigation.navigate('MusicDetail', {musicId: music.id})
          }
        />

        <View style={styles.bottomArea}>
          <Button
            type="submit"
            text="음악 추천하러 가기"
            height={50}
            onPress={() => navigation.navigate('MusicPostScreen')}
          />
        </View>
      </ScrollView>
      {/* Ai 추천 모달 */}
      <AiRecommendModal
        visible={showAimodal}
        onClose={() => setShowAiModal(false)}
        contentType="musicChart"
        onResultPress={(item, type) => {
          navigation.navigate('MusicDetail', {musicId: item.id});
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
  bottomArea: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});

export default FindMusicScreen;
