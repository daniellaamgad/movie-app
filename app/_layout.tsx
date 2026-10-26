import 'react-native-reanimated';
import '../global.css';

import { Stack } from 'expo-router';
import { MoviesProvider } from '../context/movies';

export default function RootLayout() {
  return (
    <MoviesProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{ title: 'Movie Details' }}
        />
      </Stack>
    </MoviesProvider>
  );
}