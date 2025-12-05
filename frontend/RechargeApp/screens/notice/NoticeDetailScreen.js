import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";

import NoticeInfo from "../../components/notice/NoticeInfo";
import NoticeContent from "../../components/notice/NoticeContent";
import NoticeNav from "../../components/notice/NoticeNav";
import { sampleNotices } from "../../components/notice/sampleNotices";

export default function NoticeDetail({ route, navigation }) {
    const { noticeList, noticeId, isAdmin } = route.params;

    // noticeList가 undefined면 sampleNotices 사용
 const list = noticeList || sampleNotices;

    // 현재 글 인덱스 찾기
    const currentIndex = list.findIndex(n => n.id === noticeId);

    // noticeId가 존재하지 않으면 안내 표시
    if (currentIndex === -1) {
        return (
            <View style={styles.container}>
                <Text style={{ padding: 16 }}>공지사항을 찾을 수 없습니다.</Text>
            </View>
        );
    }

    const notice = list[currentIndex];
    const prevNotice = list[currentIndex - 1] || null;
    const nextNotice = list[currentIndex + 1] || null;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <NoticeInfo
                    notice={notice}
                    isAdmin={isAdmin}
                    onEdit={() => alert("수정 클릭!")}
                    onDelete={() => alert("삭제 클릭!")}
                />

                <NoticeContent content={notice.content} />

                <NoticeNav
                    prevTitle={prevNotice?.title || "없음"}
                    nextTitle={nextNotice?.title || "없음"}
                    onPrev={() => {
                        if (prevNotice)
                            navigation.push("NoticeDetail", {
                                noticeList: list,
                                noticeId: prevNotice.id,
                                isAdmin,
                            });
                    }}
                    onNext={() => {
                        if (nextNotice)
                            navigation.push("NoticeDetail", {
                                noticeList: list,
                                noticeId: nextNotice.id,
                                isAdmin,
                            });
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" },
    contentContainer: { padding: 16, paddingBottom: 32 },
});