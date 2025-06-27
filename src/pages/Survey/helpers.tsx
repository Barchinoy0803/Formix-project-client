import { Control, FieldValues, Path } from "react-hook-form";
import ControlledTextField from "../../components/TextField";
import { QUESTION_TYPE } from "../../types";
import { OptionForm, QuestionForm } from "../../types/form";
import RadioWithLabel from "../../components/CustomRadioButton";
import { YES_NO_OPTIONS } from "../../constants";
import CheckboxGroup from "../../components/CheckboxGroup";

interface renderQuestionProps<T extends FieldValues> {
    control: Control<T>,
    index: number,
    question: QuestionForm,
    isReadMode?: boolean,
}

export const renderQuestion = <T extends FieldValues>({ question, control, index, isReadMode=false }: renderQuestionProps<T>) => {
    switch (question.type) {
        case QUESTION_TYPE.OPEN:
            return <ControlledTextField disabled={isReadMode} control={control} name={`Answer.${index}.answer` as Path<T>} />
        case QUESTION_TYPE.CLOSE:
            return <RadioWithLabel   disabled={isReadMode} control={control} name={`Answer.${index}.answer` as Path<T>} options={YES_NO_OPTIONS} defaultValue={YES_NO_OPTIONS[0].value} />
        case QUESTION_TYPE.NUMERICAL:
            return <ControlledTextField disabled={isReadMode} type='number' control={control} name={`Answer.${index}.answer` as Path<T>} />
        case QUESTION_TYPE.MULTICHOICE:
            return <CheckboxGroup disabled={isReadMode} control={control} name={`Answer.${index}.selectedOptionOnAnswer` as Path<T>} options={getCheckboxOptions(question.Options)} />
        default:
            return null;
    }
}

export const getCheckboxOptions = (options: OptionForm[]) => {
    return options.map((option: OptionForm) => ({
        label: option.title,
        value: option.id!
    }))
}
