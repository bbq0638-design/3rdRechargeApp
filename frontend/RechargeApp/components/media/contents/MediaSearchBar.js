import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import CustomTextInput from '../../common/TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingAnimation from '../../common/LoadingAnimation';

const TMDB_API_KEY = '6df9f08c130ae1944d95264798f87686';

function MediaSearchBar({
  type = 'movie',
  placeholder = '영화 제목을 검색하세요',
  onSelect,
  hideResults = false,
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPressed, setSearchPressed] = useState(false);

  /** 🔍 검색 함수 */
  const search = async text => {
    if (!text.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      /** 🎬 TMDB 영화 검색 */
      if (type === 'movie') {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: TMDB_API_KEY,
              language: 'ko-KR',
              query: text,
            },
          },
        );

        setResults(res.data.results.slice(0, 5));
      }

      /** 🎵 iTunes 음악 검색 */
      if (type === 'music') {
        const res = await axios.get('https://itunes.apple.com/search', {
          params: {term: text, media: 'music', limit: 5},
        });

        setResults(res.data.results);
      }
    } catch (e) {
      console.log('MediaSearchBar Error:', e);
    } finally {
      setLoading(false);
    }
  };

  /** ✨ 디바운싱 */
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!hideResults) search(query);
    }, 700);

    return () => clearTimeout(delay);
  }, [query, hideResults]);

  /** 리스트 아이템 렌더 */
  const renderItem = ({item}) => {
    const title = type === 'movie' ? item.title : item.trackName;
    const sub = type === 'movie' ? item.release_date : item.artistName;

    const thumbnail =
      type === 'movie'
        ? item.poster_path
          ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
          : 'https://via.placeholder.com/92x138?text=No+Image'
        : item.artworkUrl100;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Keyboard.dismiss();
          setQuery('');
          setResults([]);
          onSelect?.(item);
        }}>
        <Image source={{uri: thumbnail}} style={styles.thumbnail} />
        <View style={{marginLeft: 10}}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemSub}>{sub}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* 입력창 + 검색 버튼 */}
      <View style={styles.inputRow}>
        <CustomTextInput
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          height={48}
          style={{flex: 1}}
        />

        <Pressable
          onPress={() => search(query)}
          onPressIn={() => setSearchPressed(true)}
          onPressOut={() => setSearchPressed(false)}
          style={[
            styles.searchButton,
            searchPressed && {backgroundColor: '#003766'},
          ]}>
          <MaterialCommunityIcons name="magnify" size={22} color="#fff" />
        </Pressable>
      </View>

      {/* 로딩 */}
      {loading && (
        <View style={{marginTop: 12}}>
          <LoadingAnimation size={40} />
        </View>
      )}

      {!hideResults && !loading && results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item =>
            type === 'movie' ? item.id?.toString() : item.trackId?.toString()
          }
          nestedScrollEnabled
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          style={styles.resultBox}
        />
      )}
    </View>
  );
}

export default MediaSearchBar;

/* 🎨 스타일 */
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 16,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchButton: {
    marginLeft: 10,
    backgroundColor: '#004E89',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 4,
  },

  resultBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 6,
    maxHeight: 240,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  thumbnail: {
    width: 45,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#DDD',
  },

  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  itemSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
});
