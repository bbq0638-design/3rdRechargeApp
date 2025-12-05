import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sampleNotices } from "../../components/notice/sampleNotices";
import NoticeItem from "../../components/notice/NoticeItem";
import Button from "../../components/common/Button";


export default function NoticeMainScreen({ navigation }) {


    const renderItem = ({ item }) => (
        <NoticeItem
            item={item}
            onPress={(notice) =>
                navigation.navigate("NoticeDetail", {
                    noticeList: sampleNotices,
                    noticeId: notice.id,
                    isAdmin: true
                    
                })
            }
        />
    );


    return (
        <View style={styles.container}>
            {/* 상단 헤더 */}
            <View style={styles.header}>
                <View style={styles.headerLogo}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#004E89" style={{marginRight: 8, marginTop: 4}} />
                    <Text style={styles.headerTitle}>공지사항</Text>
            </View>
            
                {/* {isAdmin && (    들어가야함 */}
                <Button
                    type="add"
                    text="+  글쓰기"
                    width={80}
                    height={34}
                    textStyle={{ fontSize: 13, fontWeight: '600' }}
                    onPress={() => navigation.navigate('NoticeWrite')}
                />
            </View>

            {/* 리스트 */}
            <FlatList
                data={sampleNotices}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 0 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" },

    header: {
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 15,
        flexDirection: "row",
        paddingHorizontal: 16,

    },
    headerLogo: { flexDirection: "row" },
    headerTitle: { fontSize: 22, fontWeight: "bold", color: "#111" },

    cardContent: { flex: 1 },
    title: { fontSize: 15, color: "black", fontWeight: "600", marginBottom: 4 },
    date: { fontSize: 13, color: "#777" },
});