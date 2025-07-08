import { memo, useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, IconButton, ClickAwayListener, Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AiOutlineComment } from 'react-icons/ai';
import { IoSend } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import ReactQuill from 'react-quill-new';
import EmojiPicker from 'emoji-picker-react';
import socket, { connectSocket } from '../../service/socket';
import { MdEdit, MdDelete } from "react-icons/md";
import { CommentType } from '../../types';
import { getBgColor } from './helpers';
import { getUserId } from '../../helpers';
import { useTranslator } from '../../hooks/useTranslator';


const Comments = ({ templateId }: { templateId: string }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const { t } = useTranslator('comments')

  const { handleSubmit, control, reset, setValue } = useForm<CommentType>({
    defaultValues: { context: '' },
  });

  const [comments, setComments] = useState<CommentType[]>([]);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  useEffect(() => {
    connectSocket();
    socket.emit('comment:getAll', templateId);

    socket.on('comment:getAll', setComments);
    socket.on('comment:new', (c) => setComments((p) => [...p, c]));
    socket.on('comment:delete', (id) =>
      setComments((prev) => prev.filter((comment) => comment.id !== id))
    );
    socket.on('comment:update', (updatedComment) =>
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment
        )
      )
    );

    return () => {
      socket.off('comment:getAll');
      socket.off('comment:new');
      socket.off('comment:delete');
      socket.off('comment:update')
    };
  }, [templateId]);

  const handleEditComment = (comment: CommentType) => {
    setIsEditMode(true)
    reset(comment)
  }

  const handleDeleteComment = (id: string) => {
    socket.emit('comment:delete', { id, templateId })
  }

  const onSubmit = ({ context, id }: { context: string, id: string }) => {
    if (!context.trim()) return;
    if (!isEditMode) {
      socket.emit('comment:new', { context, templateId });
    } else {
      socket.emit('comment:update', {
        id,
        updateData: {
          context,
          templateId,
        },
        templateId
      });
      setIsEditMode(false);
    }
    setValue("context", "");
  };


  const insertEmoji = (emoji: string) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const range = quill.getSelection();
    const pos = range ? range.index : quill.getLength();
    quill.insertText(pos, emoji);
    quill.setSelection(pos + emoji.length);
    setValue('context', quill.root.innerHTML, { shouldDirty: true });
    setShowPicker(false);
  };

  return (
    <Box className="rounded-xl shadow-lg overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <Accordion className="shadow-none">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon className="text-gray-600 dark:text-gray-300" />}
          className="bg-slate-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 min-h-16 hover:bg-slate-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Box className="flex items-center gap-3">
            <AiOutlineComment className="text-2xl text-gray-600 dark:text-gray-300" />
            <Typography variant="h6" className="font-semibold text-slate-800 dark:text-gray-100">
              {t('title')} ({comments.length})
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails className="flex flex-col gap-6 p-6">
          {comments.length > 0 ? (
            <Box className="space-y-4 h-[400px] overflow-y-auto content px-3">
              <Box className="flex items-center gap-3 mb-6">
                <Box className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1" />
                <Box className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent flex-1" />
              </Box>

              {comments.map((c) => (
                <Box
                  key={c.id}
                  className="group relative bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl px-3 py-2 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <Box className="flex items-center gap-2 mb-3">
                    <Avatar sx={{ bgcolor: getBgColor() }}>
                      {c.user?.username[0]}
                    </Avatar>
                    <Typography variant="h6" fontFamily="monospace" className="text-gray-800 dark:text-gray-100">
                      {c.user?.username}
                    </Typography>
                  </Box>
                  <Box
                    className="prose prose-sm max-w-none break-words overflow-wrap-anywhere
                    [&_p]:text-gray-800 dark:[&_p]:text-gray-100
                    [&_strong]:text-gray-900 dark:[&_strong]:text-white
                    [&_em]:text-gray-700 dark:[&_em]:text-gray-400
                    [&_ul]:ml-4 [&_ol]:ml-4
                    [&_li]:text-gray-800 dark:[&_li]:text-gray-200
                    [&_*]:m-0 [&_p]:mb-2 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: c.context }}
                  />

                  <Box className="absolute top-4 right-4 w-2 h-2 bg-blue-100 dark:bg-blue-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <Box className="absolute bottom-4 right-6 w-1 h-1 bg-blue-200 dark:bg-blue-500 rounded-full opacity-30 group-hover:opacity-70 transition-opacity" />
                  {
                    getUserId() === c.user?.id &&
                    <Box className="flex justify-end">
                      <IconButton><MdEdit className="text-gray-600 dark:text-gray-300" onClick={() => handleEditComment(c)} /></IconButton>
                      <IconButton><MdDelete className="text-gray-600 dark:text-gray-300" onClick={() => handleDeleteComment(c.id)} /></IconButton>
                    </Box>
                  }
                </Box>
              ))}
            </Box>
          ) : (
            <Box className="text-center py-16 px-6">
              <Box className="relative mb-6">
                <Box className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <AiOutlineComment className="text-3xl text-gray-400 dark:text-gray-300" />
                </Box>
                <Box className="absolute -top-1 -right-1 w-6 h-6 bg-blue-100 dark:bg-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs text-blue-600 dark:text-white font-medium">0</span>
                </Box>
              </Box>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">{t('noComments')}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                {t('noCommentsNote')}
              </p>
            </Box>
          )}

          <Box className="bg-slate-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Box className="comment-editor">
                <Controller
                  name="context"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Box className="[&_.ql-toolbar]:rounded-t-lg [&_.ql-toolbar]:border-gray-300 dark:[&_.ql-toolbar]:border-gray-700 [&_.ql-container]:rounded-b-lg [&_.ql-container]:border-gray-300 dark:[&_.ql-container]:border-gray-700 [&_.ql-container]:border-t-0 [&_.ql-editor]:min-h-20 [&_.ql-editor]:p-3 [&_.ql-editor.ql-blank::before]:text-gray-400 dark:[&_.ql-editor.ql-blank::before]:text-gray-500">
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t('writeComment')}
                      />
                    </Box>
                  )}
                />
              </Box>

              <Box className="flex justify-between items-center pt-2">
                <Box className="relative">
                  <IconButton
                    onClick={() => setShowPicker((v) => !v)}
                    className={`transition-all duration-200 ${
                      showPicker
                        ? 'bg-sky-100 text-sky-600 hover:bg-sky-200 dark:bg-sky-800 dark:text-sky-300'
                        : 'text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-gray-700 hover:text-slate-700'
                    }`}
                  >
                    <MdOutlineEmojiEmotions className="text-xl" />
                  </IconButton>

                  {showPicker && (
                    <ClickAwayListener onClickAway={() => setShowPicker(false)}>
                      <Box className="absolute bottom-full left-0 z-50 mb-2 rounded-xl overflow-hidden shadow-2xl dark:bg-gray-800">
                        <EmojiPicker
                          onEmojiClick={(e) => insertEmoji(e.emoji)}
                          height={420}
                        />
                      </Box>
                    </ClickAwayListener>
                  )}
                </Box>

                <IconButton
                  type="submit"
                  disableRipple
                  className="!bg-blue-500 hover:!bg-blue-600 !text-white p-2 rounded-lg font-medium
                             !shadow-lg !shadow-blue-500/25 hover:!shadow-blue-500/40
                             transition-all duration-200"
                >
                  <IoSend className="text-2xl" />
                </IconButton>
              </Box>
            </form>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default memo(Comments);