import { z } from "zod";

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