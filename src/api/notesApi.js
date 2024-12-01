import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteData, UserData } from "../navigation/types";

const api = axios.create({
  baseURL: "https://ia81fdqska.execute-api.eu-north-1.amazonaws.com/dev/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
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

export const signup = (userData) => api.post("/user/signup", userData);
export const login = (userData) => api.post("/user/login", userData);
export const getNotes = () => api.get("/notes");
export const createNote = async (noteData) => {
  try {
    const response = await api.post("/notes", noteData);
    console.log("Note created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};
export const updateNote = (id, noteData) => api.put(`/notes/${id}`, noteData);
export const deleteNote = (id) => api.delete(`/notes/${id}`);
export const restoreNote = (id) => api.post(`/notes/restore/${id}`);
export const getDeletedNotes = () => api.get("/notes/deleted");
export const getUserData = () => api.get("/user/data");
export const updateUserData = (userData) => api.put("/user/data", userData);
export const deleteUserData = () => api.delete("/user/data");
export const logout = () => api.post("/user/logout");
export const deleteAccount = () => api.delete("/user");
export const changePassword = (passwordData) => api.put("/user/password", passwordData);
export const resetPassword = (emailData) => api.post("/user/password/reset", emailData);
export const GetNoteById = (id) => api.get(`/notes/${id}`);