import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

const normalizeImageUrls = (value) => (
    Array.isArray(value)
        ? value.filter((url) => typeof url === 'string' && url.startsWith('http'))
        : []
);

export const loadNotes = async (uid = '') => {
    if (!uid) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef)

    const notes = [];
    docs.forEach(docSnap => {
        const data = docSnap.data();

        notes.push({
            id: docSnap.id,
            title: typeof data.title === 'string' ? data.title : '',
            body: typeof data.body === 'string' ? data.body : '',
            date: data.date ?? new Date().getTime(),
            imageUrls: normalizeImageUrls(data.imageUrls),
            isFavorite: Boolean(data.isFavorite),
        });
    })

    return notes;
}
