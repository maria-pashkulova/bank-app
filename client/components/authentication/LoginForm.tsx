"use client"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import CardWrapper from "./CardWrapper"
import { useContext } from "react"
import AuthContext from "@/contexts/authContext"
import { useRouter } from 'next/navigation'
import { LoginSchema } from "@/schemas/userSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { CustomError } from "@/interfaces/customTypes"
import { z } from "zod"
import { SubmitButton } from "../general/SubmitButton"

const LoginForm = () => {

    const auth = useContext(AuthContext);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: '',
            password: ''
        },
        mode: 'onChange'
    })

    //Controlled and validated form using React hook forms and Zod
    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {

        try {
            await auth?.loginSubmitHandler(data)
            toast.success("Успешно вписване!");
            router.push('/dashboard');
        } catch (error) {
            const customError = error as CustomError;
            //401 - incorrect email or password
            if (customError.status === 401) {
                toast.error(customError.message);
            } else {
                //Error connecting with server or other errors
                toast.error("Нещо се обърка! Опитайте по-късно!");
            }
        }


    }
    return (
        <div className="flex flex-col gap-6 max-w-md w-full">
            <CardWrapper
                title='Виртуален банков клон (e-fibank)'
            >
                <CardContent className="px-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <FormLabel required>Потребител</FormLabel>
                                                <p className="text-sm"><span className="text-red-500 font-bold">*</span> Задължителни полета</p>
                                            </div>
                                            <FormControl>
                                                <Input {...field} type="text" />
                                            </FormControl>
                                            <FormMessage className="text-right" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col gap-2">
                                            <FormLabel required>Парола</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="password" />
                                            </FormControl>
                                            <FormMessage className="text-right" />
                                        </FormItem>
                                    )}
                                />

                                <SubmitButton
                                    isLoading={form.formState.isSubmitting}
                                    loadingText="Вписване..."
                                    initialText="Вход"
                                    className="w-full bg-blue-900 uppercase cursor-pointer">

                                </SubmitButton>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </CardWrapper>

        </div >


    )
}

export default LoginForm;