import { useState, useRef } from 'react';

export default function FormToolKit() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');

    const [clickCount, setClickCount] = useState(0);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const validate = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.email.includes('@')) errors.email = 'A valid email is required';
        if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters long';
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClickCount(prev => prev + 1);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        if (validationErrors.name) nameRef.current.focus();
        else if (validationErrors.email) emailRef.current.focus();
        else if (validationErrors.password) passwordRef.current.focus();
    } else {
        setLastSubmittedEmail(formData.email);
        alert('Form submitted successfully!');
    }
};

return (
        <div style={{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
            <h2>Exam 3: Accessible Form Toolkit</h2>
            <p>Click Count: {clickCount}</p>
            <p>Submit Clicks: {clickCount}</p>
            {lastSubmittedEmail && <p>Last Submitted Email: {lastSubmittedEmail}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input 
                        type="text"
                        ref={nameRef}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        ref={emailRef}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        ref={passwordRef}
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}