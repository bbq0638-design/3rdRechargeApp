import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconButton from '../common/iconButton';
import BoardStack from './board/BoardStack';
import ChargerStack from './charger/ChargerStack';
import FortuneStack from './fortune/FortuneStack';
import NoticeStack from './notice/NoticeStack';
import SettingStack from './setting/SettingStack';
import MusicStackNavigation from './media/MusicStackNavigation';
import MyPageStackNavigation from './mypage/MypageStackNavigation';
import MovieStackNavigation from './media/MovieStackNavigation';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#004E89',
  inactive: '#9CA3AF',
  background: '#F9FAFB',
  pressed: '#e5e5e5',
};

// 누를 때 회색
const CustomTabButton = props => {
  const {onPress, onLongPress, children} = props;
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: pressed ? COLORS.pressed : 'transparent', // 눌렸을 때만 회색!
      }}>
      {children}
    </Pressable>
  );
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Charge"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        // 기존에 색이 안 빠지던 원인(tabBarActiveBackgroundColor)을 제거하고
        // 위에서 만든 CustomTabButton을 모든 탭 버튼으로 교체합니다.
        tabBarButton: props => <CustomTabButton {...props} />,

        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 65,
          paddingTop: 0,
          paddingBottom: Platform.OS === 'ios' ? 25 : 5,
          backgroundColor: COLORS.background,
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: -5,
          marginBottom: 5,
        },
      }}>
      {/* 1. 충전 */}
      <Tab.Screen
        name="Charge"
        component={ChargerStack}
        options={{
          tabBarLabel: '충전',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="charge"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
        }}
      />

      {/* 2. 영화 */}
      <Tab.Screen
        name="Movie"
        component={MovieStackNavigation}
        options={{
          tabBarLabel: '영화',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="movie"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
        }}
      />
      {/* 3. 음악 */}
      <Tab.Screen
        name="Music"
        component={MusicStackNavigation}
        options={{
          tabBarLabel: '음악',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="music"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
        }}
      />

      {/* 4. 운세 */}
      <Tab.Screen
        name="Fortune"
        component={FortuneStack}
        options={{
          tabBarLabel: '운세',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="fortune"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
        }}
      />

      {/* 5. 게시판 */}
      <Tab.Screen
        name="Board"
        component={BoardStack}
        options={{
          tabBarLabel: '게시판',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="board"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
        }}
      />

      {/* 6. 마이페이지 */}
      <Tab.Screen
        name="MyPage"
        component={MyPageStackNavigation}
        options={({navigation}) => ({
          tabBarLabel: '마이페이지',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton type="mypage" color={color} size={24} />
            </View>
          ),

          // ⭐ 탭 눌렀을 때 무조건 내 마이페이지로 reset!
          tabBarButton: props => (
            <CustomTabButton
              {...props}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'MyPage'}],
                });
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="NoticeStack"
        component={NoticeStack}
        options={{
          tabBarButton: () => null, // 버튼 숨기기
          headerShown: false, // NoticeStack 자체 헤더 사용
        }}
      />

      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarButton: () => null, // 버튼 숨기기
          headerShown: false, // SettingStack 자체 헤더 사용
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  iconButton: {
    backgroundColor: 'transparent',
  },
});
