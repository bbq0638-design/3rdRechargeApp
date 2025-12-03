import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  primary: '#004E89',
  primaryDark: '#003766',
  yellow: '#F4C10F',
  text: '#000',
  shadow: '#000',
  border: '#D1D5DB',
};

export default function FavoriteButton({isFavorite, onPress, style}) {
  const [pressed, setPressed] = useState(false);

  const bgColor = pressed
    ? isFavorite
      ? COLORS.primaryDark
      : COLORS.border
    : isFavorite
    ? COLORS.primary
    : '#FFFFFF';

  const textColor = isFavorite ? COLORS.border : COLORS.text;
  const iconColor = isFavorite ? COLORS.yellow : COLORS.primary;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.button,
        {
          backgroundColor: bgColor,
          borderColor: isFavorite ? COLORS.primary : COLORS.primary,
          borderWidth: 1,
        },
        style,
      ]}>
      <View style={styles.row}>
        <MaterialCommunityIcons
          name={isFavorite ? 'star' : 'star-outline'}
          size={20}
          color={iconColor}
        />
        <Text style={[styles.label, {color: textColor}]}>
          {isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    // Button.js shadow 그대로
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
