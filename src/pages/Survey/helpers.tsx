import { Control, FieldValues } from "react-hook-form";
import ControlledTextField from "../../components/TextField";
import { QUESTION_TYPE } from "../../types";
import { QuestionForm } from "../../types/form";

interface renderQuestionProps<T extends FieldValues> {
    control: Control<T>,
    index: number,
    question: QuestionForm

}

export const renderQuestion = <T extends FieldValues>({ question, control, index }: renderQuestionProps<T>) => {
    switch (question.type) {
        case QUESTION_TYPE.OPEN:
            return <ControlledTextField control={control} name={`questions.${index}`} />
    }
}