import { Action, Reducer, ReducersMapObject, Store, ThunkAction, UnknownAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';

import sharedReducers from 'app/shared/reducers';
import errorMiddleware from './error-middleware';
import notificationMiddleware from './notification-middleware';
import loggerMiddleware from './logger-middleware';

const store = configureStore({
  reducer: sharedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'meta.baseQueryMeta', 'payload.config', 'payload.request', 'payload.headers', 'error'],
      },
    }).concat(errorMiddleware, notificationMiddleware, loadingBarMiddleware(), loggerMiddleware),
});

// Allow lazy loading of reducers https://github.com/reduxjs/redux/blob/master/docs/usage/CodeSplitting.md
interface InjectableStore<S = any, A extends Action = UnknownAction> extends Store<S, A> {
  asyncReducers: ReducersMapObject;
  injectReducer(key: string, reducer: Reducer): void;
}

interface AsyncReducersMapObject {
  [key: string]: Reducer<any, any>;
}

interface InjectableStoreWithMethods<S = any, A extends Action = UnknownAction> extends InjectableStore<S, A> {
  asyncReducers: AsyncReducersMapObject;
  injectReducer: (key: string, reducer: Reducer<any, any>) => void;
}

export function configureInjectableStore<S = any, A extends Action = UnknownAction>(
  storeToInject: Store<S, A>,
): InjectableStoreWithMethods<S, A> {
  const injectableStore = storeToInject as InjectableStoreWithMethods<S, A>;
  injectableStore.asyncReducers = {};

  injectableStore.injectReducer = (key: string, asyncReducer: Reducer<any, any>) => {
    injectableStore.asyncReducers[key] = asyncReducer;
    injectableStore.replaceReducer(
      combineReducers({
        ...sharedReducers,
        ...injectableStore.asyncReducers,
      }) as Reducer<S, A>,
    );
  };

  return injectableStore;
}

const injectableStore = configureInjectableStore(store);

const getStore = () => injectableStore;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, UnknownAction>;

export default getStore;
