import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FindMusicScreen from '../../../screens/media/music/FindMusicScreen';
import MusicPostScreen from '../../../screens/media/music/MusicPostScreen';
import MusicDetail from '../../../screens/media/music/MusicDetail';
import Header from '../Header';
const Stack = createNativeStackNavigator();

function MusicStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindMusic"
        component={FindMusicScreen}
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
        name="MusicPostScreen"
        component={MusicPostScreen}
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
        name="MusicDetail"
        component={MusicDetail}
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

export default MusicStackNavigation;
