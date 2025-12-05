import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoardScreen from '../../../screens/board/BoardScreen';

import Header from '../../layout/Header';
import BoardDetailScreen from '../../../screens/board/BoardDetailScreen';
import BoardWirteScreen from '../../../screens/board/BoardWriteScreen';

const Stack = createNativeStackNavigator();

export default function BoardStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="BoarderMain"
        component={BoardScreen}
        options={{
          header: props => (
            <Header
              {...props}
              isLoggedIn={false}
              onLogin={() => {}}
              onLogout={() => {}}
              onSignup={() => {}}
            />
          ),
        }}
      />

      <Stack.Screen
        name="BoardDetail"
        component={BoardDetailScreen}
        options={{
          header: props => (
            <Header
              {...props}
              isLoggedIn={true}
              onLogin={() => {}}
              onLogout={() => {}}
              onSignup={() => {}}
            />
          ),
        }}
      />

      <Stack.Screen
        name="BoardWrite"
        component={BoardWirteScreen}
        options={{
          header: props => (
            <Header
              {...props}
              isLoggedIn={true}
              onLogin={() => {}}
              onLogout={() => {}}
              onSignup={() => {}}
            />
          ),
        }}
      />

    </Stack.Navigator>
  );
}