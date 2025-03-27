import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import LocizeBackend from "i18next-locize-backend";
import LastUsed from "locize-lastused";
import { locizePlugin } from "locize";

const isDev = import.meta.env.DEV;

const locizeOptions = {
	projectId: import.meta.env.VITE_LOCIZE_PROJECTID,
	apiKey: import.meta.env.VITE_LOCIZE_APIKEY, // YOU should not expose your API key in production!!!
	version: import.meta.env.VITE_LOCIZE_VERSION,
};

if (isDev) {
	i18n.use(LastUsed);
}

i18n
	.use(LocizeBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.use(locizePlugin)
	.init({
		debug: isDev,
		fallbackLng: "en",
		backend: locizeOptions,
		locizeLastUsed: locizeOptions,
		saveMissing: isDev,
		lng: localStorage.getItem("language") || undefined, // Sử dụng ngôn ngữ từ localStorage nếu có
		detection: {
			order: ["localStorage", "navigator"], // Ưu tiên localStorage trước
			caches: ["localStorage"], // Lưu lại ngôn ngữ vào localStorage
		},
	});

export default i18n;
