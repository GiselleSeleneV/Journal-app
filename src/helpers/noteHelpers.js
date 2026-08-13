/**
 * Agrupa notas en Favoritos / Hoy / Esta semana / Anteriores.
 * Las favoritas solo aparecen en "Favoritos" para no duplicar.
 * Dentro de cada grupo: por fecha desc.
 */
export const groupNotesByDate = (notes = []) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const day = now.getDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    const startOfWeek = startOfToday - daysFromMonday * 24 * 60 * 60 * 1000;

    const sortByDateDesc = (list) => (
        [...list].sort((a, b) => (b.date || 0) - (a.date || 0))
    );

    const favorites = sortByDateDesc(notes.filter((note) => note.isFavorite));
    const regularNotes = notes.filter((note) => !note.isFavorite);

    const today = [];
    const week = [];
    const older = [];

    regularNotes.forEach((note) => {
        const noteDate = note.date || 0;
        if (noteDate >= startOfToday) today.push(note);
        else if (noteDate >= startOfWeek) week.push(note);
        else older.push(note);
    });

    const groups = [];

    if (favorites.length > 0) {
        groups.push({
            key: 'favorites',
            label: 'Favoritos',
            notes: favorites,
        });
    }

    if (today.length > 0) {
        groups.push({ key: 'today', label: 'Hoy', notes: sortByDateDesc(today) });
    }
    if (week.length > 0) {
        groups.push({ key: 'week', label: 'Esta semana', notes: sortByDateDesc(week) });
    }
    if (older.length > 0) {
        groups.push({ key: 'older', label: 'Anteriores', notes: sortByDateDesc(older) });
    }

    return groups;
};

export const formatSavedAgo = (timestamp) => {
    if (!timestamp) return '';

    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 8) return 'Guardado ahora';
    if (seconds < 60) return `Guardado hace ${seconds} s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Guardado hace ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Guardado hace ${hours} h`;

    const days = Math.floor(hours / 24);
    return `Guardado hace ${days} d`;
};
