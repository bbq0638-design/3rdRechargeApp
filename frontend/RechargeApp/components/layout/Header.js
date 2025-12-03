import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../common/Button';
import IconButton from '../common/iconButton';

export default function Header({
  navigation,
  isLoggedIn,
  onLogin,
  onSignup,
  onLogout,
}) {
  // navigation.canGoBack()은 무조건 안전 (Navigator가 props로 넘기기 때문)
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.header}>
      {/* 왼쪽 영역 */}
      <View style={styles.left}>
        {/* 뒤로가기 버튼 */}
        {canGoBack && (
          <TouchableOpacity
            style={{
              marginRight: 8,
              padding: 4,
              width: 32,
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#004E89"
            />
          </TouchableOpacity>
        )}

        {/* 로고 */}
        <MaterialCommunityIcons name="flash" size={24} color="#004E89" />
        <Text style={styles.title}>Re:Charge</Text>
      </View>

      {/* 오른쪽 영역 */}
      <View style={styles.right}>
        {isLoggedIn ? (
          <>
            {/*  공지사항 버튼  */}
            <IconButton
              type="notice"
              size={28}
              color="#585858ff"
              style={{marginRight: -2}}
              onPress={() => navigation.navigate('NoticeList')}
            />
            {/* 알림 */}
            <IconButton
              type="alarm"
              size={28}
              color="#585858ff"
              style={{marginRight: -2}}
              onPress={() => console.log('알림 클릭')}
            />

            {/* 로그아웃 */}
            <IconButton
              type="logout"
              size={28}
              color="#585858ff"
              onPress={onLogout}
              style={{marginRight: -15}}
            />
          </>
        ) : (
          <>
            {/* 로그인 */}
            <Button
              type="more"
              text="로그인"
              width={80}
              height={36}
              onPress={onLogin}
              style={{
                marginRight: 8,
                borderRadius: 20,
                borderWidth: 0,
              }}
              textStyle={{fontSize: 14}}
            />

            {/* 회원가입 */}
            <Button
              type="submit"
              text="회원가입"
              width={80}
              height={36}
              onPress={onSignup}
              style={{borderRadius: 20}}
              textStyle={{fontSize: 14}}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#004E89',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
