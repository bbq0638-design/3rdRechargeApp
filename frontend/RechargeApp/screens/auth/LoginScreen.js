import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';

export default function LoginScreen({navigation}) {
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
          style={styles.idInput}
        />
        <TextInput
          placeholder="비밀번호를 입력하세요."
          width="85%"
          secureTextEntry={true}
        />

        <Button
          text="로그인"
          type="submit"
          width="85%"
          style={{marginTop: 25}}
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
          <Pressable onPress={() => navigation.navigate('TermsAgreementScreen')}>
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
