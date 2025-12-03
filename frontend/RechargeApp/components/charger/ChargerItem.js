import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../common/iconButton';
import LinearGradient from 'react-native-linear-gradient';

export default function ChargerItem({
  name,
  company,
  address1,
  address2,
  available,
  total,
  speedKw,
  types = [],
  distanceKm,
}) {
  const fullAddress = `${address1} ${address2 || ''}`.trim();

  const getSpeedLabel = () => {
    if (speedKw <= 70) return '완속';
    if (speedKw >= 150) return '급속';
    return '중속';
  };

  const getAvailableColor = () => {
    if (available === 0) return '#DC2626';
    const ratio = available / total;
    if (ratio <= 0.5) return '#F97316';
    return '#16A34A';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          'rgba(126, 126, 126, 0.07)',
          'rgba(126, 126, 126, 0.07)',
          'transparent',
        ]}
        style={styles.gradient}
      />

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
            style={{marginRight: 4}}
          />
          <Text style={styles.address}>{fullAddress}</Text>
        </View>

        {/* row3: 회사 */}
        <Text style={styles.company}>{company}</Text>

        {/* row4: 타입 */}
        <Text style={styles.types}>{types.join(', ')}</Text>

        {/* row5: 사용가능 + 속도 */}
        <View style={styles.bottomRow}>
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

          <View style={styles.row}>
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={16}
              color="#16A34A"
              style={{marginRight: 4}}
            />
            <Text style={[styles.text, styles.speed]}>
              {speedKw}kW ({getSpeedLabel()})
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
    marginTop: 5,
  },

  gradient: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    height: 210,
    zIndex: 0,
    borderRadius: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    zIndex: 2,
    borderWidth: 1,
    borderColor: '#bebebeff',
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
    flexShrink: 1,
    marginRight: 10,
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
