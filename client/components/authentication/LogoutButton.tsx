'use client';
import { useContext } from 'react';
import AuthContext from "../../contexts/authContext";
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();
    //remoove token from context and redirect

    const auth = useContext(AuthContext);
    const handleLogout = () => {
        auth?.logoutHandler();
        router.push('/');
    }
    return (
        <Button onClick={handleLogout} className="uppercase cursor-pointer">Изход </Button>
    )

}
export default LogoutButton;
