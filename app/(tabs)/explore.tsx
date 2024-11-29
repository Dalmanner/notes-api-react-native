import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNote, getNotes } from "../../src/api/notesApi";
import { StackNavigationProp } from '@react-navigation/stack';
import { NOTE_DETAILS, RootStackParamList } from '../../src/navigation/types';

interface Note {
  id: string;
  title: string;
  text: string;
}

export default function ExploreScreen() {
  const [newNote, setNewNote] = useState<{ title: string; text: string }>({ title: "", text: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  
  
  type ExploreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Explore'>;
  
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data); // Save notes in state
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("Failed to fetch notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, []);

  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.text) {
      alert("Title and text are required to create a note.");
      return;
    }

    try {
      await createNote(newNote); // Backend will link to userId
      alert("Note created successfully!");
      setNewNote({ title: "", text: "" }); // Reset input fields
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a Note</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newNote.title}
        onChangeText={(text) => setNewNote({ ...newNote, title: text })}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Text"
        value={newNote.text}
        onChangeText={(text) => setNewNote({ ...newNote, text })}
        multiline
      />
      <Button title="Create Note" onPress={handleCreateNote} />

      <Text style={styles.header}>Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => navigation.navigate(NOTE_DETAILS, { id: item.id })} // Ensure this matches the route name in your navigation types
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  textArea: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  note: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  title: { fontWeight: "bold" },
});
