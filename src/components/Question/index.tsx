import { useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { QuestionForm, TemplateForm } from '../../types/form'
import ControlledTextField from '../TextField'
import CustomSelect from '../Select'
import { questionTypeOptions } from '../../constants'
import CustomSwitch from '../CustomSwitch'
import { QUESTION_TYPE } from '../../types'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { FaTrash } from 'react-icons/fa6'
import { useTranslator } from '../../hooks/useTranslator'
import { useSortable } from '@dnd-kit/sortable'
import { RxDragHandleDots2 } from 'react-icons/rx'
import { getDndStyle } from './helpers'

interface QuestionProps {
  question: QuestionForm
  index: number
  removeQuestion: () => void
  isReadMode: boolean
}

const Question = ({ index, removeQuestion, isReadMode, question }: QuestionProps) => {
  const { control, getValues } = useFormContext<TemplateForm>()
  const { t } = useTranslator('question')
  const { t: buttons } = useTranslator('buttons')
  const { t: table } = useTranslator('table')

  const questionType = useWatch({ control, name: `Question.${index}.type` })
  const { fields, remove, insert } = useFieldArray({ name: `Question.${index}.Options`, control })
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id! })

  const handleDeleteOption = (inx: number) => remove(inx)

  const handleAddOption = () => {
    const { Question } = getValues()
    insert(fields.length, {
      questionId: Question[index].id!,
      title: '',
      isSelected: false,
    })
  }

  return (
    <Box
      ref={setNodeRef}
      className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700"
      style={getDndStyle(transform, transition)}
    >
      <Box className="mb-4 flex items-center justify-between">
        <Box className="flex items-center gap-3">
          <Tooltip placement="top" title={buttons('dragAndDrop')}>
            <IconButton {...attributes} {...listeners}>
              <RxDragHandleDots2 className="text-[25px] text-gray-500 dark:text-gray-300" />
            </IconButton>
          </Tooltip>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {t('question')} {index + 1}
          </h3>
        </Box>

        <IconButton disabled={isReadMode} onClick={removeQuestion}>
          <FaTrash className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors" />
        </IconButton>
      </Box>

      <Box className="flex flex-col gap-5">
        <ControlledTextField
          disabled={isReadMode}
          label={table('title')}
          name={`Question.${index}.title`}
          control={control}
        />
        <ControlledTextField
          disabled={isReadMode}
          label={table('description')}
          name={`Question.${index}.description`}
          control={control}
        />
      </Box>

      <Box className="mt-4 flex items-center gap-5">
        <CustomSelect
          disabled={isReadMode}
          label={t('type')}
          options={questionTypeOptions}
          name={`Question.${index}.type`}
          control={control}
        />
        <CustomSwitch
          disabled={isReadMode}
          label={t('publish')}
          control={control}
          name={`Question.${index}.isPublished`}
        />
      </Box>

      {questionType === QUESTION_TYPE.MULTICHOICE && (
        <Box className="mt-4 flex flex-col gap-2">
          {fields.map((el, inx) => (
            <Box
              key={el.id}
              className="flex items-center gap-3 rounded-md bg-gray-50 dark:bg-gray-800 p-2"
            >
              <ControlledTextField
                disabled={isReadMode}
                size="small"
                name={`Question.${index}.Options.${inx}.title`}
                control={control}
              />
              <IconButton disabled={isReadMode} onClick={() => handleDeleteOption(inx)}>
                <FaTrash className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors" />
              </IconButton>
            </Box>
          ))}

          <Button
            disabled={isReadMode}
            variant="outlined"
            onClick={handleAddOption}
            className="mt-2 w-fit normal-case text-gray-700 dark:text-gray-200 dark:border-gray-500"
          >
            {buttons('addOption')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Question
