import { createContext, useContext, useState } from "react";

const ApplicationPreferencesContext = createContext(null);

export function ApplicationPreferencesProvider({ children }) {
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState(16);

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    
    return (
        <ApplicationPreferencesContext.Provider value={{ theme, fontSize, toggleTheme, setFontSize }}>
            {children}
        </ApplicationPreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(ApplicationPreferencesContext);
    if (!context) {
        throw new Error('usePreferences must be used within an ApplicationPreferencesProvider');
    }
    return context;
}
