interface GetErrorMessageFieldError {
  field: string;
  objectName: string;
  message: string;
}

interface GetErrorMessageErrorData {
  message: string;
  fieldErrors?: GetErrorMessageFieldError[];
}

const getErrorMessage = (errorData: GetErrorMessageErrorData): string => {
  let { message } = errorData;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: GetErrorMessageFieldError) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
};

interface FieldError {
  field: string;
  objectName: string;
  message: string;
}

interface ErrorData {
  message: string;
  fieldErrors?: FieldError[];
}

interface ErrorResponse {
  data: ErrorData;
}

interface Action {
  type: string;
  error?: {
    message?: string;
    response?: ErrorResponse;
  };
  [key: string]: any;
}

type MiddlewareAPI = (action: Action) => any;
type Next = (action: Action) => any;

export default (): ((next: Next) => (action: Action) => any) => next => action => {
  /**
   *
   * The error middleware serves to log error messages from dispatch
   * It need not run in production
   */
  const DEVELOPMENT = process.env.NODE_ENV === 'development';

  if (DEVELOPMENT) {
    const { error } = action;
    if (error) {
      console.error(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
      if (error.response && error.response.data) {
        const message = getErrorMessage(error.response.data);
        console.error(`Actual cause: ${message}`);
      }
    }
  }
  // Dispatch initial action
  return next(action);
};
