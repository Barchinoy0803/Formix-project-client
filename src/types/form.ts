import { z } from "zod";
import { QUESTION_TYPE } from ".";

export const RegisterSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: "Email should be as email (e.g. user@gmail.com)" }),
    password: z.string().min(8, { message: "Password should be at least 8 characters" }).refine((value) => (
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[^A-Za-z0-9]/.test(value)
    ), { message: "Password should include at least one uppercase letter, one lowercase letter, one number, one special character (e.g. !@#$%^&*())" }),
})

export interface OtpForm {
    otp: string;
}

export const LoginSchema = z.object({
    email: z.string().email({ message: "Email should be as email (e.g. user@gmail.com)" }),
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
    Question: QuestionForm[]
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
    questionId: string,
    title: string,
    isSelected: boolean,
    id?: string,
}

export interface AnswerForm {
    sequence: number;
    answer: string;
    questionId: string;
    formId: string;
}

export interface Form {
    templateId: string;
    Answer: AnswerForm[];
    Question?: QuestionForm[]
}
