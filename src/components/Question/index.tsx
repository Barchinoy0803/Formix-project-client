import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { QuestionForm, TemplateForm } from "../../types/form"
import ControlledTextField from "../TextField"
import CustomSelect from "../Select"
import { questionTypeOptions } from "../../constants"
import CustomSwitch from "../CustomSwitch"
import { QUESTION_TYPE } from "../../types"
import { Button, IconButton } from "@mui/material"
import { FaTrash } from "react-icons/fa6";
import { useTranslator } from "../../hooks/useTranslator"

interface QuestionProps {
    question: QuestionForm,
    index: number,
    removeQuestion: () => void
}

const Question = ({ index, removeQuestion }: QuestionProps) => {
    const { control, getValues } = useFormContext<TemplateForm>()
    const { t } = useTranslator('question');
    const { t: buttons } = useTranslator('buttons');
    const questionType = useWatch({ control, name: `Question.${index}.type` })

    const { fields, remove, insert } = useFieldArray({ name: `Question.${index}.Options`, control })

    const handleDeleteOption = (inx: number) => {
        remove(inx)
    }

    const handleAddOption = () => {
        const { Question } = getValues()
        insert(fields.length, { questionId: Question[index].id!, title: "", isSelected: false })
    }

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t('question')} {index + 1}</h3>
                <IconButton onClick={removeQuestion}>
                    <FaTrash className="text-gray-400 hover:text-red-600 transition-colors" />
                </IconButton>
            </div>

            <div className="flex flex-col gap-5">
                <ControlledTextField label="Title" name={`Question.${index}.title`} control={control} />
                <ControlledTextField label="Description" name={`Question.${index}.description`} control={control} />
            </div>

            <div className="flex gap-5 items-center mt-4">
                <CustomSelect label="Question type" options={questionTypeOptions} name={`Question.${index}.type`} control={control} />
                <CustomSwitch label="Publish" control={control} name={`Question.${index}.isPublished`} />
            </div>

            {questionType === QUESTION_TYPE.MULTICHOICE && (
                <div className="flex flex-col gap-2 mt-4">
                    {fields?.map((el, inx) => (
                        <div key={el.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-md">
                            <ControlledTextField size="small" name={`Question.${index}.Options.${inx}.title`} control={control} />
                            <IconButton onClick={() => handleDeleteOption(inx)}>
                                <FaTrash className="text-gray-400 hover:text-red-600 transition-colors" />
                            </IconButton>
                        </div>
                    ))}
                    <Button
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