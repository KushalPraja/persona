import {
  Calendar,
  Home,
  Search,
  Settings,
  User,
  FileText,
  Database,
  Folder,
} from "lucide-react";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

// Menu items
// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/home",
    icon: Home,
  },
  {
    title: "Templates",
    url: "/home#templates",
    icon: FileText,
  },
  {
    title: "Recent Projects",
    url: "/home#projects",
    icon: Folder,
  },
  {
    title: "Create Project",
    url: "/home#create",
    icon: Database,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white border">
            <Image
              src="/logo.svg"
              alt="Persona"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold text-sidebar-foreground">Persona</span>
            <span className="text-xs text-sidebar-foreground/70">Product Intelligence</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-sidebar-foreground/70 border-t">
          2025 Persona • SpurHacks
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
