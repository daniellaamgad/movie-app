import { useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';

import type { Movie } from '../../data/movies';
import { useMovies } from '../../context/movies';

export default function AddMovieScreen() {
  const { addMovie } = useMovies();

  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');

  function handleSave() {
    const cleanTitle = title.trim();
    const cleanGenre = genre.trim();
    const parsedYear = Number(year.trim());

    if (!cleanTitle) {
      setError('Please enter a movie title.');
      return;
    }

    if (
      year.trim() === '' ||
      !Number.isInteger(parsedYear) ||
      parsedYear < 1900 ||
      parsedYear > new Date().getFullYear()
    ) {
      setError(
        `Enter a valid year from 1900 to ${new Date().getFullYear()}.`
      );
      return;
    }

    if (!cleanGenre) {
      setError('Please enter a movie genre.');
      return;
    }

    const newMovie: Movie = {
      id: `movie-${Date.now()}`,
      title: cleanTitle,
      year: parsedYear,
      genre: cleanGenre,
      rating: 0,
      emoji: '🎬',
    };

    addMovie(newMovie);

    setTitle('');
    setYear('');
    setGenre('');
    setError('');

    Keyboard.dismiss();
    Alert.alert('Success', 'Movie added successfully!', [
      {
        text: 'OK',
        onPress: () => router.replace('/'),
      },
    ]);
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add a Movie 🎬</Text>

      <Text style={styles.subtitle}>
        Add a new movie to your collection.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Movie title</Text>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={(value) => {
            setTitle(value);
            setError('');
          }}
          placeholder="Enter movie title"
          placeholderTextColor="#9CA3AF"
          accessibilityLabel="Movie title"
        />

        <Text style={styles.label}>Year</Text>

        <TextInput
          style={styles.input}
          value={year}
          onChangeText={(value) => {
            setYear(value);
            setError('');
          }}
          placeholder="e.g. 2020"
          placeholderTextColor="#9CA3AF"
          accessibilityLabel="Movie year"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Genre</Text>

        <TextInput
          style={styles.input}
          value={genre}
          onChangeText={(value) => {
            setGenre(value);
            setError('');
          }}
          placeholder="e.g. Drama"
          placeholderTextColor="#9CA3AF"
          accessibilityLabel="Movie genre"
        />

        {error !== '' && (
          <Text style={styles.error}>{error}</Text>
        )}

        <Pressable
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save Movie</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
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
    marginBottom: 26,
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 13,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  error: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});