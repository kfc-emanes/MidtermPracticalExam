import { useState } from "react";

export default function TaskCounter() {
    const [count, setCount] = useState(0);
    const target = 5;

    const getStatus = () => {
        if (count === 0) return 'Not started';
        if (count >= target) return 'Target Reached';
        return 'In Progress';
    };

    const handleIncrement = () => {
        if (count < target) {
            setCount(count + 1);
        };
    }

    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        };
    }

    const handlePlusTwo = () => {
        if (count < target) {
            setCount(prev + 1 <= target ? prev + 1 : target);
            setCount(prev + 1 <= target ? prev + 1 : target);
        }
    };

    const handleReset = () => setCount(0);

    const isATarget = count >= target;

    return (
        <div style = {{ border: '1px solid black', padding: '16px', marginBottom: '16px' }}>
            <h2>Exam 1: Smart Task Counter</h2>
            <p>Count: {count} | Target: {target}</p>
            <p>Status: <strong>{getStatus()}</strong></p>
            <button onClick={handleIncrement} disabled={isATarget}>+1</button>
            <button onClick={handleDecrement} disabled={count === 0}>-1</button>
            <button onClick={handlePlusTwo} disabled={isATarget}>+2</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}
        