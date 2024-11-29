import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { updateNote, deleteNote } from "../../src/api/notesApi";

interface NoteDetailScreenProps {
  route: { params: { note: { id: string; title: string; text: string } } };
  navigation: { goBack: () => void };
}

export default function NoteDetailScreen({ route = { params: { note: { id: '', title: '', text: '' } } }, navigation }: NoteDetailScreenProps) {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const handleUpdateNote = async () => {
    try {
      await updateNote(note.id, { title, text });
      alert("Note updated successfully!");
      navigation.goBack(); // Navigera tillbaka till anteckningslistan
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note.");
    }
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote(note.id);
      alert("Note deleted successfully!");
      navigation.goBack(); // Navigera tillbaka till anteckningslistan
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note.");
    }
  };

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
