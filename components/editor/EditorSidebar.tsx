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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

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
    <Sidebar
      className={cn(
        "border-r border-border bg-card/50 transition-all duration-300 ease-in-out",
        collapsed ? "w-14" : "w-60"
      )}
    >
      <SidebarContent>
        <TooltipProvider>
          {sidebarItems.map((group, idx) => (
            <div key={group.group}>
              <SidebarGroup>
                {/* Group Label */}
                {!collapsed && (
                  <SidebarGroupLabel className="text-muted-foreground text-xs tracking-wide px-2 py-1">
                    {group.group}
                  </SidebarGroupLabel>
                )}

                {/* Group Content */}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              onClick={() => onPanelChange(item.id)}
                              className={cn(
                                "cursor-pointer transition-all duration-200 flex items-center gap-2",
                                activePanel === item.id 
                                  ? "bg-primary/20 text-primary font-medium border-r-2 border-primary" 
                                  : "hover:bg-muted/50"
                              )}
                            >
                              <item.icon className="w-4 h-4 shrink-0" />
                              {!collapsed && <span>{item.title}</span>}
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          {collapsed && (
                            <TooltipContent side="right">
                              {item.title}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Separator between groups */}
              {idx < sidebarItems.length - 1 && (
                <Separator className="my-2 opacity-40" />
              )}
            </div>
          ))}
        </TooltipProvider>
      </SidebarContent>
    </Sidebar>
  );
}
