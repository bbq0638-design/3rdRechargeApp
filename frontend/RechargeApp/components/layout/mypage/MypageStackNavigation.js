import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MyPageScreen from '../../../screens/mypage/MyPageScreen';
import FollowScreen from '../../../screens/mypage/FollowScreen';
import Header from '../Header';
const Stack = createNativeStackNavigator();

function MyPageStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
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
        name="FollowScreen"
        component={FollowScreen}
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

export default MyPageStackNavigation;
