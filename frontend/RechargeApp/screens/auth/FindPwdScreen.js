import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';

export default function FindPwdScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>비밀번호 찾기</Text>
        <Text style={styles.subText}>
          가입 시 등록한 이메일로 비밀번호를 재설정할 수 있습니다.
        </Text>
      </View>

      
      <View style={styles.centerBox}>

        <TextInput
          placeholder="아이디를 입력하세요."
          width="85%"
          style={styles.idInput}
        />

        <TextInput
          placeholder="이름을 입력하세요."
          width="85%"
          style={styles.idInput}
        />
        <TextInput
          placeholder="이메일을 입력하세요."
          width="85%"
          secureTextEntry={true}
        />

        <Button
          text="비밀번호 찾기"
          type="submit"
          width="85%"
          style={{marginTop: 25}}
          onPress={() => navigation.navigate('FindPwdResult')}
        />
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
    opacity: 0.6,
  },
});
