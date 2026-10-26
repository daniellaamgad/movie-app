import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import MovieCard from '../../components/MovieCard';
import { useMovies } from '../../context/movies';

export default function WatchlistScreen() {
  const { movies, watchlist } = useMovies();

  const savedMovies = movies.filter((movie) =>
    watchlist.includes(movie.id)
  );

  const count = savedMovies.length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Watchlist</Text>

      <Text style={styles.count}>
        {count} {count === 1 ? 'movie' : 'movies'} saved
      </Text>

      <FlatList
        data={savedMovies}
        keyExtractor={(movie) => movie.id}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/movie/[id]',
              params: { id: item.id },
            }}
            asChild
          >
            <MovieCard movie={item} />
          </Link>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍿</Text>
            <Text style={styles.emptyTitle}>Your watchlist is empty</Text>
            <Text style={styles.emptyMessage}>
              Explore Movies and add the films you want to watch later.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
  },
  count: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 22,
  },
  list: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 65,
    paddingHorizontal: 18,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 15,
    lineHeight: 23,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
  },
});