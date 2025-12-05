import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';

import MediaSearchBar from '../../../components/media/contents/MediaSearchBar';
import MovieInfo from '../../../components/media/contents/MovieInfo';
import LoadingAnimation from '../../../components/common/LoadingAnimation';
import Button from '../../../components/common/Button';
import TextArea from '../../../components/common/TextArea';

const TMDB_API_KEY = '6df9f08c130ae1944d95264798f87686';

export default function MoviePostScreen() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const isSubmitDisabled = !selectedMovie || !reason.trim();

  useEffect(() => {
    if (!selectedMovie) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedMovie]);

  const fetchMovieDetail = async movieId => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          params: {
            api_key: TMDB_API_KEY,
            language: 'ko-KR',
            append_to_response: 'credits',
          },
        },
      );

      const detail = res.data;

      const director =
        detail.credits.crew.find(p => p.job === 'Director')?.name ||
        '정보 없음';

      const actors =
        detail.credits.cast
          .slice(0, 5)
          .map(a => a.name)
          .join(', ') || '정보 없음';

      return {...detail, director, actors};
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* 🔥 검색창 + 드롭다운 (상단 고정) */}
      <View style={styles.searchWrapper}>
        <MediaSearchBar
          type="movie"
          placeholder="영화 제목을 검색하세요"
          hideResults={false}
          onSelect={async movie => {
            const detail = await fetchMovieDetail(movie.id);
            setSelectedMovie(detail);
          }}
        />
      </View>

      {/* 🔥 나머지 화면 */}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* 안내 박스 */}
        {!loading && !selectedMovie && (
          <Animated.View style={[styles.infoBox, {opacity: fadeAnim}]}>
            <Text style={styles.infoTitle}>영화 검색을 시작해보세요</Text>
            <Text style={styles.infoDesc}>
              검색창에 영화 제목을 입력하면 정보를 보여드릴게요
            </Text>
          </Animated.View>
        )}

        {/* 로딩 */}
        {loading && <LoadingAnimation style={{marginTop: 20}} />}

        {/* 영화 상세 */}
        {!loading && selectedMovie && (
          <View style={{marginTop: 20}}>
            <MovieInfo movie={selectedMovie} isPost={false} />

            <Button
              type="submit"
              text="영화 다시 선택하기 ✨"
              height={44}
              onPress={() => {
                setSelectedMovie(null);
                setReason('');
              }}
              style={{marginBottom: 16}}
              textStyle={{fontSize: 15}}
            />
          </View>
        )}

        {/* 추천 이유 */}
        <Text style={styles.reasonLabel}>이 영화를 추천하는 이유</Text>

        <TextArea
          value={reason}
          onChangeText={setReason}
          placeholder="이 영화를 추천하는 이유를 작성해주세요"
          maxLength={300}
          autoGrow={false}
          style={{marginTop: 8, height: 130}}
        />

        {/* 제출 */}
        <Button
          type="submit"
          text="추천글 등록하기"
          height={48}
          disabled={isSubmitDisabled}
          onPress={() => {
            console.log('제출!', {selectedMovie, reason});
          }}
          style={{marginTop: 20, marginBottom: 40}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  /* 🔥 검색창 absolute 고정 */
  searchWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    backgroundColor: '#FAFAFA',
    zIndex: 9999,
    elevation: 9999,
  },

  content: {
    paddingTop: 90, // 🔥 검색창 높이만큼 아래로 내림
    paddingHorizontal: 16,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },

  infoBox: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },

  infoDesc: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },

  reasonLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginTop: 20,
  },
});
