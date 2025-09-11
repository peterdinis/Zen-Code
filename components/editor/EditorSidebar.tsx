"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Code, 
  FileText, 
  Terminal, 
  Settings, 
  Eye,
  Palette,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    group: "Code",
    items: [
      { title: "Editor", icon: Code, id: "editor" },
      { title: "Templates", icon: FileText, id: "templates" },
      { title: "Preview", icon: Eye, id: "preview" },
    ]
  },
  {
    group: "Tools", 
    items: [
      { title: "Terminal", icon: Terminal, id: "terminal" },
      { title: "Packages", icon: Database, id: "packages" },
    ]
  },
  {
    group: "Settings",
    items: [
      { title: "Theme", icon: Palette, id: "theme" },
      { title: "Config", icon: Settings, id: "config" },
    ]
  }
];

interface EditorSidebarProps {
  activePanel: string;
  onPanelChange: (panelId: string) => void;
  collapsed?: boolean;
}

export function EditorSidebar({ activePanel, onPanelChange, collapsed = false }: EditorSidebarProps) {
  return (
    <Sidebar className={cn("border-r border-border bg-card/50", collapsed ? "w-14" : "w-60")}>
      <SidebarContent>
        {sidebarItems.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="text-muted-foreground">
              {!collapsed && group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onPanelChange(item.id)}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        activePanel === item.id 
                          ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
                          : "hover:bg-muted/50"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}