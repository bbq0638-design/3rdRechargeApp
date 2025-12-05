import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, Platform, Alert} from 'react-native';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
import {login} from '../../utils/api';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation, route}) {
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const {setIsLoggedIn} = route.params;

  const handleLogin = async () => {
    try {
      const {token, userNickname} = await login({userId, userPwd});

      await AsyncStorage.setItem('authToken', token);

      Alert.alert('로그인 성공', `${userNickname}님 환영합니다.`);

      setIsLoggedIn(true); // 🔥 최상단 분기로 이동
    } catch (error) {
      Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
      console.log('로그인 실패:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>로그인</Text>
        <Text style={styles.subText}>Re:charge에 오신 것을 환영합니다.</Text>
      </View>

      <View style={styles.centerBox}>
        <TextInput
          placeholder="아이디를 입력하세요."
          width="85%"
          value={userId}
          onChangeText={setUserId}
          style={styles.idInput}
        />
        <TextInput
          placeholder="비밀번호를 입력하세요."
          width="85%"
          value={userPwd}
          onChangeText={setUserPwd}
          secureTextEntry
        />

        <Button
          text="로그인"
          type="submit"
          width="85%"
          style={{marginTop: 25}}
          onPress={handleLogin}
        />

        {/* 아이디/비밀번호 찾기 영역 */}
        <View style={styles.findArea}>
          <Pressable onPress={() => navigation.navigate('FindIdScreen')}>
            {({pressed}) => (
              <Text
                style={[
                  styles.findText,
                  {textDecorationLine: 'underline'},
                  pressed && styles.pressedText,
                ]}>
                아이디
              </Text>
            )}
          </Pressable>

          <Text style={styles.findAreaText}>또는</Text>

          <Pressable onPress={() => navigation.navigate('FindPwdScreen')}>
            {({pressed}) => (
              <Text
                style={[
                  styles.findText,
                  {textDecorationLine: 'underline'},
                  pressed && styles.pressedText,
                ]}>
                비밀번호
              </Text>
            )}
          </Pressable>

          <Text style={styles.findAreaText}>를 잊으셨나요?</Text>
        </View>

        {/* 가입하기 영역 */}
        <View style={styles.findArea}>
          <Text style={styles.findAreaText}>계정이 없으시다면</Text>
          <Pressable
            onPress={() => navigation.navigate('TermsAgreementScreen')}>
            {({pressed}) => (
              <Text
                style={[
                  styles.findText,
                  {textDecorationLine: 'underline'},
                  pressed && styles.pressedText,
                ]}>
                가입하기
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#004E89',
    marginBottom: 5,
  },
  subText: {
    fontSize: 13,
    color: '#374151',
  },
  centerBox: {
    width: '100%',
    alignItems: 'center',
  },
  idInput: {
    marginBottom: 15,
  },
  findArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
  },
  findText: {
    color: '#004E89',
    fontWeight: '800',
  },
  findAreaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    paddingRight: 3,
    paddingLeft: 3,
  },
  pressedText: {
    opacity: 0.6, // 눌렸을 때 시각적 피드백
  },
});
