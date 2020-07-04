import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default (errors: ValidationError): Errors => {
  const validationErrors: Errors = {};
  errors.inner.forEach((error: ValidationError) => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
};
