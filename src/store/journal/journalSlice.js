import { createSlice } from "@reduxjs/toolkit";
import { MAX_NOTE_IMAGES } from "../../journal/data/dailyMomentImages";

const normalizeImageUrls = (value) => (
    Array.isArray(value)
        ? value.filter((url) => typeof url === 'string' && url.startsWith('http'))
        : []
);

const normalizeNote = (note = {}) => ({
    ...note,
    title: typeof note.title === 'string' ? note.title : '',
    body: typeof note.body === 'string' ? note.body : '',
    imageUrls: normalizeImageUrls(note.imageUrls),
    isFavorite: Boolean(note.isFavorite),
});

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        lastSavedAt: null,
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push(normalizeNote(action.payload))
            state.isSaving = false;
        },

        setActiveNote: (state, action) => {
            const { imageUrls, isFavorite, ...rest } = action.payload;
            const sameNote = state.active?.id === rest.id;

            state.active = normalizeNote({
                ...rest,
                imageUrls: imageUrls !== undefined
                    ? imageUrls
                    : (sameNote ? state.active?.imageUrls : []),
                isFavorite: isFavorite !== undefined
                    ? isFavorite
                    : (sameNote ? state.active?.isFavorite : false),
            });

            if (!sameNote) {
                state.messageSaved = '';
                state.lastSavedAt = null;
            }
        },

        setNotes: (state, action) => {
            state.notes = action.payload.map(normalizeNote);
        },

        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        clearSaving: (state) => {
            state.isSaving = false;
        },

        updateNote: (state, action) => {
            const normalized = normalizeNote(action.payload);
            state.isSaving = false;
            state.lastSavedAt = null;
            state.notes = state.notes.map(note => (
                note.id === normalized.id ? normalized : note
            ));
            // Tras guardar, vuelve a la vista inicial
            state.active = null;
            state.messageSaved = `Nota: "${normalized.title || 'Sin título'}", actualizada correctamente`
        },

        toggleNoteImage: (state, action) => {
            if (!state.active) return;

            const url = action.payload;
            const current = normalizeImageUrls(state.active.imageUrls);

            if (current.includes(url)) {
                state.active.imageUrls = current.filter((item) => item !== url);
                return;
            }

            if (current.length >= MAX_NOTE_IMAGES) return;

            state.active.imageUrls = [...current, url];
        },

        toggleNoteFavorite: (state, action) => {
            const noteId = action.payload;
            const nextValue = (() => {
                if (state.active?.id === noteId) {
                    state.active.isFavorite = !state.active.isFavorite;
                    return state.active.isFavorite;
                }
                return null;
            })();

            state.notes = state.notes.map((note) => {
                if (note.id !== noteId) return note;
                return {
                    ...note,
                    isFavorite: nextValue !== null ? nextValue : !note.isFavorite,
                };
            });
        },

        deleteNoteById: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter(note => note.id !== action.payload);

            if (state.active?.id === action.payload) {
                state.active = null;
                state.lastSavedAt = null;
                state.messageSaved = '';
            }
        },

        deleteNotesByIds: (state, action) => {
            const ids = new Set(action.payload || []);
            state.isSaving = false;
            state.notes = state.notes.filter((note) => !ids.has(note.id));

            if (state.active?.id && ids.has(state.active.id)) {
                state.active = null;
                state.lastSavedAt = null;
                state.messageSaved = '';
            }
        },
    }
})

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    clearSaving,
    updateNote,
    toggleNoteImage,
    toggleNoteFavorite,
    deleteNoteById,
    deleteNotesByIds,
} = journalSlice.actions;
