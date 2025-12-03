import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import MediaCards from '../cards/MediaCards';

export default function MediaListSection({
  title,
  items = [],
  variant = 'movie', // 'movie' | 'music' | 'post'
  onPressItem,
}) {
  // 데이터가 없으면 섹션 자체를 숨김
  if (!items || items.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* 섹션 제목 */}
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* 가로 스크롤 카드 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {items.map(item => (
          <MediaCards
            key={item.id}
            title={item.title || item.name}
            author={item.author} // 사용자 추천글에서 사용
            image={
              variant === 'movie'
                ? `https://image.tmdb.org/t/p/w500${
                    item.poster_path ?? item.image
                  }`
                : item.image
            }
            variant={variant}
            onPress={() => onPressItem?.(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  scrollContainer: {
    paddingLeft: 10,
    paddingRight: 4,
  },
});
