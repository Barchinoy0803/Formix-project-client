import { memo, useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
// import { Box } from '@mui/material';
// import { useForm } from 'react-hook-form';
// import { TagForm } from '../../types/form';
// import ControlledTextField from '../../components/TextField';
// import { useCreateTagMutation } from '../../service/api/tags.api';
import { IoMdMore } from "react-icons/io";
import { Box } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import { RiDeleteBinLine } from "react-icons/ri";
import { MODAL_TYPE } from '../../types';
import { useDispatch } from 'react-redux';
import { setModal } from '../../redux/features/template.slice';

const ManageTag = () => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    // const { control, reset, handleSubmit } = useForm<TagForm>()

    // const [createTag] = useCreateTagMutation()
    
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = (type: MODAL_TYPE) => {
        dispatch(setModal({ type, isOpen: true }))
        console.log(1);
        
    }


    // const onSubmit = async (data: TagForm) => {
    //     await createTag(data)
    //     reset()
    // }

    return (
        <>
            <Button aria-describedby={id} onClick={handleClick}>
                <IoMdMore className='text-2xl' />
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
            >
                <Box className="flex flex-col p-3 w-[200px] gap-3">
                    <Button onClick={() => handleOpenDialog(MODAL_TYPE.CREATE)} startIcon={<FaPlus />} variant='outlined'>Create tag</Button>
                    <Button onClick={() => handleOpenDialog(MODAL_TYPE.DELETE)} color='error' className='text-red-500' startIcon={<RiDeleteBinLine />} variant='outlined'>Delete tag</Button>
                </Box>
            </Popover >
        </>
    );
}

export default memo(ManageTag)