import { useLocalSearchParams, Stack } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

import { useMovies } from '../../context/movies';

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, watchlist, toggleWatchlist } = useMovies();

  const movie = movies.find((item) => item.id === id);
  const isSaved = movie ? watchlist.includes(movie.id) : false;

  if (!movie) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Movie Not Found' }} />
        <Text style={styles.notFound}>Movie not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: movie.title }} />

      <View style={styles.poster}>
        <Text style={styles.emoji}>{movie.emoji}</Text>
      </View>

      <Text style={styles.title}>{movie.title}</Text>

      <Text style={styles.metadata}>
        {movie.year} · {movie.genre}
      </Text>

      <Text style={styles.rating}>
        ⭐ {movie.rating.toFixed(1)}
      </Text>

      <Pressable
        style={[styles.button, isSaved && styles.removeButton]}
        onPress={() => toggleWatchlist(movie.id)}
      >
        <Text style={styles.buttonText}>
          {isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
  },
  notFound: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
  },
  poster: {
    width: 190,
    height: 210,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  emoji: {
    fontSize: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  metadata: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },
  rating: {
    fontSize: 18,
    fontWeight: '700',
    color: '#B45309',
    marginTop: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  removeButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});