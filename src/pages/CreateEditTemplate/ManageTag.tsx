import { memo, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { IoMdMore } from "react-icons/io";
import { Box } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from "react-icons/ri";
import { MODAL_TYPE } from '../../types';
import { useDispatch } from 'react-redux';
import { setModal } from '../../redux/features/template.slice';

const ManageTag = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = (type: MODAL_TYPE) => {
        dispatch(setModal({ type, isOpen: true }));
        handleClose();
    };

    return (
        <>
            <Button aria-describedby={id} onClick={handleClick}>
                <IoMdMore className="text-2xl dark:text-white" />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        '&.MuiPaper-root': {
                            backgroundColor: theme => theme.palette.mode === 'dark' ? '#1f2937' : '#fff',
                            color: theme => theme.palette.mode === 'dark' ? '#f3f4f6' : '#000',         
                        },
                    }
                }}
            >
                <Box className="flex flex-col p-3 w-[200px] gap-3">
                    <Button
                        onClick={() => handleOpenDialog(MODAL_TYPE.CREATE)}
                        startIcon={<FaPlus />}
                        variant="outlined"
                        className="dark:text-white"
                    >
                        Create tag
                    </Button>
                    <Button
                        onClick={() => handleOpenDialog(MODAL_TYPE.DELETE)}
                        color="error"
                        className="text-red-500 dark:text-red-400"
                        startIcon={<RiDeleteBinLine />}
                        variant="outlined"
                    >
                        Delete tag
                    </Button>
                </Box>
            </Popover>
        </>
    );
};

export default memo(ManageTag);
