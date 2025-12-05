import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FortuneMainScreen from '../../../screens/fortune/FortuneMainScreen';
// import ChargerDetailScreen from '../../../screens/charger/ChargerDetailScreen';
import Header from '../../layout/Header';

const Stack = createNativeStackNavigator();

export default function FortuneStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="FortuneMain"
        component={FortuneMainScreen}
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

      {/* <Stack.Screen
        name="ChargerDetail"
        component={ChargerDetailScreen}
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
      /> */}

    </Stack.Navigator>
  );
}
