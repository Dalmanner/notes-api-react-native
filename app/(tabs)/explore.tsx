import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createNote, getNotes, updateNote, deleteNote } from "../../src/api/notesApi";

interface Note {
  id: string;
  title: string;
  text: string;
}

export default function ExploreScreen() {
  const [newNote, setNewNote] = useState<{ title: string; text: string }>({ title: "", text: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null); // For update/delete

  // Fetch notes from API
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

  // Handle note creation
  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.text) {
      alert("Title and text are required to create a note.");
      return;
    }

    try {
      await createNote(newNote);
      alert("Note created successfully!");
      setNewNote({ title: "", text: "" }); // Reset input fields
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error creating note:", err);
      alert("Failed to create note.");
    }
  };

  // Handle note update
  const handleUpdateNote = async () => {
    if (!selectedNote) {
      alert("No note selected for update.");
      return;
    }

    try {
      await updateNote(selectedNote.id, { title: newNote.title, text: newNote.text });
      alert("Note updated successfully!");
      setNewNote({ title: "", text: "" });
      setSelectedNote(null); // Clear selection
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error updating note:", err);
      alert("Failed to update note.");
    }
  };

  // Handle note deletion
  const handleDeleteNote = async () => {
    if (!selectedNote) {
      alert("No note selected for deletion.");
      return;
    }

    try {
      await deleteNote(selectedNote.id);
      alert("Note deleted successfully!");
      setNewNote({ title: "", text: "" });
      setSelectedNote(null); // Clear selection
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error deleting note:", err);
      alert("Failed to delete note.");
    }
  };

  // Handle note selection
  const handleSelectNote = (note: Note) => {
    setSelectedNote(note); // Set the selected note
    setNewNote({ title: note.title, text: note.text }); // Populate input fields
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
      <Text style={styles.header}>
        {selectedNote ? "Edit Note" : "Create a Note"}
      </Text>

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

      {!selectedNote ? (
        <Button title="Create Note" onPress={handleCreateNote} />
      ) : (
        <>
          <Button title="Update Note" onPress={handleUpdateNote} />
          <Button title="Delete Note" onPress={handleDeleteNote} color="red" />
          <Button
            title="Cancel"
            onPress={() => {
              setNewNote({ title: "", text: "" });
              setSelectedNote(null); // Clear selection
            }}
            color="gray"
          />
        </>
      )}

      <Text style={styles.header}>Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.note}
            onPress={() => handleSelectNote(item)}
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
