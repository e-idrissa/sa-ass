import { ReactNode } from "react";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/shared/mode-toggle";
import UserButton from "@/components/shared/user-button";
import { admin } from "@/lib/tmp/user";

export default function Layout({ children }: { children: ReactNode }) {
  const user = admin

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full py-1 mr-2 min-h-screen">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <div className="flex items-center gap-2 mr-2">
            <ModeToggle />
            <UserButton user={user} />
          </div>
        </div>
        <section className="px-2 w-full h-[calc(100vh-4rem)] py-4">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
