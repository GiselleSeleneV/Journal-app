import { doc, collection, setDoc, deleteDoc } from "firebase/firestore/lite"
import Swal from "sweetalert2"
import { FirebaseDB } from "../../firebase/config"
import {
    addNewEmptyNote,
    setActiveNote,
    savingNewNote,
    setNotes,
    setSaving,
    clearSaving,
    updateNote,
    deleteNoteById,
    deleteNotesByIds,
    toggleNoteFavorite,
} from "./"
import { loadNotes } from "../../helpers/loadNotes"

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())

        try {
            const { uid } = getState().auth

            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime(),
                imageUrls: [],
                isFavorite: false,
            }

            const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
            await setDoc(newDoc, newNote);

            newNote.id = newDoc.id;

            dispatch(addNewEmptyNote(newNote));
            dispatch(setActiveNote(newNote));
        } catch (error) {
            console.error(error);
            dispatch(clearSaving());
            Swal.fire('Error', 'No se pudo crear la nota', 'error');
        }
    }
}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe')

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        try {
            const { uid } = getState().auth;
            const { active: note } = getState().journal;

            if (!note?.id) {
                throw new Error('No hay una nota activa');
            }

            const noteToSave = {
                id: note.id,
                title: typeof note.title === 'string' ? note.title : '',
                body: typeof note.body === 'string' ? note.body : '',
                date: note.date ?? new Date().getTime(),
                imageUrls: Array.isArray(note.imageUrls)
                    ? note.imageUrls.filter((url) => typeof url === 'string' && url.startsWith('http'))
                    : [],
                isFavorite: Boolean(note.isFavorite),
            };

            const { id, ...noteToFireStore } = noteToSave;

            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`)
            await setDoc(docRef, noteToFireStore, { merge: true })

            dispatch(updateNote(noteToSave));
        } catch (error) {
            console.error(error);
            dispatch(clearSaving());
            Swal.fire('Error', 'No se pudo guardar la nota', 'error');
        }
    }
}

export const startToggleFavorite = (noteId) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { notes, active } = getState().journal;
        const target = active?.id === noteId
            ? active
            : notes.find((note) => note.id === noteId);

        if (!target) return;

        const nextFavorite = !target.isFavorite;
        dispatch(toggleNoteFavorite(noteId));

        try {
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteId}`);
            await setDoc(docRef, { isFavorite: nextFavorite }, { merge: true });
        } catch (error) {
            console.error(error);
            dispatch(toggleNoteFavorite(noteId));
            Swal.fire('Error', 'No se pudo actualizar el favorito', 'error');
        }
    }
}

export const startDeletingNote = (noteId) => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        try {
            const { uid } = getState().auth;
            const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteId}`);
            await deleteDoc(docRef);

            dispatch(deleteNoteById(noteId));
        } catch (error) {
            console.error(error);
            dispatch(clearSaving());
            Swal.fire('Error', 'No se pudo eliminar la nota', 'error');
        }
    }
}

export const startDeletingNotes = (noteIds = []) => {
    return async (dispatch, getState) => {
        const ids = [...new Set(noteIds.filter(Boolean))];
        if (ids.length === 0) return;

        dispatch(setSaving());

        try {
            const { uid } = getState().auth;
            await Promise.all(
                ids.map((noteId) => {
                    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${noteId}`);
                    return deleteDoc(docRef);
                })
            );

            dispatch(deleteNotesByIds(ids));
        } catch (error) {
            console.error(error);
            dispatch(clearSaving());
            Swal.fire('Error', 'No se pudieron eliminar las notas seleccionadas', 'error');
        }
    }
}
