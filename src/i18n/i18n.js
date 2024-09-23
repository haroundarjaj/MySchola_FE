import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import tResources from './translationResources';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

tResources.forEach(resObj => {
  i18n.addResourceBundle(resObj.lng, resObj.name, resObj.res);

})

export default i18n;
