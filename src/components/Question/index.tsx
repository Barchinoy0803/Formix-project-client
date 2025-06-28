import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { QuestionForm, TemplateForm } from "../../types/form"
import ControlledTextField from "../TextField"
import CustomSelect from "../Select"
import { questionTypeOptions } from "../../constants"
import CustomSwitch from "../CustomSwitch"
import { QUESTION_TYPE } from "../../types"
import { Button, IconButton, Tooltip } from "@mui/material"
import { FaTrash } from "react-icons/fa6";
import { useTranslator } from "../../hooks/useTranslator"
import { useSortable } from "@dnd-kit/sortable"
import { RxDragHandleDots2 } from "react-icons/rx";
import { getDndStyle } from "./helpers"

interface QuestionProps {
    question: QuestionForm,
    index: number,
    removeQuestion: () => void;
    isReadMode: boolean;
}

const Question = ({ index, removeQuestion, isReadMode, question }: QuestionProps) => {
    const { control, getValues } = useFormContext<TemplateForm>()
    const { t } = useTranslator('question');
    const { t: buttons } = useTranslator('buttons');
    const questionType = useWatch({ control, name: `Question.${index}.type` })

    const { fields, remove, insert } = useFieldArray({ name: `Question.${index}.Options`, control })
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: question.id! })

    const handleDeleteOption = (inx: number) => {
        remove(inx)
    }

    const handleAddOption = () => {
        const { Question } = getValues()
        insert(fields.length, { questionId: Question[index].id!, title: "", isSelected: false })
    }
    
    return (
        <div ref={setNodeRef} className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200" style={getDndStyle(transform, transition)}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <Tooltip placement="top" title='Drag and drop'>
                        <IconButton {...attributes} {...listeners}>
                            <RxDragHandleDots2 className="text-[25px]" />
                        </IconButton>
                    </Tooltip>
                    <h3 className="text-lg font-semibold">{t('question')} {index + 1}</h3>
                </div>
                <IconButton disabled={isReadMode} onClick={removeQuestion}>
                    <FaTrash className="text-gray-400 hover:text-red-600 transition-colors" />
                </IconButton>
            </div>

            <div className="flex flex-col gap-5">
                <ControlledTextField disabled={isReadMode} label="Title" name={`Question.${index}.title`} control={control} />
                <ControlledTextField disabled={isReadMode} label="Description" name={`Question.${index}.description`} control={control} />
            </div>

            <div className="flex gap-5 items-center mt-4">
                <CustomSelect disabled={isReadMode} label="Question type" options={questionTypeOptions} name={`Question.${index}.type`} control={control} />
                <CustomSwitch disabled={isReadMode} label="Publish" control={control} name={`Question.${index}.isPublished`} />
            </div>

            {questionType === QUESTION_TYPE.MULTICHOICE && (
                <div className="flex flex-col gap-2 mt-4">
                    {fields?.map((el, inx) => (
                        <div key={el.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-md">
                            <ControlledTextField disabled={!!isReadMode} size="small" name={`Question.${index}.Options.${inx}.title`} control={control} />
                            <IconButton disabled={isReadMode} onClick={() => handleDeleteOption(inx)}>
                                <FaTrash className="text-gray-400 hover:text-red-600 transition-colors" />
                            </IconButton>
                        </div>
                    ))}
                    <Button
                        disabled={isReadMode}
                        variant="outlined"
                        onClick={handleAddOption}
                        className="w-fit mt-2 normal-case"
                    >
                        {buttons('addOption')}
                    </Button>
                </div>
            )}
        </div>

    )
}

export default Question