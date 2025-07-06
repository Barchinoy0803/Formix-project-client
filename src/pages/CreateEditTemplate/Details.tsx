import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Tooltip,
  Badge,
} from '@mui/material'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import ControlledTextField from '../../components/TextField'
import CustomSelect from '../../components/Select'
import FileUpload from '../../components/FileUpload'
import MultiSelect from '../../components/MultiSelect'
import ManageTag from './ManageTag'
import { useGetUsersQuery } from '../../service/api/user.api'
import { useFormContext, useWatch } from 'react-hook-form'
import { TEMPLATE_TYPE } from '../../types'
import { TemplateForm } from '../../types/form'
import { templateTypeOptions } from '../../constants'
import { TbListDetails } from 'react-icons/tb'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { getUserId } from '../../helpers'
import likeSocket, { connectSocket } from '../../service/likeSocket'
import { useTranslator } from '../../hooks/useTranslator'

interface DetailsProps {
  isReadMode: boolean
  setFile: Dispatch<SetStateAction<File | undefined>>
  file: File | undefined
  tagData: any
  templateId: string
}

const Details = ({
  isReadMode,
  file,
  setFile,
  tagData,
  templateId,
}: DetailsProps) => {
  const { control } = useFormContext<TemplateForm>()
  const { data: allUsers, isFetching } = useGetUsersQuery({})
  const templateType = useWatch({ control, name: 'type' })
  const [likeCount, setLikeCount] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { t } = useTranslator('template')
  const { t: buttons } = useTranslator('buttons')
  const { t: table } = useTranslator('table')

  useEffect(() => {
    connectSocket()
    likeSocket.emit('like:getAll', { templateId })

    likeSocket.on('like:updated', (data) => {
      if (data.templateId === templateId) {
        setLikeCount(data.count)
        setUserLiked(data.likes.some((l: any) => l.userId === getUserId()))
      }
    })

    likeSocket.on('like:error', (error) => {
      console.error('Like error:', error)
    })

    return () => {
      likeSocket.off('like:updated')
      likeSocket.off('like:error')
    }
  }, [templateId])

  const handleLikeToggle = () => {
    if (!getUserId()) return
    likeSocket.emit('like:toggle', { templateId })
  }

  const handleOpenLikesList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Box>
      <Box className="flex justify-between items-center mb-[20px] p-4 rounded-md shadow bg-white border border-gray-200 dark:bg-[#1e1e1e] dark:border-gray-700">
        <Typography variant="h6" className="text-gray-800 dark:text-gray-100">
          {t('template')}
        </Typography>

        {isReadMode && (
          <Box className="flex items-center gap-3">
            <Tooltip title={userLiked ? buttons('unLike') : buttons('like')}>
              <IconButton
                onClick={handleLikeToggle}
                disabled={!getUserId()}
                color={userLiked ? 'primary' : 'default'}
              >
                {userLiked ? (
                  <ThumbUpAltIcon className="text-2xl" />
                ) : (
                  <ThumbUpOffAltIcon className="text-2xl" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t('viewNote')}>
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
                  },
                }}
              />
            </Tooltip>
          </Box>
        )}
      </Box>

      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? theme.palette.background.paper
              : theme.palette.common.white,
        }}
      >
        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
          <Box className="flex items-center gap-2">
            <TbListDetails className="text-2xl text-gray-700 dark:text-gray-300" />
            <Typography
              variant="h6"
              className="text-gray-800 dark:text-gray-100"
            >
              {t('details')}
            </Typography>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box className="flex flex-col gap-4">
            <FileUpload
              isReadMode={!!isReadMode}
              file={file}
              setFile={setFile}
            />

            <Box className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ControlledTextField
                disabled={!!isReadMode}
                control={control}
                name="title"
                label={table('title')}
              />
              <ControlledTextField
                disabled={!!isReadMode}
                control={control}
                name="topic"
                label={table('topic')}
              />
              <CustomSelect
                disabled={!!isReadMode}
                control={control}
                name="type"
                label={table('type')}
                options={templateTypeOptions}
              />
            </Box>

            {templateType === TEMPLATE_TYPE.PRIVATE && (
              <MultiSelect
                name="TemplateAccess"
                control={control}
                data={allUsers}
                isLoading={isFetching}
                label={t('users')}
                placeholder={t('selectUsers')}
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
                label={t('tags')}
                placeholder={t('selectTags')}
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
              label={t('description')}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default memo(Details)
