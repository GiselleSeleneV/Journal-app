import { DeleteOutline, Notes } from "@mui/icons-material"
import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote } from "../../store/journal"
import { useDispatch, useSelector } from "react-redux"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();
    const { isSaving } = useSelector(state => state.journal);

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }

    const onDeleteNote = (event) => {
        event.stopPropagation();
        dispatch(startDeletingNote(id));
    }

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <IconButton
                    edge="end"
                    aria-label="eliminar nota"
                    onClick={onDeleteNote}
                    disabled={isSaving}
                    color="error"
                >
                    <DeleteOutline />
                </IconButton>
            }
        >
            <ListItemButton
                onClick={onClickNote}
                sx={{ alignItems: 'flex-start', pr: 6 }}
            >
                <ListItemIcon sx={{ mt: 0.5 }}>
                    <Notes />
                </ListItemIcon>

                <Grid container direction="column">
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                            sx: {
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: 150
                            }
                        }}
                    />
                    <ListItemText
                        secondary={body}
                        secondaryTypographyProps={{
                            sx: {
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                textAlign: 'justify'
                            }
                        }}
                    />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
