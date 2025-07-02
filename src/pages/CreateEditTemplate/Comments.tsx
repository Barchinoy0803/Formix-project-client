import { memo, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AiOutlineComment } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import socket, { CommentType } from '../../service/socket';

interface CommentsProps {
  templateId: string;
}

interface FormValues {
  content: string;
}

const Comments = ({ templateId }: CommentsProps) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { content: '' },
  });
  const [comments, setComments] = useState<CommentType[]>([]);
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const onNew = (c: CommentType) => {
      if (c.templateId === templateId) setComments(prev => [...prev, c]);
    };
    const onAll = (list: CommentType[]) => setComments(list);
    console.log(comments)

    socket.on('comment:new', onNew);
    socket.on('comment:getAll', onAll);
    socket.emit('comment:getAll', { templateId });

    return () => {
      socket.off('comment:new', onNew);
      socket.off('comment:getAll', onAll);
    };
  }, [templateId, count]);

  const onSubmit = ({ content }: FormValues) => {
    socket.emit('comment:new', { context: content, templateId });
    setCount((prev) => prev++)
    reset({ content: '' });
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
        <Box className="flex gap-2 items-center">
          <AiOutlineComment className="text-2xl" />
          <Typography variant="h6">Comments</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Comment is required' }}
            render={({ field, fieldState }) => (
              <>
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
              </>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" endIcon={<IoMdSend />} variant="outlined">
              Send
            </Button>
          </div>
        </form>

        <Box mt={4}>
          {comments.map(c => (
            <Box key={c.id} className="mb-3 border p-2 rounded">
              <div dangerouslySetInnerHTML={{ __html: c.context }} />
              <Typography variant="caption" color="text.secondary">
                {new Date(c.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(Comments);
