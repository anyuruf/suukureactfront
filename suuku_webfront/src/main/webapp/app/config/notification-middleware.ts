import { translate } from 'react-jhipster';
import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from 'app/shared/reducers/reducer.utils';
import { AxiosResponse, isAxiosError } from 'axios';
import { FieldErrorVM, isProblemWithMessage } from 'app/shared/jhipster/problem-details';
import { getMessageFromHeaders } from 'app/shared/jhipster/headers';
import { Middleware, Dispatch } from 'redux';
import { AxiosError } from 'axios';
import { UnknownAction } from '@reduxjs/toolkit';

type ToastMessage = {
  message?: string;
  key?: string;
  data?: any;
};

const addErrorAlert = (message: ToastMessage) => {
  toast.error(message.key ? (translate(message.key, message.data) ?? message.message) : message.message);
};

function handleHttpError(response: AxiosResponse) {
  const { status, data, headers } = response;

  if (status === 0) return addErrorAlert({ message: 'Server not reachable', key: 'error.server.not.reachable' });
  if (status === 404) return addErrorAlert({ message: 'Not found', key: 'error.url.not.found' });

  const problem: ProblemDetails | null = isProblemWithMessage(data) ? data : null;

  if (problem?.fieldErrors) {
    getFieldErrorsToasts(problem.fieldErrors).forEach(m => addErrorAlert(m));
    return;
  }

  const { error: toastError, param } = getMessageFromHeaders(headers ?? {});
  if (toastError) {
    const entityName = translate(`global.menu.entities.${param}`);
    return addErrorAlert({ key: toastError, data: { entityName } });
  }

  if (problem?.message) return addErrorAlert({ message: problem.detail, key: problem.message });
  if (typeof data === 'string' && data) return addErrorAlert({ message: data });

  toast.error(data?.detail ?? data?.message ?? data?.error ?? data?.title ?? 'Unknown error!');
}

const getFieldErrorsToasts = (fieldErrors: FieldErrorVM[]): ToastMessage[] =>
  fieldErrors.map(fieldError => {
    if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
      fieldError.message = 'Size';
    }
    // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
    const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
    const fieldName = translate(`suukuWebfrontApp.${fieldError.objectName}.${convertedField}`);
    return { message: `Error on field "${fieldName}"`, key: `error.${fieldError.message}`, data: { fieldName } };
  });

interface NotificationAction extends UnknownAction {
  error?: AxiosError | Error;
  payload?: {
    headers?: Record<string, unknown>;
  };
}

interface ProblemDetails {
  fieldErrors?: FieldErrorVM[];
  message?: string;
  detail?: string;
}

const notificationMiddleware: Middleware<unknown, unknown, Dispatch<UnknownAction>> =
  () => (next: Dispatch<UnknownAction>) => (action: NotificationAction) => {
    const { error, payload } = action;

    // ✅ Success branch for notification middleware
    if (isFulfilledAction(action) && payload?.headers) {
      const { alert, param } = getMessageFromHeaders(payload.headers);
      if (alert) {
        toast.success(translate(alert, { param }));
      }
    }

    // ✅ Error branch for middleware
    if (isRejectedAction(action) && isAxiosError(error)) {
      const { response, config, message } = error;

      if (!response) {
        if (config?.url?.endsWith('api/account') && config.method === 'get') {
          console.error('Authentication Error: Trying to access url api/account with GET.');
        } else {
          addErrorAlert({ message: message ?? 'Unknown error!' });
        }
        return next(action);
      }

      if (response.status === 401) return next(action); // ignore, login redirect
      if (config?.url?.endsWith('api/authenticate')) return next(action);

      handleHttpError(response);
      return next(action);
    }

    // ✅ Generic fallback
    if (error) addErrorAlert({ message: error.message ?? 'Unknown error!' });

    return next(action);
  };

export default notificationMiddleware;
