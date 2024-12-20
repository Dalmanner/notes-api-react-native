import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signup, login } from '../../src/api/notesApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await signup({ username, password });
      alert('User registered successfully!');
    } catch (err: any) {
      alert('Signup failed: ' + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      console.log("Token received:", response.data.token);
      AsyncStorage.setItem('token', response.data.token);
      console.log("Token saved to AsyncStorage");
      alert('Login successful! Your session will be active for 1 hour.');
      router.push('/explore');
    } catch (err: any) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Mac´s Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
