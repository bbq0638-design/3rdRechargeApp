import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
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
  const [showSearchBar, setShowSearchBar] = useState(true);
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
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* 검색창 */}
        {showSearchBar && (
          <MediaSearchBar
            type="movie"
            placeholder="영화 제목을 검색하세요"
            hideResults={!!selectedMovie}
            onSelect={async movie => {
              const detail = await fetchMovieDetail(movie.id);
              setSelectedMovie(detail);
              setShowSearchBar(false);
            }}
          />
        )}

        {/* 안내 박스 */}
        {!loading && !selectedMovie && (
          <Animated.View style={[styles.infoPlaceholder, {opacity: fadeAnim}]}>
            <Text style={styles.placeholderTitle}>
              영화 검색을 시작해보세요
            </Text>
            <Text style={styles.placeholderDesc}>
              검색창에 영화 제목을 입력하면 정보를 보여드릴게요
            </Text>
          </Animated.View>
        )}

        {loading && <LoadingAnimation style={{marginTop: 20}} />}

        {/* 상세 정보 + 다시 검색 */}
        {!loading && selectedMovie && (
          <View style={{marginTop: 20}}>
            <MovieInfo
              movie={selectedMovie}
              isPost={false}
              isMine={false}
              isAdmin={false}
            />

            <Button
              type="submit"
              text="영화 다시 검색하기 ✨"
              height={44}
              onPress={() => {
                Animated.timing(fadeAnim, {
                  toValue: 0,
                  duration: 250,
                  useNativeDriver: true,
                }).start(() => {
                  setSelectedMovie(null);
                  setShowSearchBar(true);
                  setReason('');
                });
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
          style={{marginTop: 8, height: 130}}
          autoGrow={false}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          text="추천글 등록하기"
          height={48}
          disabled={isSubmitDisabled}
          onPress={() => {
            console.log('제출!', {selectedMovie, reason});
          }}
          style={{marginTop: 16, marginBottom: 40}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#FAFAFA',
  },

  infoPlaceholder: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    minHeight: 300,
    justifyContent: 'center',
  },

  placeholderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 6,
  },
  placeholderDesc: {
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
