import Link from 'next/link';
import Image from "next/image";
import { Button, buttonVariants } from '../ui/button';
import { LaptopMinimal, Smartphone, NotebookTabs, Info } from 'lucide-react';
import AuthContext from "@/contexts/authContext"
import { useContext } from 'react';
import LogoutButton from '../authentication/LogoutButton';

const guestLinks = [
    { title: 'Към сайта', to: '/', icon: LaptopMinimal },
    { title: 'Мобилно приложение', to: '/', icon: Smartphone },
    { title: 'Промени в ОУ и тарифа', to: '/', icon: NotebookTabs },
    { title: 'Помощ', to: '/', icon: Info }
];

export default function MainNavigation() {
    const auth = useContext(AuthContext);
    const isAuthenticated = auth?.isAuthenticated;

    return (

        <nav className="flex items-center py-5 px-4 flex-wrap justify-between  border border-slate-900/5">
            <Link href='/'>
                <Image
                    src="/fibank-logo.svg"
                    alt="Fibank logo"
                    width={180}
                    height={38}
                />
            </Link>
            {!isAuthenticated ?
                (
                    <>
                        <div>
                            <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                                {guestLinks.map(({ title, to, icon: Icon }) => {


                                    return (
                                        <Link
                                            key={title}
                                            href={to}
                                            className=' flex px-3 py-2 text-gray-800 items-center justify-center hover:underline'

                                        >
                                            <Icon size='16' />
                                            <span className='pl-1'>{title}</span>
                                        </Link>

                                    )
                                })
                                }
                            </div>
                        </div>
                        <Link href={"/register"} className={buttonVariants({ variant: "outline" })}>Регистрация</Link>
                    </>
                ) : (<LogoutButton />)
            }


        </nav >
    )
}