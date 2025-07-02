import { memo, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Button, IconButton, ClickAwayListener } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AiOutlineComment } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import ReactQuill from 'react-quill-new';
import EmojiPicker from 'emoji-picker-react';
import socket, { connectSocket } from '../../service/socket';

interface CommentType {
  id: string;
  context: string;
}

const Comments = ({ templateId }: { templateId: string }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const { handleSubmit, control, reset, setValue } = useForm({
    defaultValues: { content: '' },
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  /* ---------- SOCKET ---------- */
  useEffect(() => {
    connectSocket();
    socket.emit('comment:getAll', templateId);

    socket.on('comment:getAll', setComments);
    socket.on('comment:new', (c) => setComments((p) => [...p, c]));

    return () => {
      socket.off('comment:getAll');
      socket.off('comment:new');
    };
  }, [templateId]);

  /* ---------- EMOJI ---------- */
  const insertEmoji = (emoji: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    const pos = range ? range.index : quill.getLength();
    quill.insertText(pos, emoji);
    quill.setSelection(pos + emoji.length);
    setValue('content', quill.root.innerHTML, { shouldDirty: true });
    setShowPicker(false); // automatik yopamiz
  };

  /* ---------- SUBMIT ---------- */
  const onSubmit = ({ content }: { content: string }) => {
    if (!content.trim()) return;
    socket.emit('comment:new', { context: content, templateId });
    reset();
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
            rules={{ required: true }}
            render={({ field }) => (
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={field.value}
                onChange={field.onChange}
                placeholder="Matn kiriting..."
              />
            )}
          />

          {/* ‑‑‑ Toolbar: emoji toggle + send ‑‑‑ */}
          <div className="flex justify-between items-center">
            <div>
              <IconButton
                aria-label="emoji"
                onClick={() => setShowPicker((v) => !v)}
              >
                <MdOutlineEmojiEmotions />
              </IconButton>
            </div>

            <Button type="submit" endIcon={<IoMdSend />} variant="outlined">
              Send
            </Button>
          </div>

          {/* ‑‑‑ EmojiPicker pop‑up ‑‑‑ */}
          {showPicker && (
            <ClickAwayListener onClickAway={() => setShowPicker(false)}>
              <div className="relative z-50">
                <EmojiPicker
                  onEmojiClick={(e) => insertEmoji(e.emoji)}
                  height={320}
                />
              </div>
            </ClickAwayListener>
          )}
        </form>

        {/* ‑‑‑ Comment list ‑‑‑ */}
        <div className="mt-4">
          {comments.map((c) => (
            <Box key={c.id} className="mb-3 border p-2 rounded">
              <div dangerouslySetInnerHTML={{ __html: c.context }} />
            </Box>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default memo(Comments);
