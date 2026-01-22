import { createContext, useContext, useState, useEffect } from "react";
import { dictionaries } from "../i18n/dictionaries";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("language") || "vi";
        }
        return "vi";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const t = (key) => {
        const keys = key.split(".");
        let value = dictionaries[language];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
