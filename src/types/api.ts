import { User } from "."

export interface Login {
    Request: User;
    Response: { token: string };
}

export interface Register {
    Request: User;
    Response: User;
}
