// import i18n from "i18next";
// import {initReactI18next} from "react-i18next";
// import * as RNLocalize from "react-native-localize";
// import en from "./locales/en.json";
// import es from "./locales/es.json";
// import ua from "./locales/ua.json";
//
// const resources = {
//     en: {translation: en},
//     es: {translation: es},
//     ua: {translation: ua},
// };
//
// const languageDetector = {
//     type: "languageDetector" as const,
//     async: true,
//     detect: (callback: (lang: string) => void) => {
//         const locales = RNLocalize.getLocales();
//         callback(locales[0]?.languageCode || "en");
//     },
//     init: () => {
//     },
//     cacheUserLanguage: () => {
//     }
// };
//
// // eslint-disable-next-line import/no-named-as-default-member
// i18n
//     .use(languageDetector)
//     .use(initReactI18next)
//     .init({
//         resources,
//         fallbackLng: "en",
//         interpolation: {
//             escapeValue: false // RN already handles XSS
//         }
//     });
//
// export default i18n;