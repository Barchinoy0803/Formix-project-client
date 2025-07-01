import { memo, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/features/template.slice';
import { RootState } from '../../redux';

const CreateDeleteTagDialog = () => {
    const { createDeleteModal: {isOpen, type} } = useSelector((state: RootState) => state.templates)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setModal({ isOpen: false }))
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    {type}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default memo(CreateDeleteTagDialog)