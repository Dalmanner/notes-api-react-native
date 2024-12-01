import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { getDeletedNotes, restoreNote } from "../../src/api/notesApi.js";

interface Note {
  id: string;
  title: string;
  text: string;
}

export default function DeletedNotesScreen() {
  const [deletedNotes, setDeletedNotes] = useState<Note[]>([]);

  const fetchDeletedNotes = async () => {
    try {
      const response = await getDeletedNotes();
      setDeletedNotes(response.data);
      handleRefresh();
    } catch (err: any) {
      console.error("Error fetching deleted notes:", err);
      alert("Failed to fetch deleted notes.");
    }
  };

  const handleRestoreNote = async (id: string) => {
    try {
      await restoreNote(id);
      alert("Note restored!");
      fetchDeletedNotes();
    } catch (err: any) {
      alert("Failed to restore note: " + err.message);
    }
  };

  const handleRefresh = () => {
    fetchDeletedNotes();
  };

  useEffect(() => {
    fetchDeletedNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Deleted Notes</Text>
      <FlatList
        data={deletedNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.text}</Text>
            <Button title="Restore" onPress={() => handleRestoreNote(item.id)} />
          </View>
        )}
      />
      <Button title="Refresh" onPress={handleRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  note: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  title: { fontWeight: "bold" },
});
