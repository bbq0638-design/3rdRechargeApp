import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const MediaCards = ({title, author, image, onPress, variant}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onStartShouldSetResponder={() => true} // ⭐ 스크롤보다 터치를 우선!
      style={[
        styles.card,
        variant === 'music' ? styles.musicCard : styles.movieCard,
      ]}>
      {/* 포스터 */}
      <Image
        source={{uri: image}}
        style={variant === 'music' ? styles.musicImage : styles.movieImage}
      />

      {/* 제목 */}
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      {/* 작성자 */}
      {author && (
        <Text style={styles.author} numberOfLines={1}>
          by {author}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
  },
  movieCard: {
    width: 160,
  },
  movieImage: {
    width: 160,
    height: 220,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: '#e3e3e3',
  },
  musicCard: {
    width: 140,
  },
  musicImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: '#e3e3e3',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  author: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});

export default MediaCards;
