import * as yup from "yup";
const email = yup
  .string()
  .trim()
  .required("Email is required!")
  .email("Email must be a valid email");

const password = yup.string().required("Password is required!");

export const SignInViaEmailRules = yup.object().shape({
  email,
  password,
});
