//types.js
//import { RootStackParamList } from "../../src/navigation/types.ts";

export type RootStackParamList = {

    Explore: undefined;
    Home: undefined;
    Notes: undefined;
    NoteDetails: { id: string };
    CreateNote: undefined;
    EditNote: { id: string };
    DeletedNotes: undefined;
    RestoreNote: { id: string };
    Signup: undefined;
    Login: undefined;
    Loading: undefined;
    Error: { message: string };
    Success: { message: string };
    Logout: undefined;
    Auth: undefined;
    Theme: undefined;
    Settings: undefined;
    About: undefined;
    Profile: undefined;
    ChangePassword: undefined;
    DeleteAccount: undefined;
    DeleteNote: { id: string };
    DeleteNoteDetails: { id: string };
    DeleteNoteConfirm: { id: string };
    DeleteNoteSuccess: { id: string };
    DeleteNoteError: { id: string };
    DeleteNoteLoading: { id: string };
    RestoreNoteSuccess: { id: string };
    RestoreNoteError: { id: string };
    RestoreNoteLoading: { id: string };
    RestoreNoteConfirm: { id: string };
    RestoreNoteDetails: { id: string };
};

export const HOME = 'Home';
export const NOTES = 'Notes';
export const NOTE_DETAILS = 'NoteDetails';
export const CREATE_NOTE = 'CreateNote';
export const EDIT_NOTE = 'EditNote';
export const DELETED_NOTES = 'DeletedNotes';
export const RESTORE_NOTE = 'RestoreNote';
export const SIGNUP = 'Signup';
export const LOGIN = 'Login';
export const LOADING = 'Loading';
export const ERROR = 'Error';
export const SUCCESS = 'Success';
export const LOGOUT = 'Logout';
export const AUTH = 'Auth';
export const THEME = 'Theme';
export const SETTINGS = 'Settings';
export const ABOUT = 'About';
export const PROFILE = 'Profile';
export const CHANGE_PASSWORD = 'ChangePassword';
export const DELETE_ACCOUNT = 'DeleteAccount';
export const DELETE_NOTE = 'DeleteNote';
export const DELETE_NOTE_DETAILS = 'DeleteNoteDetails';
export const DELETE_NOTE_CONFIRM = 'DeleteNoteConfirm';
export const DELETE_NOTE_SUCCESS = 'DeleteNoteSuccess';
export const DELETE_NOTE_ERROR = 'DeleteNoteError';
export const DELETE_NOTE_LOADING = 'DeleteNoteLoading';
export const RESTORE_NOTE_SUCCESS = 'RestoreNoteSuccess';
export const RESTORE_NOTE_ERROR = 'RestoreNoteError';
export const RESTORE_NOTE_LOADING = 'RestoreNoteLoading';
export const RESTORE_NOTE_CONFIRM = 'RestoreNoteConfirm';
export const RESTORE_NOTE_DETAILS = 'RestoreNoteDetails';


