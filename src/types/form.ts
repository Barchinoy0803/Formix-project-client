import { z } from "zod";
import { QUESTION_TYPE } from ".";
import i18next from "i18next";

export const RegisterSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: i18next.t('validation.emailError') }),
    password: z.string().min(8, { message: i18next.t('validation.passwordError') }).refine((value) => (
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9]/.test(value)
    ), { message: i18next.t('validation.passwordReqError') }),
})

export interface OtpForm {
    otp: string;
}

export const LoginSchema = z.object({
    email: z.string().email({ message: i18next.t('validation.emailError') }),
    password: z.string()
})

export type RegisterForm = z.infer<typeof RegisterSchema>;
export type LoginForm = z.infer<typeof LoginSchema>

export interface TemplateForm {
    id: string;
    title: string;
    topic: string;
    description: string;
    image?: string;
    type: string;
    Question: QuestionForm[];
    TemplateAccess?: AllowedUsers[]
}

export interface AllowedUsers {
    username: string;
    id: string;
    value?: string
}

export interface QuestionForm {
    id?: string
    sequence: number,
    title: string,
    description: string,
    type: QUESTION_TYPE,
    isPublished: boolean,
    templateId: string,
    Options: OptionForm[]
}

export interface OptionForm {
    questionId: string;
    title: string;
    id?: string;
    isSelected: boolean;
}

export interface AnswerForm {
    sequence: number;
    answer: string;
    questionId: string;
    formId: string;
    selectedOptionOnAnswer: SelectedOptionOnAnswer[]
}

export interface Form {
    templateId: string;
    Answer: AnswerForm[];
    Question?: QuestionForm[]
}

export interface SelectedOptionOnAnswer {
    answerId: string;
    optionId: string;
    isSelected: boolean;
    option: OptionForm[]
}

export interface QuestionAnalyzesForm {
    question: string | number;
}

export interface TagForm {
    name: string;
}

export interface CreateDeleteForm {
    id?: string;
    name: string;
}