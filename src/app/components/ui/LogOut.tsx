import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useAuthStore } from '@/app/store/AuthRepository';
import { ExitIcon } from '@radix-ui/react-icons';

interface LogOutProps {
    cookieKey: string;
}

const LogOut: React.FC<LogOutProps> = ({ cookieKey }) => {
    const { user, logout } = useAuthStore();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        if(user) {
            Cookies.remove(cookieKey);
            router.push('/');
        }
    };

    return (
        <div className="flex gap-1 items-center pl-1">
            <button  onClick={handleLogout}>Déconnexion </button>
            <ExitIcon />
        </div>
    );
};

export default LogOut;