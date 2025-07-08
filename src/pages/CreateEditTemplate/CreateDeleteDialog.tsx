import { memo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../redux/features/template.slice';
import { RootState } from '../../redux';
import { MODAL_TYPE } from '../../types';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateDeleteForm } from '../../types/form';
import { useCreateTagMutation, useDeleteTagMutation } from '../../service/api/tags.api';
import ControlledTextField from '../../components/TextField';
import { MdDelete } from 'react-icons/md';

interface CreateDeleteTagDialogProps {
  tags: any[]
}

const CreateDeleteTagDialog = ({ tags }: CreateDeleteTagDialogProps) => {
  const methods = useForm<CreateDeleteForm>();
  const { handleSubmit, control } = methods;
  const dispatch = useDispatch();

  const {
    createDeleteModal: { isOpen, type },
  } = useSelector((state: RootState) => state.templates);

  const [createTag] = useCreateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const handleClose = () => {
    dispatch(setModal({ isOpen: false }));
  };

  const handleDelete = async (id: string) => {
    await deleteTag(id).unwrap();
  };

  const onSubmit = async (data: CreateDeleteForm) => {
    await createTag(data).unwrap();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#fff', // dark:bg-gray-800
          color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#000',   // dark:text-gray-100
        }
      }}
    >
      <DialogTitle className="dark:text-white">
        {type === MODAL_TYPE.CREATE ? 'Create new tag' : 'Delete tags'}
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <form className="w-[500px]" onSubmit={handleSubmit(onSubmit)}>
            {type === MODAL_TYPE.CREATE ? (
              <ControlledTextField control={control} name="name" label="Tag name" />
            ) : (
              <Box className="flex flex-col gap-3">
                {tags?.length ? (
                  tags.map((tag) => (
                    <Box
                      key={tag.id}
                      className="flex items-center justify-between px-3 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl"
                    >
                      <Typography className="dark:text-white">{tag.name}</Typography>
                      <IconButton onClick={() => handleDelete(tag.id)}>
                        <MdDelete className="text-red-600" />
                      </IconButton>
                    </Box>
                  ))
                ) : (
                  <Typography className="dark:text-gray-400">There is not any tags</Typography>
                )}
              </Box>
            )}
            <DialogActions className="mt-2">
              <Button onClick={handleClose} className="dark:text-white">Cancel</Button>
              {type !== MODAL_TYPE.DELETE && (
                <Button variant="contained" type="submit">
                  Create
                </Button>
              )}
            </DialogActions>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateDeleteTagDialog);
