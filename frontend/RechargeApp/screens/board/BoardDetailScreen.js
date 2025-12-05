import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from '../../components/common/iconButton';
import CustomTextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
import CommentSection from '../../components/common/CommentSection';

export default function BoardDetailScreen({ navigation, route }) {
    //front용
    //const currentUserId = 'admin';
    //const currentUserId = 'general_user';
    const currentUserId = 'me_user';
    const isAdmin = currentUserId === 'admin';

    //임시 데이터
    const { post } = route.params  || {
        post: {
            id: 1,
            title: '강남역 충전소 이용 후기 공유합니다',
            author: '박충전',
            authorId: 'me_user',
            time: '10분 전',
            content: '오늘 강남역 근처 충전소를 처음 이용해봤는데 시설도 깨끗하고 충전 속도도 빠르더라구요.\n주차 공간도 넉넉해서 대기 없이 바로 충전할 수 있었습니다.',
            imageUrl: null,
            // imageUrl: 'https://via.placeholder.com/400x250/004E89/FFFFFF?text=ChargeStation',
            likes: 12,
            views: 345,
            category: '충전소 후기',
        },
    };

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handlePostEdit = () => {
        Alert.alert(
            '게시글 수정',
            '이 게시글을 수정하시겠습니까?',
            [
                { text: '취소'},
                { text: '수정'},
                                ]);
    };

    const handlePostDelete = () => {
        Alert.alert(
            isAdmin ? '관리자 삭제' : '삭제',
            '이 게시글을 삭제하시겠습니까?',
            [
                { text: '취소'},
                { text: '삭제', style: 'destructive', onPress: () => navigation.goBack() },
            ]
        );
    };

    const handlePostReport = () => Alert.alert('신고', '이 게시글을 신고하시겠습니까?');
    const isMyPost = post.authorId === currentUserId;


    return (
         <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* 게시글 헤더 */}
                    <View style={styles.titleRow}>              
                        <View style={styles.titleLeft}>
                            {/* 카테고리 뱃지 */}
                            <View style={styles.categoryBadge}>
                                <Text style={styles.categoryText}>{post.category}</Text>
                            </View>
                        </View>

                            {/* 수정 삭제 신고 */}
                            <View style={styles.iconRow}>
                                {isMyPost ? (
                                    <>
                                        <IconButton type="commentEdit" size={20} color="#555" onPress={handlePostEdit} style={styles.actionIcon}/>
                                        <IconButton type="commentDelete" size={20} color="#555" onPress={handlePostDelete} style={styles.actionIcon}/>
                                    </>
                                ) : isAdmin? (
                                    <IconButton type="commentDelete" size={20} color="#555" style={styles.actionIcon}/>
                                ) : (
                                   <IconButton type="report" size={20} color="#cc4a4a" onPress={handlePostReport} style={styles.actionIcon}/>
                                )}
                            </View>
                    </View>
                    <Text style={styles.title}>{post.title}</Text>
                    {/* 메타 정보 */}
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>
                            by {post.author} · {post.time}
                        </Text>
                        
                        <View style={styles.statsContainer}>
                            {/* 좋아요*/}
                            <View style={styles.statsItem}>
                                <IconButton type="like" size={14}/>
                                <Text style={styles.statsText}>{post.likes}</Text>
                            </View>

                            {/* 조회수 */}
                            <View style={styles.statsItem}>
                                <Text style={styles.statsText}>조회수 {post.views}</Text>
                            </View>
                        </View>
                    </View>  
         
                    {/* 본문 */}
                    <View style={styles.contentCard}>
                        {post.imageUrl && (
                            <Image source={{ uri: post.imageUrl }} style={styles.postImage} resizeMode="cover" />
                        )}
                        <Text style={styles.content}>{post.content}</Text>
                    </View>
                    
                    <View/>

                    {/* 댓글 영역 */}
                    <View style={styles.commentSectionWrapper}>
                        <CommentSection />
                    </View>                    
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 4,
    },
    titleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
       
    },
    categoryBadge: {
        backgroundColor: '#004E89',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginBottom: 0,
        marginRight: 8,
    },
    categoryText: {
        color: '#F9FAFB',
        fontWeight: '600',   
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    actionIcon: {
        marginLeft: 4,
        padding: 4,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 0,
        lineHeight: 26,
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,

    },
    metaText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    statsItem: { 
      flexDirection: "row", 
      alignItems: "center",
      marginLeft: 6,
  },
    statsText: { 
         marginLeft: 4,
         fontSize: 13,
         color: '#6B7280',
         fontWeight: '500',
    },
    contentCard: {
        //backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 12,
        marginBottom: 10,
    //    borderWidth: 1,
    //     borderColor: "#dcdcdcff",
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 4,
    //     elevation: 3,
     },
    postImage: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginBottom: 16,
    },
    content: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
    },
    commentSectionWrapper: {
        marginTop: -10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },    
});