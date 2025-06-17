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

export enum TEMPLATE_TYPE {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC'
}

export interface SelectOption {
    label: string
    value: string
}