import { Storage, TranslatorContext } from 'react-jhipster';

import { setLocale } from 'app/shared/reducers/locale';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
};

export const locales = Object.keys(languages).sort();

interface LocaleStore {
  dispatch: (action: unknown) => void;
}

export const registerLocale = (store: LocaleStore): void => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
