import { string, ref } from "yup";

const passwordRule = string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')

const passwordConfirmationRule = passwordRule.oneOf([ref('password')], "Passwords do not match")

const emailRule = string()
  .required('Email is required')
  .email('Please, enter a valid email')

const codeRule = string()
  .required('Recovery code is required')

const titleRule = string()
  .required('Title is required')
  .min(2, 'Title must be at least 5 characters')
  .max(100, "Title cannot exceed 100 characters")

const ticketDescriptionRule = string()
  .max(300, "Ticket description cannot exceed 300 characters")
  .nullable()

const ticketStatusRule = string()

export {
  passwordRule,
  passwordConfirmationRule,
  emailRule,
  codeRule,
  titleRule,
  ticketDescriptionRule,
  ticketStatusRule
}
