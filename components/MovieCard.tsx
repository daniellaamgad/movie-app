import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Movie } from '../data/movies';

type MovieCardProps = {
  movie: Movie;
};

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Pressable style={styles.card}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{movie.emoji}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{movie.title}</Text>

        <Text style={styles.year}>
          {movie.year} · {movie.genre}
        </Text>

        <Text style={styles.rating}>
          ⭐ {movie.rating.toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emojiContainer: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  emoji: {
    fontSize: 36,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  year: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B45309',
    marginTop: 8,
  },
});