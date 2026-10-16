import React, { useState, useMemo, useCallback } from "react";

const GENERATED_PRODUCTS = Array.from({ length: 500}, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    category: index % 2 === 0 ? 'Tech' : 'Home',
    price: (index + 1) * 2
}));

const ProductList = React.memo(({ products, onSelect }) => {
    console.log('ProductList rendered');
    return (
        <ul>
            {products.slice(0, 10).map(p => (
                <li key={p.id} onClick={() => onSelect(p.id)}>
                    {p.name} - ${p.price} ({p.category})
                </li>
            ))}
        </ul>
    );
});

export default function ProductExplorer() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedId, setSelectedId] = useState(null);
    const [unrelatedCounter, setUnrelatedCounter] = useState(0);

    const filteredProducts = useMemo(() => {
        return GENERATED_PRODUCTS
        .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search)
        .filter(p => (category === 'All' ? true : p.category === category))
        .sort((a,b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
    }, [search, category, sortOrder]);

    const handleSelect = useCallback((id) => {
        setSelectedId(id);
    }, []);

    return (
        <div style={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px' }}>
            <h2>Exam 5: Product Explorer Performance Repair</h2>
            <button onClick={() => setUnrelatedCounter(c => c + 1)}>
            Unrelated Counter: {unrelatedCounter}
            </button>
        <br /><br />
            <input
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <select onChange={e => setCategory(e.target.value)}>
                <option value="All">All</option>
                <option value="Tech">Tech</option>
                <option value="Home">Home</option>
            </select>
            <select onChange={e => setSortOrder(e.target.value)}>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        
            <p>Selected ID: {selectedId}</p>
            <ProductList products={filteredProducts} onSelect={handleSelect} />
        </div>
    );
}