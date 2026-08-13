import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal)

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }
    return (
        <JournalLayout>

            {
                (active)
                    ? <NoteView />
                    : <NothingSelectedView />
            }

            <IconButton
                onClick={onClickNewNote}
                size='medium'
                disabled={isSaving}
                sx={{
                    display: { xs: 'flex', md: 'none' },
                    color: '#0F172A',
                    backgroundColor: '#C9A96E',
                    ':hover': { backgroundColor: '#D4B87A' },
                    position: 'fixed',
                    right: 24,
                    bottom: 24,
                    width: 56,
                    height: 56,
                    boxShadow: '0 12px 28px rgba(15, 23, 42, 0.2)',
                    '&.Mui-disabled': {
                        backgroundColor: 'rgba(201,169,110,0.45)',
                        color: 'rgba(15, 23, 42, 0.4)',
                    },
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout >
    )
}
