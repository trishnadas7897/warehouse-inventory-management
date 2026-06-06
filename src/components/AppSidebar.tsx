import { Package, TrendingUp, ShoppingCart, Settings, Scan, Truck, PackageCheck } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Inventory", url: "/", icon: Package },
  { title: "Scanner", url: "/scanner", icon: Scan },
  { title: "Forecast", url: "/forecast", icon: TrendingUp },
  { title: "Logistics", url: "/logistics", icon: Truck },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-primary text-primary-foreground font-medium"
      : "text-foreground hover:bg-accent hover:text-accent-foreground"

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        <div className={`flex items-center gap-2.5 p-4 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <PackageCheck className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="leading-tight">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Stocktake</h2>
              <p className="text-xs text-muted-foreground">Inventory, counted.</p>
            </div>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}