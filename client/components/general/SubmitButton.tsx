import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubmitButtonProps {
    isLoading: boolean;
    loadingText?: string;
    initialText: string;
    className?: string; // Add className as an optional prop
}

export function SubmitButton({ isLoading, loadingText, initialText, className }: SubmitButtonProps) {
    return (
        <Button type="submit" disabled={isLoading} className={className}>
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? loadingText : initialText}
        </Button>
    )
}