import { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { useMovies } from '../../context/movies';
import MovieCard from '../../components/MovieCard';
import { MOVIES } from '../../data/movies';

export default function MoviesScreen() {
  const [search, setSearch] = useState('');
const { movies } = useMovies();
  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (query.length === 0) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
  }, [movies, search]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Movies 🎬</Text>

      <Text style={styles.subtitle}>
        Discover your next favorite movie
      </Text>

      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search movies..."
        placeholderTextColor="#9CA3AF"
        accessibilityLabel="Search movies"
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      <FlatList
        data={filteredMovies}
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
)
}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              No movies found 🍿
            </Text>
            <Text style={styles.emptyMessage}>
              No movie matches "{search}". Try another title.
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
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 22,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 45,
    paddingHorizontal: 12,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});