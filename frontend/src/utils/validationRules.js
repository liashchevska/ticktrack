import { string } from "yup";

const passwordRule = string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')

const emailRule = string()
  .required('Email is required')
  .email('Please, enter a valid email')

const codeRule = string()
  .required('Recovery code is required')

const nameRule = string()
  .required('Name is required')
  .max(50, "Name cannot exceed 50 characters")

const titleRule = string()
  .required('Title is required')
  .min(5, 'Title must be at least 5 characters')
  .max(100, "Title cannot exceed 100 characters")

const ticketDescriptionRule = string()
  .max(300, "Ticket description cannot exceed 300 characters")
  .nullable()

const ticketStatusRule = string()

export {
  passwordRule,
  emailRule,
  codeRule,
  nameRule,
  titleRule,
  ticketDescriptionRule,
  ticketStatusRule
}
