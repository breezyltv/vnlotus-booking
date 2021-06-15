import { LoginProvider, User, Viewer } from "../../../lib/types";
export interface ISignInArgs {
  input: { code: string } | null;
}
export interface IRegisterArgs {
  user: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    confirm_password: string;
    login_type: LoginProvider;
  };
}
export interface ISignInViaEmailArgs {
  email: string;
  password: string;
}
