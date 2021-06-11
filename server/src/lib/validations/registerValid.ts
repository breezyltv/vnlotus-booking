import * as yup from "yup";
import { LoginProvider } from "../types";
const email = yup
  .string()
  .trim()
  .required("Email is required!")
  .email("Email must be a valid email");
const first_name = yup
  .string()
  .trim()
  .required("Fisrt name is required!")
  .min(2, "First name must be at least 2 characters!");

const last_name = yup
  .string()
  .trim()
  .required("Last name is required.")
  .min(2, "Last name must be at least 2 characters!");

const password = yup
  .string()
  .required("Password is required!")
  .min(6, "Password must be at least 6 characters!");
const confirm_password = yup
  .string()
  .oneOf([yup.ref("password")], "Mismatched passwords")
  .required("Please confirm your password");
const login_type = yup
  .mixed()
  .oneOf([LoginProvider.EMAIL, LoginProvider.GOOGLE]);
export const RegisterRules = yup.object().shape({
  email,
  first_name,
  last_name,
  password,
  confirm_password,
  login_type,
});
