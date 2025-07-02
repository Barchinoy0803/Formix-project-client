import { memo, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AiOutlineComment } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import ReactQuill from 'react-quill-new';
import socket, { connectSocket } from '../../service/socket';

interface CommentType {
  id: string;
  context: string;
}

const Comments = ({ templateId }: { templateId: string }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: { content: '' },
  });

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    connectSocket()
    socket.emit('comment:getAll', templateId);
    socket.on('comment:getAll', (data: CommentType[]) => setComments(data));
    socket.on('comment:new', (comment: CommentType) =>
      setComments((prev) => [...prev, comment]),
    );
    return () => {
      socket.off('comment:getAll');
      socket.off('comment:new');
    };
  }, [templateId]);

  const onSubmit = (data: { content: string }) => {
    if (!data.content.trim()) return;
    socket.emit('comment:new', {
      context: data.content,
      templateId,
    });
    reset();
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls='panel-comments'
        id='panel-comments-header'
      >
        <Box className='flex gap-2 items-center'>
          <AiOutlineComment className='text-2xl' />
          <Typography variant='h6'>Comments</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='content'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ReactQuill
                theme='snow'
                value={field.value}
                onChange={field.onChange}
                placeholder='Matn kiriting...'
              />
            )}
          />
          <div className='flex justify-end'>
            <Button type='submit' endIcon={<IoMdSend />} variant='outlined'>
              Send
            </Button>
          </div>
        </form>
        <div className='mt-4'>
          {comments.map((comment) => (
            <Box key={comment.id} className='mb-3 border p-2 rounded'>
              <div dangerouslySetInnerHTML={{ __html: comment.context }} />
            </Box>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(Comments);
