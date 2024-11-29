import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteData, UserData } from "../navigation/types";

const api = axios.create({
  baseURL: "https://ia81fdqska.execute-api.eu-north-1.amazonaws.com/dev/api",
});

// Lägg till Authorization-header för varje request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); // Hämta token
    if (token) {
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Error response:', error.response);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const signup = (userData: UserData) => api.post("/user/signup", userData);
export const login = (userData: UserData) => api.post("/user/login", userData);
export const getNotes = () => api.get("/notes");
export const createNote = async (noteData: NoteData) => {
  try {
    const response = await api.post("/notes", noteData);
    console.log("Note created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};
export const updateNote = async (id: string, data: { title: string; text: string }) => {
  return axios.put(`/notes/${id}`, data);
};
export const deleteNote = (id: string) => api.delete(`/notes/${id}`);
export const restoreNote = (id: string) => api.post(`/notes/restore/${id}`);
export const getDeletedNotes = () => api.get("/notes/deleted");
//export const getNoteById = (id) => api.put(`/notes/${id}`);
