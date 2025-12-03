import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ChargerItem from './ChargerItem';

export default function ChargerList({data = [], count = 0}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(182,182,182,0.12)', 'rgba(182,182,182,0.12)']}
        style={styles.gradient}
      />

      <View style={styles.wrapper}>
        <View style={styles.header} />
        <Text style={styles.title}>주변 충전소 ({count})</Text>

        <ScrollView
          contentContainerStyle={{paddingBottom: 30, flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          {data.length > 0 ? (
            data.map((item, index) => <ChargerItem key={index} {...item} />)
          ) : (
            <Text style={styles.placeholder}>충전소 정보를 불러오는 중...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ⚡ 리스트 높이 확보 핵심
    width: '100%',
  },

  gradient: {
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 0,
    borderRadius: 30,
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: -4},
    shadowRadius: 18,
    elevation: 10,
    zIndex: 2,
  },

  header: {
    width: 100,
    height: 7,
    alignSelf: 'center',
    backgroundColor: '#f0efef',
    marginBottom: 20,
    borderRadius: 30,
    elevation: 0.5,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111827',
    textAlign: 'center',
  },

  placeholder: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#6B7280',
  },
});
