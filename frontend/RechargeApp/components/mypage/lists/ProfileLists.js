import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Button from '../../common/Button';

export default function ProfileList({
  data = [],
  mode,
  myUserId,
  onPressFollow,
  onPressUnfollow,
  onPressProfile,
}) {
  return (
    <View style={styles.listWrapper}>
      {data.map(user => {
        const targetUserId =
          mode === 'following' ? user.followingId : user.followerId;

        const nickname = user.userNickname; // ✅ 여기

        const isMe = String(targetUserId) === String(myUserId);

        return (
          <View key={targetUserId} style={styles.row}>
            <Pressable
              style={{flex: 1}}
              onPress={() => onPressProfile?.(targetUserId, nickname)}>
              <Text style={styles.name}>{nickname}</Text>
            </Pressable>

            {!isMe && mode === 'following' && (
              <Button
                type="cancel"
                text="팔로잉 취소"
                width={110}
                height={40}
                borderRadius={20}
                onPress={() => onPressUnfollow(targetUserId)}
              />
            )}

            {!isMe && mode === 'follower' && (
              <Button
                type={user.isFollowing ? 'cancel' : 'submit'}
                text={user.isFollowing ? '언팔로우' : '팔로우'}
                width={110}
                height={40}
                borderRadius={20}
                onPress={() =>
                  user.isFollowing
                    ? onPressUnfollow(targetUserId)
                    : onPressFollow(targetUserId)
                }
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {marginTop: 12},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#001c33',
    marginLeft: 20,
  },
});
