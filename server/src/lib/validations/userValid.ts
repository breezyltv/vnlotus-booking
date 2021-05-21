import * as yup from "yup";
const first_name = yup
  .string()
  .trim()
  .required("First Name is required.")
  .min(2, "First name must be at least 2 characters!");

const last_name = yup
  .string()
  .trim()
  .required("Last Name is required.")
  .min(2, "Last name must be at least 2 characters!");

const address = yup.string().nullable().default("");
const bio = yup.string().nullable().default("");
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const phone = yup.string().matches(phoneRegExp, "Phone number is not valid");
const birthday = yup.date().nullable().notRequired().min(new Date(1940, 0, 1));
const gender = yup
  .mixed()
  // Note `as const`: this types the array as `["male", "female", "other"]`
  // instead of `string[]`.
  .oneOf(["male", "female", "other"]);
//.defined();
export const UserUpdateRules = yup.object().shape({
  first_name,
  last_name,
  phone,
  birthday,
  gender,
  address,
  bio,
});
