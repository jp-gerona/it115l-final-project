import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { Button } from "@/client/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/client/components/ui/breadcrumb";

import {
  House,
  CalendarDays,
  CalendarCheck,
  ContactRound,
  Joystick,
} from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const DashBoard = () => {
  // Navigation items dynamically generated using array
  const navItems = [
    { icon: House, label: "Home", ariaLabel: "Home", path: "/dashboard" },
    {
      icon: CalendarDays,
      label: "Events",
      ariaLabel: "Events",
      path: "/dashboard/events",
    },
    {
      icon: CalendarCheck,
      label: "Attendance",
      ariaLabel: "Attendance",
      path: "/dashboard/attendance",
    },
    {
      icon: ContactRound,
      label: "Members",
      ariaLabel: "Members",
      path: "/dashboard/members",
    },
    {
      icon: Joystick,
      label: "Players",
      ariaLabel: "Players",
      path: "/dashboard/players",
    },
  ];

  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <img
              src="/images/ccis-logo.png"
              alt="CCIS Logo"
              className="size-5"
            />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            {navItems.map(({ icon: Icon, label, ariaLabel, path }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-lg ${location.pathname === path ? "bg-muted" : ""}`}
                    aria-label={ariaLabel}
                    onClick={() => navigate(path)}
                  >
                    <Icon className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      <Outlet />
    </div>
  );
};

export default DashBoard;
