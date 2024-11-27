import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useAuthStore } from '@/app/store/AuthRepository';
import { ExitIcon } from '@radix-ui/react-icons';

interface LogOutProps {
    cookieKey: string;
}

const LogOut: React.FC<LogOutProps> = ({ cookieKey }) => {
    const { user, removeUserSession } = useAuthStore();
    const router = useRouter();
    const handleLogout = () => {
        removeUserSession();
        if(user) {
            Cookies.remove(cookieKey);
            router.push('/');
        }
    };

    return (
        <div className="flex gap-1 items-center pl-1 w-full cursor-pointer" onClick={handleLogout} >
             <ExitIcon />
            <button>Déconnexion</button>   
        </div>
    );
};

export default LogOut;