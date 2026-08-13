import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null
        // active: {
        //     id: '123',
        //     title: '',
        //     body: '',
        //     date: 124,
        //     imageUrl: []
        // }

    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
        },

        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {

                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `Nota: "${action.payload.title}", actualizada correctamente`
        },

        deleteNoteById: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter(note => note.id !== action.payload);

            if (state.active?.id === action.payload) {
                state.active = null;
            }
        },
    }
})

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } = journalSlice.actions;
