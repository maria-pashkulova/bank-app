'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface CardWrapperProps {
    title: string,
    description?: string,
    children: React.ReactNode
}

const CardWrapper = ({ title, description, children }: CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{title}</CardTitle>
                {description && <CardDescription className="text-sm">{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default CardWrapper
