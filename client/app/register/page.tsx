'use client'
import RegisterForm from "@/components/authentication/RegisterForm";
import isGuest from "@/route-guards/isGuest";


function RegisterPage() {


    return (
        <div>
            <main className="my-10">
                <RegisterForm />
            </main>
        </div>

    )
}
export default isGuest(RegisterPage);

