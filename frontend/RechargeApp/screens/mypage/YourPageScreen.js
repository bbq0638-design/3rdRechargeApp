import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import ProfileHeader from '../../components/mypage/contents/ProfileHeader';
import MyPageTab from '../../components/mypage/buttontabs/MyPageTab';
import MyPostMediaList from '../../components/mypage/contents/MyPostMediaList';
import FavoriteMediaList from '../../components/mypage/contents/FavoriteMediaList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserFeed} from '../../utils/MyPageApi';

function YourPageScreen({navigation, route}) {
  const {targetUserId, targetUserNickname} = route.params;

  const [feed, setFeed] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  /** 🔹 상대방 userId 기준 피드 로딩 */
  useEffect(() => {
    const load = async () => {
      try {
        const loginId = await AsyncStorage.getItem('userId');
        setLoggedInUserId(loginId);

        if (!targetUserId) return;

        const feedData = await getUserFeed(targetUserId);
        setFeed(feedData);
      } catch (e) {
        console.log('YourPage feed 조회 실패:', e);
      }
    };

    load();
  }, [targetUserId]);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#F8F9F9'}}
      showsVerticalScrollIndicator={false}>
      {/* ⭐ 프로필 헤더 */}
      {feed && (
        <ProfileHeader
          nickname={targetUserNickname ?? feed.userNickname}
          isMine={false} // 🔥 내 페이지 아님
          postCount={feed.totalCount}
          followerCount={feed.totalFollower}
          followingCount={feed.totalFollowing}
          isFollowing={isFollowing}
          onToggleFollow={() => setIsFollowing(prev => !prev)}
        />
      )}

      {/* ⭐ 탭 */}
      <MyPageTab
        labels={['게시글', '즐겨찾기']}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
      />

      {/* ⭐ 상대 게시글 */}
      {activeIndex === 0 && targetUserId && (
        <MyPostMediaList
          userId={targetUserId}
          onPressItem={(item, type) => {
            if (type === 'movie') {
              navigation.navigate('Movie', {
                screen: 'MovieDetail',
                params: {
                  movieId: item.id, // ⭐ movieId 통일
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

      {/* ⭐ 상대 즐겨찾기 */}
      {activeIndex === 1 && (
        <FavoriteMediaList
          userId={targetUserId}
          hideFavorite
          onPressItem={(item, type) => {
            console.log('상대 즐겨찾기 클릭:', item, type);

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
