
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Home, 
  Star, 
  Users, 
  LayoutDashboard,
  Globe,
  Menu
} from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();

  const quickAccessItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Features', path: '/features', icon: Star },
    { name: 'About', path: '/about', icon: Users },
  ];

  const mainMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'How It Works', path: '/how-it-works', icon: Globe },
    { name: 'Contact', path: '/contact', icon: Menu },
  ];

  return (
    <Sidebar className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <SidebarHeader className="bg-white dark:bg-gray-900">
        <Link to="/" className="flex items-center space-x-2 p-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg lingo-gradient">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold gradient-text">LingoLive</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="bg-white dark:bg-gray-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-gray-300">Quick Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickAccessItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-blue-900"
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 dark:text-gray-300">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.path}
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-blue-900"
                  >
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-white dark:bg-gray-900">
        <div className="p-4 text-xs text-gray-500 dark:text-gray-400">
          © 2024 LingoLive
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
