import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../common/Button';
import CustomTextInput from '../../common/TextInput';
import MediaCards from '../cards/MediaCards';
import SelectableButton from '../../common/SelectableButton';
import LoadingAnimation from '../../common/LoadingAnimation';

function AiRecommendModal({
  visible,
  onClose,
  contentType = 'movie',
  onResultPress,
}) {
  const [mode, setMode] = useState('weather');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = id => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const placeholder =
    mode === 'weather'
      ? `예) 맑은 날씨에 어울리는 ${
          contentType === 'movie' ? '영화' : '음악'
        } 추천해줘`
      : `예) 기분 좋을 때 듣기 좋은 ${
          contentType === 'movie' ? '영화' : '음악'
        } 추천해줘`;

  const mockMovie = [
    {id: '1', title: 'Movie 1', img: 'https://placehold.co/185x278?text=M1'},
    {id: '2', title: 'Movie 2', img: 'https://placehold.co/185x278?text=M2'},
    {id: '3', title: 'Movie 3', img: 'https://placehold.co/185x278?text=M3'},
    {id: '4', title: 'Movie 4', img: 'https://placehold.co/185x278?text=M4'},
  ];

  const mockMusic = [
    {
      id: 'A1',
      title: 'Music A1',
      artist: '가수',
      img: 'https://placehold.co/185x278?text=S1',
    },
    {
      id: 'A2',
      title: 'Music A2',
      artist: '가수',
      img: 'https://placehold.co/185x278?text=S2',
    },
    {
      id: 'A3',
      title: 'Music A3',
      artist: '가수',
      img: 'https://placehold.co/185x278?text=S3',
    },
    {
      id: 'A4',
      title: 'Music A4',
      artist: '가수',
      img: 'https://placehold.co/185x278?text=S4',
    },
  ];

  // 🔥 모달 닫힐 때 상태 초기화
  useEffect(() => {
    if (!visible) {
      setItems([]);
      setQuery('');
      setLoading(false);
    }
  }, [visible]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setItems(contentType === 'movie' ? mockMovie : mockMusic);
      setLoading(false);
    }, 500);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      backdropOpacity={0.45}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={250}
      animationOutTiming={200}
      style={{margin: 0, justifyContent: 'flex-end'}}>
      <View style={styles.modalContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.title}>
            AI {contentType === 'movie' ? '영화' : '음악'} 추천
          </Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialCommunityIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* 날씨/기분 선택 */}
        <View style={styles.tabs}>
          <SelectableButton
            label="날씨"
            selected={mode === 'weather'}
            onPress={() => setMode('weather')}
            icon={<MaterialCommunityIcons name="weather-sunny" />}
            style={{marginRight: 10}}
          />
          <SelectableButton
            label="기분"
            selected={mode === 'mood'}
            onPress={() => setMode('mood')}
            icon={<MaterialCommunityIcons name="emoticon-happy-outline" />}
            style={{marginRight: 10}}
          />
        </View>

        {/* 입력창 */}
        <CustomTextInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          width="100%"
          height={50}
          style={{marginTop: 10}}
        />

        {/* 요청 버튼 */}
        <Button
          type="submit"
          text={loading ? '분석 중...' : '추천받기'}
          height={50}
          onPress={handleSubmit}
          disabled={!query.trim() || loading}
          style={{marginTop: 16}}
        />

        {/* 결과 */}
        <ScrollView contentContainerStyle={styles.results}>
          {loading ? (
            <LoadingAnimation size={90} />
          ) : items.length > 0 ? (
            <View style={styles.grid}>
              {items.map(item => (
                <MediaCards
                  key={item.id}
                  title={item.title}
                  author={item.artist}
                  image={item.img}
                  variant={contentType}
                  style={{marginBottom: 10}}
                  isFavorite={!!favorites[item.id]}
                  onFavoriteToggle={() => toggleFavorite(item.id)}
                  onPress={() => {
                    onClose();
                    onResultPress?.(item, contentType);
                  }}
                />
              ))}
            </View>
          ) : (
            <Text style={styles.empty}>추천 결과를 찾을 수 없습니다.</Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontSize: 20, fontWeight: '700'},
  tabs: {flexDirection: 'row', marginTop: 20},
  results: {marginTop: 20, paddingBottom: 20},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  empty: {textAlign: 'center', color: '#777', fontSize: 15},
});

export default AiRecommendModal;
