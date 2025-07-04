import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  Badge
} from '@mui/material';
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import ControlledTextField from "../../components/TextField";
import CustomSelect from "../../components/Select";
import FileUpload from "../../components/FileUpload";
import MultiSelect from "../../components/MultiSelect";
import ManageTag from "./ManageTag";
import { useGetUsersQuery } from "../../service/api/user.api";
import { useFormContext, useWatch } from 'react-hook-form';
import { TEMPLATE_TYPE } from '../../types';
import { TemplateForm } from '../../types/form';
import { templateTypeOptions } from '../../constants';
import { TbListDetails } from "react-icons/tb";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import socket, { connectSocket, LikeType } from '../../service/socket';
import { getUserId } from '../../helpers';
import { getBgColor } from './helpers';
import PersonIcon from '@mui/icons-material/Person';

interface DetailsProps {
  isReadMode: boolean;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  tagData: any;
  templateId: string;
}

const Details = ({ isReadMode, file, setFile, tagData, templateId }: DetailsProps) => {
  const { control } = useFormContext<TemplateForm>();
  const { data: allUsers, isFetching } = useGetUsersQuery({});
  const templateType = useWatch({ control, name: "type" });
  const [likes, setLikes] = useState<LikeType[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    connectSocket();
    socket.emit('like:getAll', { templateId });

    socket.on('like:updated', (data) => {
      if (data.templateId === templateId) {
        setLikes(data.likes);
        setLikeCount(data.count);
        setUserLiked(data.likes.some(like => like.userId === getUserId()));
      }
    });

    socket.on('like:error', (error) => {
      console.error('Like error:', error);
    });

    return () => {
      socket.off('like:updated');
      socket.off('like:error');
    };
  }, [templateId]);

  const handleLikeToggle = () => {
    if (!getUserId()) return;
    socket.emit('like:toggle', { templateId });
  };

  const handleOpenLikesList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLikesList = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'likes-popover' : undefined;

  return (
    <Box>
      <Box className="flex justify-between items-center p-4 bg-white shadow rounded-md">
        <Typography variant='h6'>Template</Typography>
        <Box className="flex items-center gap-3">
          <Tooltip title={userLiked ? "Unlike" : "Like"}>
            <IconButton
              onClick={handleLikeToggle}
              disabled={!getUserId()}
              color={userLiked ? "primary" : "default"}
              sx={{
                '&:hover': {
                  backgroundColor: userLiked ? 'rgba(25, 118, 210, 0.08)' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              {userLiked ? <ThumbUpAltIcon className="text-2xl" /> : <ThumbUpOffAltIcon className="text-2xl" />}
            </IconButton>
          </Tooltip>

          <Tooltip title="View who liked this template">
            <Badge
              badgeContent={likeCount}
              color="primary"
              overlap="circular"
              onClick={handleOpenLikesList}
              sx={{
                cursor: 'pointer',
                '& .MuiBadge-badge': {
                  right: 6,
                  top: 0,
                  padding: '0 4px',
                }
              }}
            >
            </Badge>
          </Tooltip>
        </Box>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseLikesList}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 400,
            p: 1,
            borderRadius: 2,
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)'
          }
        }}
      >
        <Typography variant="subtitle1" className="p-4 font-semibold">
          Liked by ({likeCount})
        </Typography>
        <Divider />
        <List dense sx={{ width: '100%', maxWidth: 360 }}>
          {likes.length > 0 ? (
            likes.map((like) => (
              <ListItem key={like.id} sx={{ py: 1 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getBgColor() }}>
                    {like.user?.username ? like.user.username[0].toUpperCase() : <PersonIcon />}
                  </Avatar>
                </ListItemAvatar>
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" className="p-4 text-gray-500">
              No likes yet
            </Typography>
          )}
        </List>
      </Popover>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Box className="flex items-center gap-2">
            <TbListDetails className="text-2xl" />
            <Typography variant="h6">Details</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="flex flex-col gap-4">
            <FileUpload isReadMode={!!isReadMode} file={file} setFile={setFile} />
            <Box className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ControlledTextField disabled={!!isReadMode} control={control} name="title" label="Title" />
              <ControlledTextField disabled={!!isReadMode} control={control} name="topic" label="Topic" />
              <CustomSelect disabled={!!isReadMode} control={control} name="type" label="Type" options={templateTypeOptions} />
            </Box>
            {templateType === TEMPLATE_TYPE.PRIVATE && (
              <MultiSelect
                name="TemplateAccess"
                control={control}
                data={allUsers}
                isLoading={isFetching}
                label="Users"
                placeholder="Select users"
                mapOption={(u) => ({ value: u.id, label: u.username })}
                disabled={!!isReadMode}
              />
            )}
            <Box className="flex gap-3 items-end">
              <MultiSelect
                name="tagIds"
                control={control}
                data={tagData}
                isLoading={isFetching}
                label="Tags"
                placeholder="Select tags"
                mapOption={(u) => ({ value: u.id, label: u.name })}
                disabled={!!isReadMode}
              />
              {!isReadMode && <ManageTag />}
            </Box>
            <ControlledTextField
              disabled={!!isReadMode}
              lineCount={5}
              control={control}
              name="description"
              label="Description"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default memo(Details);
