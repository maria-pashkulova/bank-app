"use client";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/authContext";

export default function isGuest(Component: any) {
    return function IsGuest(props: any) {
        const auth = useContext(AuthContext);
        const isAuthenticated = auth?.isAuthenticated;
        useEffect(() => {
            if (isAuthenticated) {
                redirect("/dashboard");
            }
        }, []);

        if (isAuthenticated) {
            return null;
        }

        //render pages for logged-in users only
        return <Component {...props} />

    };
}