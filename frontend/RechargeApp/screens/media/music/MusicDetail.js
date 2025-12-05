import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import CommentSection from '../../../components/common/CommentSection';
import UserRecommendBox from '../../../components/media/contents/UserRecommendBox';
import MediaListSection from '../../../components/media/lists/MediaListsSection';
import MusicPlaylistItem from '../../../components/media/contents/MusicPlaylistItem';
import UserPostActionBar from '../../../components/common/UserPostActionBar';

function MusicDetail() {
  const navigation = useNavigation();

  const toggleFavorite = index => {
    setPlaylist(prev =>
      prev.map((item, i) =>
        i === index ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  };

  const [playlist, setPlaylist] = useState([
    {
      id: 'm1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/bb/a4/51/bba45133-e3f7-4edf-8d55-bacf31b1bfa8/source/100x100bb.jpg',
      isFavorite: true,
    },
    {
      id: 'm2',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/aa/bc/44/aabc4422-aaa1-42ab-9cc5-abc123abc123/source/100x100bb.jpg',
      isFavorite: false,
    },
    {
      id: 'm3',
      title: 'In Your Eyes',
      artist: 'The Weeknd',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/cc/af/44/ccaf44fd-1231-456a-951c-aaee11223344/source/100x100bb.jpg',
      isFavorite: false,
    },
  ]);

  const reason = '리듬과 멜로디가 중독적이고 분위기가 정말 최고예요 😍✨';
  const nickname = 'charger_user';

  const similarMusics = [
    {
      id: '101',
      title: 'Can’t Feel My Face',
      artist: 'The Weeknd',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/11/bc/77/11bc77b5-aaa1-42ab-9cc5-abc123abc123/source/100x100bb.jpg',
    },
    {
      id: '102',
      title: 'Starboy',
      artist: 'The Weeknd',
      artwork:
        'https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/22/af/44/22af44fd-7a7c-99aa-b11f-dc123123aaa/source/100x100bb.jpg',
    },
  ];
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 60}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.cardWrapper}>
        {/* 제목 + 액션버튼 */}
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>
            집중 잘 되는 음악 플레이리스트 🎧✨
          </Text>

          <UserPostActionBar
            isMine={true}
            isAdmin={false}
            isPost={true}
            onEdit={() => console.log('수정 클릭')}
            onDelete={() => console.log('삭제 클릭')}
            onReport={() => console.log('신고 클릭')}
          />
        </View>

        {/* 플레이리스트 */}
        <View style={styles.playlistBox}>
          {playlist.map((track, index) => (
            <MusicPlaylistItem
              key={track.id}
              item={track}
              showFavorite={true}
              isFavorite={track.isFavorite}
              onFavoriteToggle={() => toggleFavorite(index)}
              showPreview={true}
              onPreview={() => console.log('미리듣기 실행', track.title)}
              showDelete={false}
            />
          ))}
        </View>
      </View>

      <UserRecommendBox
        reason={reason}
        nickname={nickname}
        style={{marginTop: 30}}
        onPressNickname={() =>
          navigation.navigate('MyPage', {
            screen: 'MyPageScreen',
            params: {isMine: false},
          })
        }
      />

      {/* 댓글 */}
      <View>
        <CommentSection />
      </View>

      {/* 음악 관련 추천 리스트 */}
      <MediaListSection
        title="이용자가 추천한 다른 음악"
        items={similarMusics}
        variant="music"
        onPressItem={music =>
          navigation.navigate('MusicDetail', {musicId: music.id})
        }
        style={{marginTop: 20}}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
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

  playlistWrapper: {
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
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
