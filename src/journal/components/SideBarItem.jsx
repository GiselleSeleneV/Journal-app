import { Notes } from "@mui/icons-material"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { setActiveNote } from "../../store/journal/journalSlice"
import { useDispatch } from "react-redux"

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageUrls }));
    }
    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={onClickNote}
                sx={{ alignItems: 'flex-start' }}
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
                                maxWidth: 180
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