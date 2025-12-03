import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../../components/common/iconButton';

export default function IconButtonTest() {
  const [liked, setLiked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>IconButton Test</Text>

      {/* Row 1 */}
      <Text style={styles.label}>기본 아이콘들</Text>
      <View style={styles.row}>
        <TestItem label="영화" type="movie" />
        <TestItem label="음악" type="music" />
        <TestItem label="게시판" type="board" />
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <TestItem label="알림" type="alarm" />
        <TestItem label="공지" type="notice" />
        <TestItem label="마이페이지" type="mypage" />
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <TestItem label="로그아웃" type="logout" />
        <TestItem label="프로필 수정" type="profileEdit" />
        <TestItem label="댓글 삭제" type="commentDelete" />
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <TestItem label="댓글 수정" type="commentEdit" />
        <TestItem label="운세" type="fortune" />
        <TestItem label="충전" type="charge" />
      </View>

      {/* Row 5 */}
      <View style={styles.row}>
        <TestItem label="현재 위치" type="currentLocation" />
        <TestItem label="신고" type="report" />
        
        <View style={styles.testBlock}>
          <Text style={styles.blockLabel}>좋아요 (토글)</Text>
          <IconButton
            type="like"
            toggled={liked}
            onPress={() => setLiked(!liked)}
            size={30}
          />
        </View>
      </View>

    </ScrollView>
  );
}

// 작은 테스트 블록 재사용 컴포넌트
function TestItem({ label, type }) {
  return (
    <View style={styles.testBlock}>
      <Text style={styles.blockLabel}>{label}</Text>
      <IconButton type={type} size={30} onPress={() => console.log(label)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  testBlock: {
    alignItems: 'center',
    width: '30%',
  },
  blockLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
    textAlign: 'center',
  },
});
