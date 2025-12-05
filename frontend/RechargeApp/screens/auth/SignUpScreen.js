import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import SelectableButton from '../../components/common/SelectableButton';

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('010');
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({
    top: 0,
    left: 0,
    width: 100,
  });

  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const nicknameRef = useRef(null);
  const birthRef = useRef(null);
  const phoneRef = useRef(null);

  const phonePrefixOptions = ['010', '011', '016', '017', '018', '019'];

  const openPhoneDropdown = () => {
    dropdownRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownPos({top: py + height + 4, left: px, width});
      setShowPhoneDropdown(true);
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>회원가입</Text>

      <View style={styles.inputWithButton}>
        <TextInput
          label="아이디"
          placeholder="아이디를 입력하세요"
          width={'75%'}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <Button
          text="중복확인"
          type="submit"
          width={65}
          fontSize={12}
          style={styles.checkBtn}
        />
      </View>

      <View style={styles.inputWithButton}>
        <TextInput
          ref={passwordRef}
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          secureTextEntry
          style={{marginTop: 20}}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
      </View>

      <View style={styles.inputWithButton}>
        <TextInput
          ref={emailRef}
          width={'75%'}
          label="이메일"
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력하세요"
          errorMessage={
            !email.includes('@') && email
              ? '올바른 이메일 형식이 아닙니다.'
              : ''
          }
          style={{marginTop: 20}}
          returnKeyType="next"
          onSubmitEditing={() => nameRef.current?.focus()}
        />

        <Button
          text="인증하기"
          type="submit"
          width={65}
          fontSize={12}
          style={styles.checkEmailBtn}
        />
      </View>

      <View style={styles.inputWithButton}>
        <TextInput
          ref={nameRef}
          label="이름"
          placeholder="이름을 입력하세요"
          style={{marginTop: 20}}
          returnKeyType="next"
          onSubmitEditing={() => nicknameRef.current?.focus()}
        />
      </View>

      <View style={styles.inputWithButton}>
        <TextInput
          ref={nicknameRef}
          width={'75%'}
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          style={{marginTop: 20}}
          returnKeyType="next"
          onSubmitEditing={() => birthRef.current?.focus()}
        />

        <Button
          text="중복확인"
          type="submit"
          width={65}
          fontSize={12}
          style={styles.checknicknameBtn}
        />
      </View>

      <View style={styles.inputWithButton}>
        <TextInput
          ref={birthRef}
          label="생년월일"
          placeholder="생년월일 8자리 (예: 19900101)"
          style={{marginTop: 20}}
        />
      </View>

      <View style={styles.radioWithButton}>
        <Text style={styles.genderHeader}>성별</Text>
        <View style={styles.genderBtn}>
          <SelectableButton
            label="남자"
            selected={gender === 'male'}
            onPress={() => setGender(gender === 'male' ? '' : 'male')}
            style={{marginRight: 10, width: 148, borderRadius: 10}}
          />
          <SelectableButton
            label="여자"
            selected={gender === 'female'}
            onPress={() => setGender(gender === 'female' ? '' : 'female')}
            style={{width: 148, borderRadius: 10}}
          />
        </View>

        <View style={styles.phoneWithButton}>
          <Text style={styles.phoneHeader}>전화번호</Text>

          <View style={styles.phoneRow}>
            {/* 🔽 앞자리 드롭다운 영역 */}
            <TouchableOpacity
              ref={dropdownRef}
              style={styles.phonePrefixBox}
              onPress={openPhoneDropdown}>
              <Text style={styles.phonePrefixText}>{phonePrefix}</Text>
              <Text style={{fontSize: 12}}>▼</Text>
            </TouchableOpacity>

            {/* 전화번호 입력 */}
            <TextInput
              width={'87%'}
              placeholder="전화번호를 입력하세요 (- 제외)"
              keyboardType="number-pad"
              maxLength={8}
              style={{marginLeft: 10}}
            />
          </View>
          <Modal visible={showPhoneDropdown} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={() => setShowPhoneDropdown(false)}
                activeOpacity={1}
              />
              <View
                style={[
                  styles.dropdownBox,
                  {
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: dropdownPos.width,
                  },
                ]}>
                <ScrollView
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}>
                  {phonePrefixOptions.map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={[
                        styles.phoneOption,
                        phonePrefix === item && styles.phoneOptionSelected,
                      ]}
                      onPress={() => {
                        setPhonePrefix(item);
                        setShowPhoneDropdown(false);
                      }}>
                      <Text style={{fontSize: 14}}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      </View>
      <View style={styles.inputWithButton}>
        <TextInput
          label="차종"
          placeholder="차종을 입력하세요"
          style={{marginTop: 20}}
        />
      </View>
      <View style={styles.inputWithButton}>
        <TextInput
          label="차종"
          placeholder="차종을 입력하세요"
          style={{marginTop: 20}}
        />
      </View>

      <View style={styles.submitButton}>
        <Button
          text="회원가입"
          type="submit"
          style={{marginTop: 50, marginBottom: 20}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004E89',
    marginBottom: 20,
  },
  inputWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '85%',
  },
  checkBtn: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 10,
    marginTop: 25,
    height: 47.5,
  },
  checkBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkEmailBtn: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 10,
    marginTop: 45,
    height: 47.5,
  },
  checknicknameBtn: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 10,
    marginTop: 45,
    height: 47.5,
  },
  radioWithButton: {
    flexDirection: 'column',
    gap: 8,
    width: '85%',
  },

  genderHeader: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
    marginTop: 25,
  },
  genderBtn: {
    flexDirection: 'row',
  },
  phoneWithButton: {
    flexDirection: 'column',
    gap: 8,
    width: '85%',
  },
  phoneHeader: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
    marginTop: 25,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  phonePrefixBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  phonePrefixText: {
    fontSize: 14,
    color: '#111',
    fontWeight: '500',
  },

  dropdownBox: {
    position: 'absolute',
    backgroundColor: '#fff',
    maxHeight: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
    elevation: 15,
    zIndex: 9999,
  },

  phoneOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  phoneOptionSelected: {
    backgroundColor: '#E5F1FB',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '85%',
  },
});
