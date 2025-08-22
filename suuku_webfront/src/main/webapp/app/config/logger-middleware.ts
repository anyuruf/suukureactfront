/* eslint no-console: off */
interface Action {
  type: string;
  payload?: unknown;
  meta?: unknown;
  error?: unknown;
}

type MiddlewareAPI = (action: Action) => unknown;
type Next = (action: Action) => unknown;

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const loggerMiddleware = (): ((next: Next) => (action: Action) => unknown) => (next: Next) => (action: Action) => {
  if (DEVELOPMENT) {
    const { type, payload, meta, error } = action;

    console.groupCollapsed(type);
    console.log('Payload:', payload);
    if (error) {
      console.log('Error:', error);
    }
    console.log('Meta:', meta);
    console.groupEnd();
  }

  return next(action);
};

export default loggerMiddleware;
