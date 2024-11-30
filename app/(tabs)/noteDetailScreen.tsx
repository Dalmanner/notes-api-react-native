import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { updateNote, deleteNote, GetNoteById } from "../../src/api/notesApi";
import { useNavigation } from "expo-router";

interface Note {
  id: string;
  title: string;
  text: string;
}

interface NoteDetailScreenProps {
  route: { params: { id: string; title: string; text: string } };
  navigation: { goBack: () => void };
}

export default function NoteDetailScreen() {
  const { route, navigation } = useNavigation<NoteDetailScreenProps>();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(route?.params?.id);
  const [title, setTitle] = useState(route?.params?.title);
  const [text, setText] = useState(route?.params?.text);



  // Fetch specific note by ID, //https://ia81fdqska.execute-api.eu-north-1.amazonaws.com/dev/api/notes/89fb595c-dfa6-4c79-b409-60c6332bff97 // PUT, a correct way to update a note by id
  useEffect(() => {
    const fetchNoteById = async () => {
      const id = route?.params?.id; // Get ID from navigation params
      if (!id) return; // Handle case where no ID is provided
  
      try {
        const response = await GetNoteById(id);
        setTitle(response.data.title);
        setText(response.data.text);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching note by ID:", err);
        alert("Failed to fetch note.");
      }
    }
    fetchNoteById();
  }
  , [route?.params?.id]); // Fetch note when ID changes


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
