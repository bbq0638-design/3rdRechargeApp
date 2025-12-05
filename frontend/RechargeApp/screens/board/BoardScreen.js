import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BoardItem from '../../components/board/BoardItem';
import SelectableButton from '../../components/common/SelectableButton';
import Button from '../../components/common/Button';
import IconButton from '../../components/common/iconButton';

const MOCK_DATA= [
    {
    id: 1,
    title: '충전소 꿀팁 공유합니다',
    author: '박충전',
    time: '10분 전',
    likes: 5,
    imageUrl: 'https://via.placeholder.com/150/004E89/FFFFFF?text=Charge',
    category: '전기차 꿀팁',
},
{
    id: 2,
    title: '제주도 전기차 여행 후기',
    author: '이여행',
    time: '1시간 전',
    likes: 24,
    imageUrl: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=Jeju',
    category: '충전소 후기',
  },
  {
    id: 3,
    title: '충전기 고장 신고 어디서 하나요?',
    author: '최질문',
    time: '3시간 전',
    likes: 2,
    imageUrl: 'https://via.placeholder.com/150/333333/FFFFFF?text=QnA',
    category: '전기차 꿀팁',
  },
  {
    id: 4,
    title: '전기차 배터리 관리 노하우',
    author: '김전문',
    time: '5시간 전',
    likes: 18,
    imageUrl: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=Battery',
    category: '전기차 꿀팁',
  },
  {
    id: 5,
    title: '전기차 배터리 관리 노하우',
    author: '김전문',
    time: '5시간 전',
    likes: 18,
    imageUrl: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=Battery',
    category: '전기차 꿀팁',
  },  
  {
    id: 6,
    title: '전기차 배터리 관리 노하우',
    author: '김전문',
    time: '5시간 전',
    likes: 18,
    imageUrl: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=Battery',
    category: '전기차 꿀팁',
  },
];

const CATEGORIES = ['전체', '충전소 후기', '전기차 꿀팁'];

export default function BoardScreen({navigation}) {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    //프론트 엔드용
    const filteredData =
        selectedCategory === '전체'
            ? MOCK_DATA
            : MOCK_DATA.filter((item) => item.category === selectedCategory);


    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="file-search-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>등록된 게시글이 없습니다.</Text>
            <Text style={styles.emptySubText}>첫 번째 글을 작성해보세요!</Text>
        </View>
    )
    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <View style={styles.pageHeader}>
                <View style={styles.headerTitleContainer}>
                    <MaterialCommunityIcons name="comment-text-outline" size={24} color="#004E89" style={{marginRight: 8, marginTop: 4}} />
                    <Text style={styles.headerTitle}>자유 게시판</Text>
                </View>

                <Button
                    type="add"
                    text="+  글쓰기"
                    width={80}
                    height={34}
                    textStyle={{ fontSize: 13, fontWeight: '600'}}
                    onPress={() => navigation.navigate('BoardWrite')}
                />
            </View>
            <View style={styles.noticeBar}>
                <View pointerEvents="none">
                    <IconButton
                        type="notice"
                        size={18}
                        color="#F87171"
                        style={{ padding: 0, marginRight: 8}}
                    />
            </View>
            <Text style={styles.noticeText} numberOfLines={1}>
                
                {/*프론트용 추후 수정 */}
                공지: 쾌적한 커뮤니티 활동을 위해 매너를 지켜주세요. 
            </Text>
            </View>

            {/* 카테고리 필터 */}
            <View style={styles.filterContainer}>
                {CATEGORIES.map((cat) => (
                <SelectableButton
                    key={cat}
                    label={cat}
                    selected={selectedCategory === cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={styles.filterButton}
                />
                ))}
            </View>

            {/* 게시글 리스트 */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BoardItem
                        item={item}
                        onPress={() => navigation.navigate('BoardDetail', {post: item})}
                    />
                )}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={[
                    styles.listContainer,
                    filteredData.length === 0 && {flex: 1 }
                ]}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
                />
        </SafeAreaView>
    );
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F9FAFB',
        },
        pageHeader: {
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F9FAFB',
            marginTop: 10,
            marginBottom: 10,
        },
        headerTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: '#111',
        },
        noticeBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f3f2f2ff',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            marginBottom: 16,
            marginRight: 16,
            marginLeft: 16,
        },
        noticeText: {
            color: '#555',
            fontSize: 13,
            flex: 1,
        },
        filterContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: 16,
            marginBottom: 8,
        },
        filterButton: {
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 20,
            marginRight: 8,
            marginBottom: 8,
        },
        flatList: {
            flex: 1,
        },
        listContainer: {
            paddingHorizontal: 20,
            paddingBottom: 20,
        }, 
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
            minHeight: 300,
        },
        emptyText: {
            marginTop: 12,
            fontSize: 16,
            fontWeight: '600',
            color: '#6B7280',
        },
        emptySubText: {
            marginTop: 4,
            fontSize: 14,
            color: '#9CA3AF',
        },
    });
