import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView,
    TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomTextInput from '../../components/common/TextInput';
import TextArea from '../../components/common/TextArea';
import Button from '../../components/common/Button';

export default function NoticeWriteScreen({ navigation }) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');



    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {/* <View style={styles.safeArea}>
            <TouchableOpacity
                onPress={() => navigation?.goBack()}
                style={styles.backButton}
            >
                <MaterialCommunityIcons name="arrow-left" size={28} color="#111" />
            </TouchableOpacity>
            </View>     */}
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >

                    <View style={styles.section}>
                        <Text style={styles.label}>제목</Text>
                        <CustomTextInput
                            placeholder="제목을 입력하세요..."
                            value={title}

                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>내용</Text>
                        <TextArea
                            placeholder="내용을 입력하세요..."
                            value={content}
                            onChangeText={setContent}
                            maxLength={1000}
                            style={styles.textArea}
                            autoGrow={false}
                        />

                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        type="submit"
                        text="등록하기"
                        width="48%"
                        onPress={() => console.log('등록하기 클릭')}
                        textStyle={{ fontSize: 14 }}
                    />
                    <Button
                        type="cancel"
                        text="취소하기"
                        width="48%"
                        onPress={() => navigation?.goBack()}
                        textStyle={{ fontSize: 14 }}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 6,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 4,
    },
    textArea: {
        height: 270,
        textAlignVertical: 'top',
    },
    attachButtonContainer: {
        marginBottom: 8,
        alignItems: 'flex-end',

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#F9FAFB',
        borderTopWidth: 1,
        borderTopColor: '#F9FAFB',
    },
});
