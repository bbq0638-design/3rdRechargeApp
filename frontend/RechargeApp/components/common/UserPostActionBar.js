import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import IconButton from './iconButton';

function UserPostActionBar({
  isMine = false,
  isAdmin = false,
  isPost = false,
  onEdit,
  onDelete,
  onReport,
  style,
}) {
  if (!isPost) return null;
  return (
    <View style={[styles.container, style]}>
      {/* 내가 쓴 게시글의 경우 수정/삭제 */}
      {isMine && (
        <>
          <TouchableOpacity onPress={onEdit} style={styles.btn}>
            <IconButton type="commentEdit" size={22} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={styles.btn}>
            <IconButton type="commentDelete" size={22} />
          </TouchableOpacity>
        </>
      )}

      {/* 관리자의 경우 삭제 */}
      {!isMine && isAdmin && (
        <TouchableOpacity onPress={onDelete} style={styles.btn}>
          <IconButton type="commentDelete" size={22} />
        </TouchableOpacity>
      )}

      {/* 타 이용자 게시글의 경우 신고 */}
      {!isMine && !isAdmin && (
        <TouchableOpacity onPress={onReport} style={styles.btn}>
          <IconButton type="report" size={22} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    marginLeft: 1,
  },
});

export default UserPostActionBar;