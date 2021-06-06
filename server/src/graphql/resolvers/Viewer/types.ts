import { LoginProvider } from "../../../lib/types";
export interface SignInArgs {
  input: { code: string } | null;
}
export interface RegisterArgs {
  user: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
    login_type: LoginProvider;
  };
}
