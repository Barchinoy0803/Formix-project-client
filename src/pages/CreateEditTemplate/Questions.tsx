import { memo } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Button } from '@mui/material';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Question from '../../components/Question';
import { TiPlus } from "react-icons/ti";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TemplateForm } from '../../types/form';
import { QUESTION_TYPE } from "../../types"
import { DragEndEvent } from "@dnd-kit/core"
import { useTranslator } from '../../hooks/useTranslator';
import { TbMessageCircleQuestion } from "react-icons/tb";

interface QuestionsProps {
    isReadMode: boolean
}

const Questions = ({ isReadMode }: QuestionsProps) => {
    const { control, getValues } = useFormContext<TemplateForm>()
    const { fields, remove, insert, move } = useFieldArray({ control, name: "Question" })
    const { t: template } = useTranslator('template')


    const handleRemoveQuestion = (index: number) => {
        remove(index)
    }

    const handleAddQuestion = () => {
        const { id } = getValues()
        insert(fields.length, { templateId: id, sequence: fields.length, description: "", type: QUESTION_TYPE.OPEN, Options: [], title: "", isPublished: false })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        if (active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id)
            const newIndex = fields.findIndex((item) => item.id === over.id)
            move(oldIndex, newIndex)
        }
    }

    return (
        <div>
            <Accordion >
                <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Box className='flex gap-2 items-center'>
                        <TbMessageCircleQuestion className='text-2xl'/>
                        <Typography variant='h6' component="span">Questions</Typography>
                    </Box>
                </AccordionSummary>
                <AccordionDetails className='flex  flex-col gap-4'>
                    <Box className="flex justify-between items-center">
                        <Button disabled={!!isReadMode} onClick={handleAddQuestion} variant="outlined" startIcon={<TiPlus />}>{template('addQuestion')}</Button>
                    </Box>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                            {
                                fields?.map((el: any, inx: any) => (
                                    <Question isReadMode={!!isReadMode} removeQuestion={() => handleRemoveQuestion(inx)} key={el.id} question={el} index={inx} />
                                ))
                            }
                        </SortableContext>
                    </DndContext>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default memo(Questions)