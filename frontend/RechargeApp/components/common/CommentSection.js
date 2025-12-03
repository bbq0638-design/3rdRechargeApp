import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CustomTextInput from './TextInput';
import Button from './Button';
import IconButton from './iconButton';

function CommentSection() {
  const currentUserId = 'me_user';

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'charger_user',
      time: '2시간 전',
      text: '저도 충전하면서 봤는데 정말 좋았어요!',
      isEditing: false,
    },
    {
      id: 2,
      user: 'ev_lover',
      time: '5시간 전',
      text: '추천 감사합니다!',
      isEditing: false,
    },
  ]);

  const [comment, setComment] = useState('');
  const [editText, setEditText] = useState('');

  // 댓글 등록
  const handlePost = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      user: currentUserId,
      time: '방금 전',
      text: comment.trim(),
      isEditing: false,
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  // 댓글 수정 시작
  const handleEdit = id => {
    const target = comments.find(c => c.id === id);
    setEditText(target.text);

    setComments(comments.map(c => (c.id === id ? {...c, isEditing: true} : c)));
  };

  // 수정 저장
  const handleSaveEdit = id => {
    if (!editText.trim()) return;

    setComments(
      comments.map(c =>
        c.id === id ? {...c, text: editText, isEditing: false} : c,
      ),
    );

    setEditText('');
  };

  // 수정 취소
  const handleCancelEdit = id => {
    setComments(
      comments.map(c => (c.id === id ? {...c, isEditing: false} : c)),
    );
    setEditText('');
  };

  // 댓글 삭제
  const handleDelete = id => {
    Alert.alert('삭제', '정말 삭제하시겠습니까?', [
      {text: '취소'},
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          setComments(comments.filter(c => c.id !== id));
        },
      },
    ]);
  };

  // 신고
  const handleReport = id => {
    Alert.alert('신고 완료', '해당 댓글을 신고했습니다.');
  };

  return (
    <View style={styles.container}>
      {/* 댓글 */}
      <Text style={styles.commentHead}>댓글</Text>

      {/* 댓글 입력 */}
      <View style={styles.inputRow}>
        <CustomTextInput
          value={comment}
          onChangeText={setComment}
          placeholder="댓글을 입력하세요..."
          height={40}
          multiline
          style={styles.inputWrapper}
          inputStyle={styles.commentInput}
        />

        <Button
          text="Post"
          type="submit"
          width={60}
          height={40}
          onPress={handlePost}
          style={styles.postButton}
        />
      </View>

      {/* ⭐ FlatList → map 렌더링 */}
      {comments.map(item => {
        const isMyComment = item.user === currentUserId;

        return (
          <View key={item.id} style={styles.commentBox}>
            <View style={styles.headerRow}>
              <Text style={styles.username}>{item.user}</Text>
              <Text style={styles.time}>{item.time}</Text>

              <View style={styles.actions}>
                {isMyComment && !item.isEditing ? (
                  <>
                    <IconButton
                      type="commentEdit"
                      size={18}
                      onPress={() => handleEdit(item.id)}
                    />
                    <IconButton
                      type="commentDelete"
                      size={18}
                      color="#cc4a4a"
                      onPress={() => handleDelete(item.id)}
                    />
                  </>
                ) : null}

                {!isMyComment && !item.isEditing ? (
                  <IconButton
                    type="report"
                    size={18}
                    color="#cc4a4a"
                    onPress={() => handleReport(item.id)}
                  />
                ) : null}
              </View>
            </View>

            {/* 수정 모드 UI */}
            {item.isEditing ? (
              <View style={styles.editRow}>
                <CustomTextInput
                  value={editText}
                  onChangeText={setEditText}
                  height={20}
                  style={styles.editInputWrapper}
                  inputStyle={styles.editInput}
                />

                <Button
                  text="취소"
                  type="cancel"
                  width={60}
                  height={35}
                  onPress={() => handleCancelEdit(item.id)}
                  style={styles.editCancel}
                />

                <Button
                  text="저장"
                  type="submit"
                  width={60}
                  height={35}
                  onPress={() => handleSaveEdit(item.id)}
                  style={styles.editSave}
                />
              </View>
            ) : (
              <Text style={styles.commentText}>{item.text}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  commentHead: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginTop: 20,
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },

  commentInput: {
    height: 40,
    paddingVertical: 10,
  },

  postButton: {
    borderRadius: 10,
    backgroundColor: '#004E89',
  },

  /* 댓글 박스 */
  commentBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F5',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  username: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1C1E',
  },

  time: {
    marginLeft: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },

  actions: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },

  commentText: {
    marginTop: 10,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  /* 수정 모드 */
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  editInputWrapper: {
    flex: 1,
    marginRight: 8,
  },

  editInput: {
    height: 35,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
  },

  editCancel: {
    marginRight: 6,
  },

  editSave: {
    backgroundColor: '#004E89',
  },
});

export default CommentSection;
