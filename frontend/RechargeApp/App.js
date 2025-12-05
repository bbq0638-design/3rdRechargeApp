import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NoticeStack from './components/layout/notice/NoticeStack';
import BottomNavigation from './components/layout/BottomNavigation';
import SettingStack from './components/layout/setting/SettingStack';
// 필요 시 로그인/회원가입 페이지 추가
// import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // ❗ 최상단에서는 헤더 절대 X
        }}
      >

        {/* 🔥 앱 기본 화면(하단 탭 네비게이션) */}
        <Stack.Screen name="MainTabs">
          {() => <BottomNavigation isLoggedIn={isLoggedIn} />}
        </Stack.Screen>
       {/* 🔥 공지사항 스택 (Header에서 이동) */}
        <Stack.Screen name="NoticeStack" component={NoticeStack} />
        {/* 🔥 설정 스택 (Header에서 이동) */}
        <Stack.Screen name="SettingStack" component={SettingStack} />

        {/* 🔥 로그인 / 회원가입 같이 헤더 없는 화면들 */}
        {/* <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}