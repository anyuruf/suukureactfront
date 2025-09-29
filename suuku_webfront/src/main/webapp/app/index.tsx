import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import getStore from 'app/config/store';
import { registerLocale } from 'app/config/translation';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppComponent from 'app/app';
import { loadIcons } from 'app/config/icon-loader';
import { authConfig } from './config/oauth2-config';
import { AuthProvider } from 'react-oauth2-code-pkce';

const store = getStore();
registerLocale(store);

loadIcons();

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

const render = Component =>
  root.render(
    <ErrorBoundary>
      <AuthProvider authConfig={authConfig}>
        <Provider store={store}>
          <div>
            <Component />
          </div>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>,
  );

render(AppComponent);
