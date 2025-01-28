// components/Sidebar.tsx
import React, { useEffect, useState } from 'react';

interface SidebarProps {
    onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories'); // Kategorileri çek
                const data: string[] = await res.json();
                setCategories(data);
            } catch (error) {
                console.error('Kategoriler alınamadı:', error);
            }
        };

        fetchCategories(); // Component mount olduğunda kategorileri çek
    }, []); 

    return (
        <div className="sidebar">
            <h2>Kategoriler</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category} className='kutucuk'>
                        <button onClick={() => onSelectCategory(category)}>
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
