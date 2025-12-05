import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../common/iconButton';

export default function ChargerItem({
  name,
  company,
  address1,
  address2,
  chargers = [], // 🔥 chargers 기반 요약
  distanceKm,
  onPress,
}) {
  const fullAddress = `${address1} ${address2 || ''}`.trim();

  /** -----------------------------------
   * 🔥 타입 목록(중복 제거)
   ------------------------------------ */
  const types = [...new Set(chargers.map(c => c.type))];

  /** -----------------------------------
   * 🔥 총 available / 총 total
   ------------------------------------ */
  const available = chargers.reduce((sum, c) => sum + c.available, 0);
  const total = chargers.reduce((sum, c) => sum + c.total, 0);

  /** -----------------------------------
   * 🔥 개별 속도 라벨 함수
   ------------------------------------ */
  const getLabelForKw = kw => {
    if (kw <= 70) return '완속';
    if (kw >= 150) return '급속';
    return '중속';
  };

  /** -----------------------------------
   * 🔥 색상 계산
   ------------------------------------ */
  const getAvailableColor = () => {
    if (available === 0) return '#DC2626';
    const ratio = available / total;
    if (ratio <= 0.5) return '#F97316';
    return '#16A34A';
  };

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        pressed && {borderColor: '#004E89', borderWidth: 2},
      ]}>
      <View style={styles.card}>
        {/* row1: 이름 + 거리 */}
        <View style={styles.rowBtween}>
          <Text style={styles.title}>{name}</Text>
          {distanceKm !== undefined && (
            <Text style={styles.distance}>{distanceKm}km</Text>
          )}
        </View>

        {/* row2: 주소 */}
        <View style={styles.row}>
          <IconButton
            type="charge"
            size={16}
            color="#6B7280"
            style={{marginLeft: -9}}
          />
          <Text style={styles.address}>{fullAddress}</Text>
        </View>

        {/* row3: 회사 */}
        <Text style={styles.company}>{company}</Text>

        {/* row4: 타입 */}
        <Text style={styles.types}>{types.join(', ')}</Text>

        {/* row5: 사용가능 + 속도 */}
        <View style={styles.bottomRow}>
          {/* 사용가능/총대수 */}
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="battery-charging-outline"
              size={16}
              color="#6B7280"
              style={{marginRight: 4}}
            />
            <Text style={[styles.text, {color: getAvailableColor()}]}>
              {available}/{total} 사용가능
            </Text>
          </View>

          {/* 🔥 속도 여러개 → 세로로 각각 표시 */}
          <View style={{flexDirection: 'column'}}>
            {chargers.map((c, index) => {
              const label = getLabelForKw(c.kw);
              return (
                <View key={index} style={[styles.row, {marginBottom: 2}]}>
                  <MaterialCommunityIcons
                    name="lightning-bolt-outline"
                    size={16}
                    color="#16A34A"
                    style={{marginRight: 4}}
                  />
                  <Text style={[styles.text, styles.speed]}>
                    {c.kw}kW ({label})
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bebebeff',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  rowBtween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginRight: 10,
    flexShrink: 1,
  },
  distance: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  address: {
    fontSize: 14,
    color: '#4B5563',
  },
  company: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 4,
  },
  types: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  text: {
    color: '#374151',
    fontSize: 14,
  },
  speed: {
    fontWeight: '600',
  },
});
