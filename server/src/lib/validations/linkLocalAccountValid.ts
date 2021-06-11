import * as yup from "yup";
const email = yup
  .string()
  .trim()
  .required("Email is required!")
  .email("Email must be a valid email");
const password = yup
  .string()
  .required("Password is required!")
  .min(6, "Password must be at least 6 characters!");
const confirm_password = yup
  .string()
  .oneOf([yup.ref("password")], "Mismatched passwords")
  .required("Please confirm your password");

export const LinkLocalAccountRules = yup.object().shape({
  email,
  password,
  confirm_password,
});
