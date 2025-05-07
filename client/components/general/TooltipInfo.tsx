import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { CircleSmall } from 'lucide-react';

interface TooltipInfoProps {
    info: {
        heading: string;
        bullets?: string[]
    }
}
const TooltipInfo = ({ info }: TooltipInfoProps) => {
    return (

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{info.heading}</p>
                    {info.bullets &&
                        (
                            <div className="my-2">
                                {info.bullets.map((bullet, i) => (
                                    <div key={i} className="flex items-center">
                                        <CircleSmall />
                                        <p>{bullet}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >

    )
}

export default TooltipInfo;
