import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MyPageTab from '../../components/mypage/buttontabs/MyPageTab';
import ProfileList from '../../components/mypage/lists/ProfileLists';

import {
  getFollowerList,
  getFollowingList,
  followUser,
  unfollowUser,
} from '../../utils/FollowApi';

const {width} = Dimensions.get('window');

export default function FollowScreen() {
  const scrollRef = useRef(null);

  const route = useRoute();
  const {
    nickname = '사용자',
    type = 'following',
    targetUserId,
  } = route.params ?? {};

  /** 🔥 내 로그인 ID */
  const [myUserId, setMyUserId] = useState(null);

  /** 🔥 리스트 상태 */
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  /** 🔥 초기 탭 */
  const initialIndex = type === 'follower' ? 1 : 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  /** ---------------------------------
   * 🔥 내 ID 불러오기
   * --------------------------------- */
  useEffect(() => {
    const loadMyId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setMyUserId(id);
    };
    loadMyId();
  }, []);

  /** ---------------------------------
   * 🔥 팔로잉 / 팔로워 조회
   * --------------------------------- */
  const fetchFollowing = async () => {
    const data = await getFollowingList(targetUserId);
    setFollowingList(data);
  };

  const fetchFollower = async () => {
    const data = await getFollowerList(targetUserId);
    setFollowerList(data);
  };

  useEffect(() => {
    if (!targetUserId) return;
    fetchFollowing();
    fetchFollower();
  }, [targetUserId]);

  /** ---------------------------------
   * 🔥 팔로우 / 언팔
   * --------------------------------- */
  const handleFollow = async id => {
    if (!myUserId) return;
    await followUser(myUserId, id);
    await fetchFollowing();
    await fetchFollower();
  };

  const handleUnfollow = async id => {
    if (!myUserId) return;
    await unfollowUser(myUserId, id);
    await fetchFollowing();
    await fetchFollower();
  };

  /** 🔥 최초 진입 시 스크롤 위치 보정 */
  useEffect(() => {
    scrollRef.current?.scrollTo({
      x: width * initialIndex,
      animated: false,
    });
  }, []);

  /** ▼ 탭 눌렀을 때 */
  const handleTabChange = index => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({x: width * index, animated: true});
  };

  /** ▼ 스크롤 끝 */
  const handleScrollEnd = e => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(page);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* 상단 제목 */}
      <Text style={styles.title}>
        {nickname}의 {activeIndex === 0 ? '팔로잉' : '팔로워'}
      </Text>

      {/* 탭 */}
      <MyPageTab
        labels={['팔로잉', '팔로워']}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />

      {/* 스크롤 영역 */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={{flex: 1}}>
        {/* 팔로잉 */}
        <View style={{width}}>
          <ProfileList
            data={followingList}
            mode="following"
            myUserId={myUserId}
            onPressUnfollow={handleUnfollow}
          />
        </View>

        {/* 팔로워 */}
        <View style={{width}}>
          <ProfileList
            data={followerList}
            mode="follower"
            myUserId={myUserId}
            onPressFollow={handleFollow}
            onPressUnfollow={handleUnfollow}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    padding: 20,
    paddingBottom: 10,
    color: '#001c33',
  },
});
