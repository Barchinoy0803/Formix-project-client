import { useFieldArray, UseFieldArrayRemove, useFormContext } from "react-hook-form"
import { QuestionForm, TemplateForm } from "../../types/form"
import ControlledTextField from "../TextField"
import CustomSelect from "../Select"
import { questionTypeOptions } from "../../constants"
import CustomSwitch from "../CustomSwitch"
import { QUESTION_TYPE } from "../../types"
import { IconButton } from "@mui/material"
import { FaTrash } from "react-icons/fa6";

interface QuestionProps {
    question: QuestionForm,
    index: number,
    removeQuestion: () => void
}

const Question = ({ question, index, removeQuestion }: QuestionProps) => {
    const { control } = useFormContext<TemplateForm>()

    const { fields, remove } = useFieldArray({ name: `Question.${index}.Options`, control })

    const handleDeleteOption = (inx: number) => {
        remove(inx)
    }

    return (
        <div>
            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <ControlledTextField label={`${index + 1}-question`} name={`Question.${index}.description`} control={control} />
                    <IconButton onClick={removeQuestion}><FaTrash className="text-[#d21922]" /></IconButton>
                </div>
                <div className="flex gap-5 items-center">
                    <CustomSelect label="Question type" options={questionTypeOptions} name={`Question.${index}.type`} control={control} />
                    <CustomSwitch label="Publish" control={control} name={`Question.${index}.isPublished`} />
                </div>
                {
                    question.type === QUESTION_TYPE.MULTICHOICE &&
                    <div className="flex flex-col gap-2">
                        {
                            fields?.map((el, inx) => (
                                <div key={el.id} className="flex gap-3">
                                    <ControlledTextField name={`Question.${index}.Options.${inx}.title`} control={control} />
                                    <IconButton onClick={() => handleDeleteOption(inx)}><FaTrash className="text-[#d21922]" /></IconButton>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Question