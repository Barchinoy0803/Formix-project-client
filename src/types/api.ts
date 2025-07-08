import { User } from "."

export interface Login {
    Request: User;
    Response: { token: string, role: string };
}

export interface Register {
    Request: User;
    Response: User;
}

export interface RouteHandle {
  showSearch?: boolean
}
