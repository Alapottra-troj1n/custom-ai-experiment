"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Home",
      pro: false,
    },
    {
      icon: Plus,
      href: "/companion/new",
      label: "Create",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];

  const handleNavigate = (url: string, pro: boolean) => {
    router.push(url);
  };

  return (
    <div className="bg-secondary h-full flex flex-col space-y-4 text-primary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => handleNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-xs text-muted-foreground group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary rounded-lg hover:bg-primary/10 transition",
                pathname === route.href && "text-primary bg-primary/10"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
