import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from '../../layout/Header';
import SettingMainScreen from '../../../screens/setting/SettingMainScreen';
import SettingAppInfoScreen from '../../../screens/setting/SettingAppInfoScreen';
import SettingPrivacyScreen from '../../../screens/setting/SettingPrivacyScreen';
import SettingLocationScreen from '../../../screens/setting/SettingLocationScreen';
import ModifyProfileScreen from '../../../screens/auth/ModifyProfileScreen';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="SettingMain"
        component={SettingMainScreen}
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
        name="ModifyProfile"
        component={ModifyProfileScreen}
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
        name="SettingLocation"
        component={SettingLocationScreen}
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
        name="SettingPrivacy"
        component={SettingPrivacyScreen}
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
        name="SettingAppInfo"
        component={SettingAppInfoScreen}
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