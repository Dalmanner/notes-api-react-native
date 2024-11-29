import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { updateNote, deleteNote } from "../../src/api/notesApi";

interface NoteDetailScreenProps {
  route: { params: { id: string, title: string, text: string } };
  navigation: { goBack: () => void };
}

export default function NoteDetailScreen({ route, navigation }: NoteDetailScreenProps) {
  const id = route?.params?.id; // Note ID passed from navigation
  const initTitle = route?.params?.title; // Note title passed from navigation
  const initText = route?.params?.text; // Note text passed from navigation
  const [title, setTitle] = useState(initTitle);
  const [text, setText] = useState(initText);
  const [loading, setLoading] = useState(true);

  // Fetch specific note by ID
  useEffect(() => {
    const fetchNoteById = async () => {
      try {
        const response = await updateNote(id, { title, text });
        const note = response.data.find((note: { id: string }) => note.id === id);
        if (note) {
          setTitle(note.title); // Populate the title
          setText(note.text);  // Populate the text
        } else {
          alert("Note not found.");
        }
      } catch (err) {
        console.error("Error fetching note:", err);
        alert("Failed to fetch note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteById();
  }, [id]);

  // Handle note update
  const handleUpdateNote = async () => {
    try {
      await updateNote(id, { title, text });
      alert("Note updated successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note.");
    }
  };

  // Handle note deletion
  const handleDeleteNote = async () => {
    try {
      await deleteNote(id);
      alert("Note deleted successfully!");
      navigation.goBack();
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note.");
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
      <Text style={styles.header}>Edit Note</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
      />
      <TextInput
        style={styles.textArea}
        value={text}
        onChangeText={setText}
        placeholder="Text"
        multiline
      />
      <Button title="Save Changes" onPress={handleUpdateNote} />
      <Button title="Delete Note" onPress={handleDeleteNote} color="red" />
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
});
