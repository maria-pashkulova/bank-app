import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6 max-w-md w-full", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Виртуален банков клон (e-fibank)</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="email"><span className="text-red-500 font-bold">*</span> Потребител</Label>
                                    <p className="text-sm"><span className="text-red-500 font-bold">*</span> Задължителни полета</p>
                                </div>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password"><span className="text-red-500 font-bold">*</span> Парола</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full bg-blue-900">
                                ВХОД
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Login with Google
                            </Button> */}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}
