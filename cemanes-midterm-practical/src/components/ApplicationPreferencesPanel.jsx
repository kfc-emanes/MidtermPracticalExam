import { ApplicationPreferencesProvider, usePreferences } from '../context/ApplicationPreferencesContext';

function ArticlePreview() {
    const { theme, fontSize } = usePreferences();
    return (
        <div style= {{
            background: theme === 'light' ? '#fff' : '#333',
            color: theme === 'light' ? '#000' : '#fff',
            fontSize: `${fontSize}px`,
            padding: '16px',
            marginBottom: '16px'
        }}>
            Article Review Content
        </div>
    );
}

function Toolbar() {
    const { theme, toggleTheme, setFontSize } = usePreferences();
    return (
        <div>
            <button onClick={toggleTheme}>Toggle Theme (Current: {theme})</button>
            <select onChange={(e) => setFontSize(Number(e.target.value))}>
                <option value={12}>14px</option>
                <option value={14}>16px</option>
                <option value={16}>18px</option>
            </select>
        </div>
    );
}

function Dashboard() {
  return (
    <div>
      <Toolbar />
      <ArticlePreview />
    </div>
  );
}

export default function ApplicationPreferencesPanel() {
    return (
        <ApplicationPreferencesProvider>
            <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
                <h2>Exam 4: Application Preferences Panel</h2>
                <Dashboard />
            </div>
        </ApplicationPreferencesProvider>
    );
}