"use client";

import { GalleryVerticalEndIcon, LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { adminLinks, footerLinks, links } from "@/lib/constants/sidebar";

interface SideBarHeaderProps {
  state: "collapsed" | "expanded";
  isMobile: boolean;
};

interface SidebarMenuProps {
  links: { label: string; href: string; icon: LucideIcon }[];
  pathname: string;
};

interface SidebarFooterProps {
  pathname: string;
};

const Header = ({ state, isMobile }: SideBarHeaderProps) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem
          className={cn(
            state === "collapsed" && !isMobile
              ? "bg-blue-700 p-0 flex items-center justify-center h-8 rounded"
              : "bg-accent py-1 px-2 rounded-md",
            ""
          )}
        >
          <Link href={"/"} className="flex items-center">
            <GalleryVerticalEndIcon
              className={cn(
                state === "collapsed" && !isMobile
                  ? "size-4"
                  : "size-10 p-2 rounded-md bg-blue-700",
                "text-white"
              )}
            />
            {state === "expanded" || isMobile ? (
              <div className="flex flex-col ml-2">
                <h3 className="font-medium text-lg">Consult.co</h3>
                <span className="text-sm text-muted-foreground">
                  Your health, our priority
                </span>
              </div>
            ) : null}
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

const Footer = ({ pathname }: SidebarFooterProps) => {
  return (
    <SidebarFooter className="mb-[0px]">
      <SidebarMenu>
      {footerLinks.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton asChild isActive={pathname === item.href}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
      </SidebarMenu>
    </SidebarFooter>
  );
};

const Menu = ({ links, pathname }: SidebarMenuProps) => {
  return (
    <SidebarMenu>
      {links.map((item) => (
        <SidebarMenuItem key={item.label}>
          <SidebarMenuButton asChild isActive={pathname === item.href}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export const AppSidebar = ({ user }: { user: IUser }) => {
  const pathname = usePathname();

  const { state, isMobile } = useSidebar();
  return (
    <Sidebar variant="floating" collapsible="icon" className="h-full">
      <Header state={state} isMobile={isMobile} />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Menu links={links} pathname={pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
        {user.role === "ADMIN" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <Menu links={adminLinks} pathname={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <Footer pathname={pathname}/>
    </Sidebar>
  );
};
