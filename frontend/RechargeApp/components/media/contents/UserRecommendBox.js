import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function UserRecommendBox({reason, nickname, style}) {
  if (!reason) return null;

  return (
    <View style={[styles.box, style]}>
      <Text style={styles.title}>추천 이유</Text>
      <Text style={styles.text}>{reason}</Text>

      {nickname && (
        <Text style={styles.by}>
          Recommended by <Text style={styles.name}>{nickname}</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  by: {
    fontSize: 13,
    color: '#888',
  },
  name: {
    color: '#004E89',
    fontWeight: '600',
  },
});

export default UserRecommendBox;
