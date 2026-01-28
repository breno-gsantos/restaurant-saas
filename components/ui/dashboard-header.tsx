import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function DashboardHeader(){
    return(
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <Button variant='ghost' size='icon' className="relative">
                <Bell className="size-5" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                <span className="sr-only">Notificações</span>
            </Button>
        </header>
    )
}