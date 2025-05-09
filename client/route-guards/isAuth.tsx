"use client";
import { redirect } from 'next/navigation'
import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/authContext";

export default function isAuth(Component: any) {
    return function IsAuth(props: any) {
        const auth = useContext(AuthContext);
        const isAuthenticated = auth?.isAuthenticated;

        useEffect(() => {
            if (!isAuthenticated) {
                redirect("/");
            }
        }, []);

        if (!isAuthenticated) {
            return null;
        }

        //render pages for logged-in users only
        return <Component {...props} />
    };
}