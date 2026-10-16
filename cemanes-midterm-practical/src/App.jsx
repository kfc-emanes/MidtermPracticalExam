import TaskCounter from './components/TaskCounter';
import LiveSearchAndTimer from './components/LiveSearchAndTimer';
import FormToolkit from './components/FormToolKit';
import PreferencesApp from './components/PreferencesPanel';
import ProductExplorer from './components/ProductExplorer';
import IssueTracker from './components/IssueTracker';

export default function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React Practical Midterm Exam</h1>
      <TaskCounter />
      <LiveSearchAndTimer />
      <FormToolkit />
      <PreferencesApp />
      <ProductExplorer />
      <IssueTracker />
    </div>
  );
}