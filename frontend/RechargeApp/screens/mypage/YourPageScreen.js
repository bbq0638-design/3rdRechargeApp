// screens/mypage/YourPageScreen.js
import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import ProfileHeader from '../../components/mypage/contents/ProfileHeader';
import MyPageTab from '../../components/mypage/buttontabs/MyPageTab';
import MyPostMediaList from '../../components/mypage/contents/MyPostMediaList';
import FavoriteMediaList from '../../components/mypage/contents/FavoriteMediaList';

import {getUserFeed} from '../../utils/MyPageApi';
import {followUser, unfollowUser, checkFollow} from '../../utils/FollowApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

function YourPageScreen({navigation, route}) {
  const {targetUserId, targetUserNickname} = route.params ?? {};

  const [feed, setFeed] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [myUserId, setMyUserId] = useState(null);

  /** 🔹 내 페이지 여부 */
  const isMine = myUserId === targetUserId;

  /** ---------------------------------
   * 🔹 로그인 유저 ID + 팔로우 상태 초기화
   * --------------------------------- */
  useEffect(() => {
    const init = async () => {
      try {
        const loginId = await AsyncStorage.getItem('userId');
        setMyUserId(loginId);

        if (loginId && targetUserId) {
          const following = await checkFollow(loginId, targetUserId);
          setIsFollowing(following);
        }
      } catch (e) {
        console.log('YourPage 초기화 실패:', e);
      }
    };

    init();
  }, [targetUserId]);

  /** ---------------------------------
   * 🔹 상대방 피드 조회
   * --------------------------------- */
  const fetchFeed = async () => {
    if (!targetUserId) return;

    try {
      const feedData = await getUserFeed(targetUserId);
      setFeed(feedData);
    } catch (e) {
      console.log('YourPage feed 조회 실패:', e);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [targetUserId]);

  /** 🔥 FollowScreen 다녀오면 자동 갱신 */
  useFocusEffect(
    useCallback(() => {
      fetchFeed();
    }, [targetUserId]),
  );

  /** ---------------------------------
   * 🔹 팔로우 / 언팔로우
   * --------------------------------- */
  const handleToggleFollow = async () => {
    if (!myUserId || !targetUserId) return;

    try {
      if (isFollowing) {
        await unfollowUser(myUserId, targetUserId);
      } else {
        await followUser(myUserId, targetUserId);
      }

      setIsFollowing(prev => !prev);

      // ⭐ 서버 기준으로 다시 동기화
      await fetchFeed();
    } catch (e) {
      console.log('팔로우 토글 실패:', e);
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#F8F9F9'}}
      showsVerticalScrollIndicator={false}>
      {/* ⭐ 프로필 헤더 */}
      {feed && (
        <ProfileHeader
          nickname={targetUserNickname ?? feed.userNickname}
          isMine={isMine}
          postCount={feed.totalCount}
          followerCount={feed.totalFollower}
          followingCount={feed.totalFollowing}
          isFollowing={isFollowing}
          onToggleFollow={handleToggleFollow}
          onPressFollower={() =>
            navigation.navigate('Follow', {
              type: 'follower',
              nickname: targetUserNickname ?? feed.userNickname,
              targetUserId,
            })
          }
          onPressFollowing={() =>
            navigation.navigate('Follow', {
              type: 'following',
              nickname: targetUserNickname ?? feed.userNickname,
              targetUserId,
            })
          }
        />
      )}

      {/* ⭐ 탭 */}
      <MyPageTab
        labels={['게시글', '즐겨찾기']}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
      />

      {/* ⭐ 게시글 */}
      {activeIndex === 0 && targetUserId && (
        <MyPostMediaList
          userId={targetUserId}
          onPressItem={(item, type) => {
            if (type === 'movie') {
              navigation.navigate('Movie', {
                screen: 'MovieDetail',
                params: {
                  movieId: item.id,
                  type: 'post',
                },
              });
            } else if (type === 'music') {
              navigation.navigate('Music', {
                screen: 'MusicDetail',
                params: {
                  postId: item.id,
                  type: 'post',
                },
              });
            }
          }}
        />
      )}

      {/* ⭐ 즐겨찾기 */}
      {activeIndex === 1 && targetUserId && (
        <FavoriteMediaList
          userId={targetUserId}
          hideFavorite
          onPressItem={(item, type) => {
            if (type === 'movie') {
              navigation.navigate('Movie', {
                screen: 'MovieDetail',
                params: {
                  movieId: item.id,
                  type: 'popular',
                },
              });
            }

            if (type === 'moviepost') {
              navigation.navigate('Movie', {
                screen: 'MovieDetail',
                params: {
                  movieId: item.id,
                  type: 'post',
                },
              });
            }
          }}
        />
      )}
    </ScrollView>
  );
}

export default YourPageScreen;
