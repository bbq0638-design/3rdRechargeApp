import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '../../layout/Header';
import LoginScreen from '../../../screens/auth/LoginScreen';
import FindIdScreen from '../../../screens/auth/FindIdScreen';
import FindPwdScreen from '../../../screens/auth/FindPwdScreen';
import TermsAgreementScreen from '../../../screens/auth/TermsAgreementScreen';
import SignUpScreen from '../../../screens/auth/SignUpScreen';
import FindIdResultScreen from '../../../screens/auth/FindIdResultScreen';
import FindPwdResultScreen from '../../../screens/auth/FindPwdResutScreen';
import ModifyProfileScreen from '../../../screens/auth/ModifyProfileScreen';

const Stack = createNativeStackNavigator();

export default function ChargerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginMain"
        component={ModifyProfileScreen}
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
        name="FindIdScreen"
        component={FindIdScreen}
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
        name="FindPwdScreen"
        component={FindPwdScreen}
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
        name="TermsAgreementScreen"
        component={TermsAgreementScreen}
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
        name="SignUpScreen"
        component={SignUpScreen}
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
        name="FindIdResult"
        component={FindIdResultScreen}
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
        name="FindPwdResult"
        component={FindPwdResultScreen}
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
    </Stack.Navigator>
  );
}
