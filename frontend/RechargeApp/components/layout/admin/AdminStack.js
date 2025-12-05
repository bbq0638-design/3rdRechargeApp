// components/admin/AdminStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminScreen from '../../../screens/admin/AdminScreen';
import ReportPostsScreen from '../../../screens/admin/ReportPostsScreen';
import Header from '../Header';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AdminMain"
                component={AdminScreen}
                options={{
                    header: props => (
                        <Header {...props} isLoggedIn={true} onLogin={() => { }} onLogout={() => { }} onSignup={() => { }} />
                    ),
                }}
            />
            <Stack.Screen
                name="ReportDetail"
                component={ReportPostsScreen}
                options={{
                    header: props => (
                        <Header {...props} isLoggedIn={true} onLogin={() => { }} onLogout={() => { }} onSignup={() => { }} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
