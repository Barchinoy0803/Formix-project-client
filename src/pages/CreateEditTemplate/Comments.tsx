import { memo, useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button } from '@mui/material';
import { AiOutlineComment } from "react-icons/ai";
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import { IoMdSend } from "react-icons/io";
import socket from '../../service/socket';

interface CommentType {
  id: string;
  context: string;
}

const Comments = ({ templateId }: { templateId: string }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    socket.on('comment:new', (comment: any) => {
      setComments((prev) => [...prev, comment]);
    });

    socket.emit('comment:getAll');
    socket.on('comment:getAll', (data: CommentType[]) => {
      setComments(data);
    });

    return () => {
      socket.off('comment:new');
      socket.off('comment:getAll');
    };
  }, []);

  const onSubmit = (data: any) => {
    if (!data.context.trim()) return;

    socket.emit('comment:new', {
      context: data.context,
      templateId
    });

    reset();
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Box className="flex gap-2 items-center">
          <AiOutlineComment className='text-2xl' />
          <Typography variant='h6' component="span">Comments</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Comment is required' }}
            render={({ field, fieldState }) => (
              <div>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Matn kiriting..."
                />
                {fieldState.error && (
                  <Typography color="error" variant="body2" mt={1}>
                    {fieldState.error.message}
                  </Typography>
                )}
              </div>
            )}
          />
          <div className='flex justify-end'>
            <Button type="submit" endIcon={<IoMdSend />} variant="outlined">Send</Button>
          </div>
        </form>

        <div className="mt-4">
          {comments.map((comment) => (
            <Box key={comment.id} className="mb-3 border p-2 rounded">
              <div dangerouslySetInnerHTML={{ __html: comment.context }} />
            </Box>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(Comments);