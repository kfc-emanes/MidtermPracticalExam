import { useState, useEffect } from "react";

const USERS = [
  { id: 1, name: 'Ana Cruz', role: 'Developer' },
  { id: 2, name: 'Ben Lim', role: 'Designer' },
  { id: 3, name: 'Cara Yu', role: 'Tester' },
  { id: 4, name: 'Dan Go', role: 'Developer' }
];

export default function LiveSearchAndTimer() {
    const [query, setQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(USERS);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const handler = setTimeout(() => {
            setFilteredUsers(USERS.filter(user => user.name.toLowerCase().includes(query.toLowerCase())));
        }, 300);

    return () => clearTimeout(handler);
    }, [query]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        document.title = `Results: ${filteredUsers.length}`;
    }, [filteredUsers.length]);

    return (
        <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
            <h2>Exam 2: Live Search and Timer</h2>
            <p>Seconds elapsed: {seconds}</p>
            <input
                type="text"
                placeholder="Search users..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>{user.name} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
}