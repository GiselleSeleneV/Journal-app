import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView, NoteView } from '../views'
import { AddOutlined } from '@mui/icons-material'

export const JournalPage = () => {
    return (
        <JournalLayout>
            {/* <Typography variant='h1'>JournalPage</Typography> */}
            <NothingSelectedView />

            {/* <NoteView /> */}
            <IconButton
                size='medium'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 40,
                    bottom: 40,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}