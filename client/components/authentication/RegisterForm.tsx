"use client"
import TooltipInfo from "../general/TooltipInfo";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import CardWrapper from "./CardWrapper";
import { RegisterSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { CustomError } from "@/interfaces/customTypes";
import { SubmitButton } from "../general/SubmitButton";



const RegisterForm = () => {


    const auth = useContext(AuthContext);
    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            pid: '',
            idNum: '',
            cyrillicName: '',
            latinName: '',
            email: '',
            phone: '',
            address: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onChange'
    })
    //Controlled and validated form using React hook forms and Zod
    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {

        try {
            await auth?.registerSubmitHandler(data)
            toast.success("Регистрацията е успешна!");
            router.push('/dashboard');
        } catch (error) {
            const customError = error as CustomError;
            //409 - user with the same username exists
            if (customError.status === 409) {
                toast.error(customError.message);
            } else {
                //Error connecting with server or other errors
                toast.error("Нещо се обърка! Опитайте по-късно!");
            }
        }


    }
    return (
        <div className="flex flex-col gap-6 max-w-2xl w-full mx-auto">
            <CardWrapper
                title='Регистрация на нов потребител'
                description='Тази регистрационна форма се попълва, само ако нямате потребител и парола за Виртуален банков клон (e-fibank) на ПОБ. Ако вече имате потребител и парола, добавянето на достъп до ново физическо или юридическо лице става в банката. Ако сте забравили своя потребител и/или парола, заповядайте в банката, за да ги получите.'
            >
                <Separator className="my-2 w-full" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <div className="flex flex-col gap-6">
                            <p className="text-sm text-muted-foreground"><span className="text-destructive font-bold mr-0.5 text-sm">*</span> Задължителни полета</p>

                            <FormField
                                control={form.control}
                                name="pid"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">ЕГН</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="idNum"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel className="w-1/2">ЛНЧ или паспорт</FormLabel>
                                            <FormControl>
                                                <div className="relative w-1/2 ">
                                                    <Input {...field} type="text" />
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                        <TooltipInfo info={{ heading: 'Попълва се само от чуждестранни граждани' }} />
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cyrillicName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Име и фамилия на кирилица</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="latinName"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Име и фамилия на латиница</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">E-mail</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="email" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Телефон</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="tel" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Адрес</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <Separator className="my-2 w-full" />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Потребителско име</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2"> Парола за вход</FormLabel>
                                            <FormControl>
                                                <div className="relative w-1/2 ">
                                                    <Input {...field} type="password" />
                                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                        <TooltipInfo info={{ heading: 'Изисквания за парола:', bullets: ['Да е с дължина от 6 го 24 знака', 'Да съдържа пне една буква', 'Да съдържа поне една цифра', 'Да е на латиница'] }} />
                                                    </div>
                                                </div>
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex justify-between ">
                                            <FormLabel required className="w-1/2">Повторете паролата</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" className="w-1/2" />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-right" />
                                    </FormItem>
                                )}
                            />
                            <Separator className="my-2 w-full" />
                            <p className="text-muted-foreground">
                                Необходимо е да запомните потребителското си име и парола, които току-що въведохте. След като потвърдите регистрацията в банката, те ще ви служат за вход във Виртуален банков клон (e-fibank)
                            </p>

                            <SubmitButton
                                isLoading={form.formState.isSubmitting}
                                loadingText="Изпращане на искане за регистрация"
                                initialText="Изпратете искане за регистрация"
                                className="w-full bg-blue-900 uppercase cursor-pointer">

                            </SubmitButton>

                        </div>
                    </form>

                </Form>

            </CardWrapper>

        </div >
    )
}

export default RegisterForm;
