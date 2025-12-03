import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IconButton from '../common/iconButton';
import MovieStackNavigation from './media/MovieStackNavigation';
import ChargerMainScreen from '../../screens/charger/ChargerMainScreen';

const ChargeScreen = () => (
  <View style={styles.screen}>
    <Text>충전소 찾기</Text>
  </View>
);
const MovieScreen = () => (
  <View style={styles.screen}>
    <Text>영화 추천</Text>
  </View>
);
const MusicScreen = () => (
  <View style={styles.screen}>
    <Text>음악 추천</Text>
  </View>
);
const FortuneScreen = () => (
  <View style={styles.screen}>
    <Text>오늘의 운세</Text>
  </View>
);
const BoardScreen = () => (
  <View style={styles.screen}>
    <Text>게시판</Text>
  </View>
);
const MyPageScreen = () => (
  <View style={styles.screen}>
    <Text>마이페이지</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#004E89',
  inactive: '#9CA3AF',
  background: '#F9FAFB',
  pressed: '#e5e5e5', // iconButton.js와 동일한 눌림 색상
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
        component={ChargerMainScreen}
        options={{
          tabBarLabel: '충전',
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
        component={MusicScreen}
        options={{
          tabBarLabel: '음악',
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
        component={FortuneScreen}
        options={{
          tabBarLabel: '운세',
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
        component={BoardScreen}
        options={{
          tabBarLabel: '게시판',
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
        component={MyPageScreen}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({color}) => (
            <View pointerEvents="none" style={styles.iconContainer}>
              <IconButton
                type="mypage"
                color={color}
                size={24}
                style={styles.iconButton}
              />
            </View>
          ),
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
