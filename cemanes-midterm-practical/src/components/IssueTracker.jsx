import { useState } from "react";
import { usePersistentReducer } from '../hooks/usePersistentReducer';

const initialState = {
    issues: [],
    Filter: 'all',
    nextId: 1
};

export function issueReducer(state, action) {
    const current = state || initialState;

    switch (action.type) {
        case 'ADD_ISSUE':
            return {
                ...current,
                issues: [...current.issues, { id: current.nextId, title: action.payload.title, status: 'open' }],
                nextId: current.nextId + 1
            };

        case 'TOGGLE_ISSUE':
            return {
                ...current,
                issues: current.issues.map(issue =>
                    issue.id === action.payload.id
                        ? { ...issue, status: issue.status === 'open' ? 'done' : 'open' }
                        : issue
                )
            };

        case 'DELETE_ISSUE':
            return {
                ...current,
                issues: current.issues.filter(issue => issue.id !== action.payload.id)
            };

        case 'SET_FILTER':
            return { ...current, Filter: action.payload.filter };

        case 'CLEAR_DONE':
            return {
                ...current,
                issues: current.issues.filter(issue => issue.status !== 'done')
            };

        default:
            return current;
    }
}

export default function IssueTracker() {
    const [state, dispatch] = usePersistentReducer(issueReducer, initialState, 'issue_tracker_state');
    const [title, setTitle] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch({ type: 'ADD_ISSUE', payload: { title } });
        setTitle('');
    };

    const currentFilter = state?.Filter || 'all';
    const issuesList = state?.issues || [];

    const filteredIssues = issuesList.filter(issue => {
        if (currentFilter === 'open') return issue.status === 'open';
        if (currentFilter === 'done') return issue.status === 'done';
        return true;
    });

    const openCount = issuesList.filter(i => i.status === 'open').length;
    const doneCount = issuesList.filter(i => i.status === 'done').length;

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <h2>Exam 6: Issue Tracker State Engine</h2>
            
            <form onSubmit={handleAdd}>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Issue title..." />
                <button type="submit">Add Issue</button>
            </form>

            <div style={{ margin: '10px 0' }}>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'all' } })}>All ({issuesList.length})</button>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'open' } })}>Open ({openCount})</button>
                <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { filter: 'done' } })}>Done ({doneCount})</button>
                <button onClick={() => dispatch({ type: 'CLEAR_DONE' })}>Clear Done</button>
            </div>

            <ul>
                {filteredIssues.map(issue => (
                    <li key={issue.id}>
                        <span
                            onClick={() => dispatch({ type: 'TOGGLE_ISSUE', payload: { id: issue.id } })}
                            style={{ textDecoration: issue.status === 'done' ? 'line-through' : 'none', cursor: 'pointer', marginRight: '10px' }}
                        >
                            {issue.title} ({issue.status})
                        </span>
                        <button onClick={() => dispatch({ type: 'DELETE_ISSUE', payload: { id: issue.id } })}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}