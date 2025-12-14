import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, ScrollView, Text, Alert} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';

import CommentSection from '../../../components/common/CommentSection';
import UserRecommendBox from '../../../components/media/contents/UserRecommendBox';
import MusicOtherPostsSection from '../../../components/media/lists/MusicOtherPostsSection';
import MusicPlaylistItem from '../../../components/media/contents/MusicPlaylistItem';
import UserPostActionBar from '../../../components/common/UserPostActionBar';
import MusicPreview from '../../../components/media/contents/MusicPreview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toggleBookmark, fetchUserBookmarks} from '../../../utils/BookmarkApi';

import {fetchMusicPostDetail, deleteMusicPost} from '../../../utils/Musicapi';

function MusicDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {postId} = route.params;

  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [post, setPost] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewTrack, setPreviewTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const MINI_PLAYER_HEIGHT = 85 + 20;

  const isMine = post?.userId === loggedInUserId;
  const isAdmin = loggedInUserId === 'admin';

  useEffect(() => {
    const loadUser = async () => {
      const id = await AsyncStorage.getItem('userId');
      setLoggedInUserId(id);
    };
    loadUser();
  }, []);

  /** 🎵 즐겨찾기 토글 */
  const toggleFavorite = async index => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) return;

    const track = playlist[index];
    if (!track) return;

    // ⭐ UI 먼저 반전
    setPlaylist(prev =>
      prev.map((item, i) =>
        i === index ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );

    try {
      const result = await toggleBookmark({
        userId,
        targetType: 'musiclist',
        targetId: track.musicListId,
      });

      // 서버 기준 보정
      setPlaylist(prev =>
        prev.map((item, i) =>
          i === index ? {...item, isFavorite: Boolean(result)} : item,
        ),
      );
    } catch (e) {
      // 실패 시 롤백
      setPlaylist(prev =>
        prev.map((item, i) =>
          i === index ? {...item, isFavorite: !item.isFavorite} : item,
        ),
      );
      console.log('music bookmark toggle error:', e);
    }
  };

  /** 🎵 게시글 + 플레이리스트 로딩 */
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [postId]),
  );

  const loadData = async () => {
    try {
      const detail = await fetchMusicPostDetail(postId);
      const userId = await AsyncStorage.getItem('userId');

      const formattedPlaylist = detail.playlist.map(item => ({
        musicListId: item.musicListId,
        musicId: item.musicId,
        musicTitle: item.musicTitle,
        musicSinger: item.musicSinger,
        musicImagePath: item.musicImagePath,
        musicPreviewUrl: item.musicPreviewUrl,
        isFavorite: false,
      }));

      if (userId && formattedPlaylist.length > 0) {
        const bookmarks = await fetchUserBookmarks(userId);

        const bookmarkedIds = new Set(
          bookmarks
            .filter(b => b.bookmarkTargetType === 'musiclist')
            .map(b => b.bookmarkTargetId),
        );

        setPlaylist(
          formattedPlaylist.map(track => ({
            ...track,
            isFavorite: bookmarkedIds.has(track.musicListId),
          })),
        );
      } else {
        setPlaylist(formattedPlaylist);
      }

      setPost(detail);
    } catch (err) {
      console.log('게시글 상세 조회 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  /** 로딩 화면 */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로딩중...</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('삭제 확인', '정말 이 게시글을 삭제하시겠어요?', [
      {text: '취소', style: 'cancel'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMusicPost(postId);
            Alert.alert('삭제 완료', '게시글이 성공적으로 삭제되었습니다.');
            navigation.goBack();
          } catch (err) {
            Alert.alert('삭제 실패', '잠시 후 다시 시도해주세요.');
          }
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('MusicPostScreen', {postId});
  };
  // 미리듣기 재생 및 다음곡 재생
  const playNext = () => {
    if (currentIndex === null) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= playlist.length) {
      Alert.alert('알림', '마지막 곡입니다.');
      return;
    }

    setCurrentIndex(nextIndex);
    setPreviewTrack(playlist[nextIndex]);
  };

  const handlePressNickname = async () => {
    if (!post) return;

    const myUserId = await AsyncStorage.getItem('userId');

    if (myUserId === post.userId) {
      navigation.navigate('MyPage');
    } else {
      navigation.navigate('YourPageScreen', {
        targetUserId: post.userId,
        targetUserNickname: post.userNickname,
      });
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: previewTrack ? MINI_PLAYER_HEIGHT : 20,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cardWrapper}>
          {/* 제목 + 액션버튼 */}
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{post.musicPostTitle}</Text>

            <UserPostActionBar
              isMine={isMine}
              isAdmin={isAdmin}
              isPost={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReport={() => console.log('신고 클릭')}
            />
          </View>

          {/* 플레이리스트 */}
          <View style={styles.playlistBox}>
            {playlist.map((track, index) => (
              <MusicPlaylistItem
                key={track.musicId}
                item={track}
                showFavorite={true}
                isFavorite={track.isFavorite}
                onFavoriteToggle={() => toggleFavorite(index)}
                showPreview={true}
                onPreview={() => {
                  setCurrentIndex(index);
                  setPreviewTrack(track);
                }}
              />
            ))}
          </View>
        </View>

        {/* 추천 이유 + 작성자 */}
        <UserRecommendBox
          reason={post.musicPostText}
          nickname={post.userNickname}
          style={{marginTop: 30}}
          onPressNickname={handlePressNickname}
        />

        {/* 댓글 */}
        <CommentSection
          targetType="musicpost"
          targetId={post.musicPostId}
          currentUserId={loggedInUserId}
        />

        {/* 관련 음악 */}
        <MusicOtherPostsSection userId={post.userId} />
      </ScrollView>
      {previewTrack && (
        <MusicPreview
          track={previewTrack}
          onClose={() => setPreviewTrack(null)}
          onNext={playNext}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
    flex: 1,
    paddingRight: 8,
  },

  cardWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },

  playlistBox: {
    marginTop: 8,
  },
});

export default MusicDetail;
