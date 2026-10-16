import { issueReducer } from './IssueTracker.jsx';

const initialState = {
  issues: [],
  filter: 'all',
  nextId: 1
};

// Test 1: ADD_ISSUE
console.log('Testing ADD_ISSUE...');
const addAction = { type: 'ADD_ISSUE', payload: { title: 'Fix login bug' } };
const stateAfterAdd = issueReducer(initialState, addAction);

console.assert(stateAfterAdd.issues.length === 1, 'Issue count should be 1');
console.assert(stateAfterAdd.issues[0].title === 'Fix login bug', 'Title should match payload');
console.assert(stateAfterAdd.issues[0].status === 'open', 'New issue status should be open');
console.assert(stateAfterAdd.nextId === initialState.nextId + 1, 'nextId should increment');

// Test 2: TOGGLE_ISSUE
console.log('Testing TOGGLE_ISSUE...');
const targetId = stateAfterAdd.issues[0].id;
const toggleAction = { type: 'TOGGLE_ISSUE', payload: { id: targetId } };
const stateAfterToggle = issueReducer(stateAfterAdd, toggleAction);

console.assert(stateAfterToggle.issues[0].status === 'done', 'Status should change to done');

// Test 3: CLEAR_DONE
console.log('Testing CLEAR_DONE...');
const clearAction = { type: 'CLEAR_DONE' };
const stateAfterClear = issueReducer(stateAfterToggle, clearAction);

console.assert(stateAfterClear.issues.length === 0, 'Completed issues should be cleared');

console.log('All Task 6 Reducer Tests Passed Successfully!');