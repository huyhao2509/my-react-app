import { Compass, Film, Flame, Home, Heart } from 'lucide-react'; 
import React from 'react';

// Định nghĩa kiểu dữ liệu cho menuItems
interface MenuItem {
    icon: React.ComponentType<{ size: number }>;
    label: string;
}

export default function Sidebar() {
    const menuItems: MenuItem[] = [
        {icon: Home, label: 'Home'},
        {icon: Flame, label: 'Trending'},
        {icon: Compass, label: 'Explore'},
        {icon: Film, label: 'Movies'},
        {icon: Heart, label: 'Favourites'},
    ];

    return (
        <div className="w-16 h-screen bg-customDark flex flex-col items-center justify-center">
            <div className='flex flex-col items-center justify-center space-y-4'>
                {menuItems.map(({ icon: Icon, label }) => (
                    <div key={label} className='flex flex-col items-center justify-center space-y-1'>
                        <Icon size={24} />
                        <span className='text-white text-xs'>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
