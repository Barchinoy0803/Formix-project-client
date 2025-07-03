export enum TEMPLATE_TYPE {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

export enum MODAL_TYPE {
    CREATE = 'CREATE',
    DELETE = 'DELETE'
}

export interface User {
    username?: string,
    email: string,
    password: string,
    id?: string
}

export interface ErrorType {
    status: number;
    data: { message: string }
}


export interface SelectOption {
    label: string;
    value: string;
}

export enum QUESTION_TYPE {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
    MULTICHOICE = 'MULTICHOICE',
    NUMERICAL = 'NUMERICAL'
}

export interface Option {
    label: string;
    value: string | number;
}

export type OptionValue = string | number

export interface OutletContext {
    search: string
}

export interface CreateDeleteModal {
    isOpen: boolean;
    type?: MODAL_TYPE;
}

export interface CommentType {
    id: string;
    context: string;
    templateId?: string;
    user?: { username: string, id: string };
}