import { AppSidebar } from "@/components/ui/app-sidebar"
import { DashboardHeader } from "@/components/ui/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface Props{
    children: React.ReactNode
}

export default function DashboardLayout({children}: Props){
    return(
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <main className="flex-1 overflow-auto p-4 md:p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}