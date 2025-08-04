import { ReactNode } from "react";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/shared/mode-toggle";
import UserButton from "@/components/shared/user-button";

export default function Layout({ children }: { children: ReactNode }) {
  const admin: IUser = {
    role: "ADMIN",
    firstName: "Joe",
    lastName: "Mitchell",
    email: "admin@econsult.com",
  };
  return (
    <SidebarProvider>
      <AppSidebar user={admin} />
      <main className="w-full py-1 mr-2 min-h-screen">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <div className="flex items-center gap-2 mr-2">
            <ModeToggle />
            <UserButton user={admin} />
          </div>
        </div>
        <section className="px-2 w-full h-[calc(100vh-4rem)]">
          {children}
        </section>
      </main>
    </SidebarProvider>
  );
}
