import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../../components/common/Button";

export default function NoticeInfo({ notice, isAdmin, onEdit, onDelete }) {
    return (
        <>
            {/* Title & Category */}
            <View style={styles.titleRow}>
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>공지</Text>
                </View>
                <Text style={styles.title}>{notice.title}</Text>
            </View>

            {/* Admin Buttons */}
            {isAdmin && (
                <View style={styles.adminButtons}>
                    <Button type="edit" text="수정" width={40} height={30} onPress={onEdit} />
                    <Button
                        type="delete"
                        text="삭제"
                        width={40}
                        height={30}
                        onPress={onDelete}
                        style={{ marginLeft: 8 }}
                    />
                </View>
            )}

            {/* Meta */}
            <View style={styles.metaRow}>
                <Text style={styles.metaText}>by 관리자 · {notice.date}</Text>

                <View style={styles.views}>
                    <Text style={styles.metaText}>조회수 {notice.views}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    categoryBadge: {
        backgroundColor: "#004E89",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    categoryText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
    title: {
        paddingLeft: 10,
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        flexShrink: 1,
    },
    adminButtons: {
        flexDirection: "row",
        marginLeft: "auto",
        alignItems: "center",
        marginBottom: 8,
    },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    metaText: { fontSize: 13, color: "#6B7280", fontWeight: '500',},
    views: { flexDirection: "row", alignItems: "center" },
});