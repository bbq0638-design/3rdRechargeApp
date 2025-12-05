import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from './components/layout/BottomNavigation';
import AuthStack from './components/layout/auth/AuthStack';
import NoticeStack from './components/layout/notice/NoticeStack'; 
import SettingStack from './components/layout/setting/SettingStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true); // 토큰 체크 중인지

  // 🔍 앱 켜질 때 토큰 확인해서 로그인 여부 세팅
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setIsLoggedIn(!!token); // 토큰 있으면 true, 없으면 false
      } catch (e) {
        console.log('Token check error:', e);
        setIsLoggedIn(false);
      } finally {
        setChecking(false);
      }
    };

    checkToken();
  }, []);

  // 아직 토큰 체크 중이면 아무것도 안 뜨게 (원하면 스플래시 넣어도 됨)
  if (checking) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          // [수정 1] 여러 개의 Screen을 반환할 때는 반드시 Fragment(<>)로 감싸야 함
          <>
            {/* :fire: 앱 기본 화면(하단 탭 네비게이션) */}
            <Stack.Screen name="MainTabs">
              {() => <BottomNavigation isLoggedIn={isLoggedIn} />}
            </Stack.Screen>

            {/* :fire: 공지사항 스택 (Header에서 이동) */}
            <Stack.Screen name="NoticeStack" component={NoticeStack} />

            {/* :fire: 설정 스택 (Header에서 이동) */}
            <Stack.Screen name="SettingStack" component={SettingStack} />
          </>
        ) : (
          // ❌ 로그인 안 된 상태 → Auth만 존재
          <Stack.Screen name="Auth">
            {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}