import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import { Button } from "@/client/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/client/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/client/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/client/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/client/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/client/components/ui/avatar";

import {
  House,
  CalendarDays,
  CalendarCheck,
  User,
  Joystick,
  PanelLeft,
  LogOut,
} from "lucide-react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect } from "react";
import axios from "axios";
import PopulationChart from "./charts/PopulationChart";
import PointsChart from "./charts/PointsChart";

const navItems = [
  { icon: House, label: "Home", ariaLabel: "Home", path: "/dashboard" },
  {
    icon: CalendarCheck,
    label: "Attendance",
    ariaLabel: "Attendance",
    path: "/dashboard/attendance",
  },
  {
    icon: CalendarDays,
    label: "Events",
    ariaLabel: "Events",
    path: "/dashboard/events",
  },
  {
    icon: User,
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

const DashBoard = () => {
  // React Router hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Example: Make a GET request to a protected endpoint
        const response = await axios.get("/cookieAuth"); // Replace with your endpoint

        // If user is authenticated, handle it here (optional)
        console.log("User authenticated:", response.data);
      } catch (error) {
        // If there's an error or user is not authenticated, handle it here
        console.error("Authentication error:", error.response);
        // For example, redirect to login page if unauthorized
        navigate("/");
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post("/logout");
      await axios.post("/logout"); // Call the backend logout endpoint
      // Optionally clear local storage or perform additional cleanup
      console.log("Logout successful:", response.data);
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle error if necessary
    }
  };

  // Function to capitalize the first letter of each word
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Split the current path into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Map the path segments to breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index, array) => {
    // The path for each breadcrumb
    const path = `/${array.slice(0, index + 1).join("/")}`;

    // Label for the breadcrumb
    const label = index === 0 ? "Home" : capitalize(segment);

    return { path, label };
  });

  // Ensure "Home" is always the first breadcrumb
  if (breadcrumbs.length === 0 || breadcrumbs[0].label !== "Home") {
    breadcrumbs.unshift({ path: "/dashboard", label: "Home" });
  }

  // todo: In this component, add API POST method for logging out.

  return (
    <div className="flex w-full h-screen max-h-screen flex-col bg-muted/40 overflow-hidden">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <div className="border-b p-2">
          <a href="https://www.facebook.com/CCISStudentCouncil" target="_blank">
            <Button variant="outline" size="icon" aria-label="Home">
              <img
                src="/images/ccis-logo.png"
                alt="CCIS Logo"
                className="size-5"
              />
            </Button>
          </a>
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
      <div className="flex flex-col sm:pl-14 min-h-screen">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:py-2 sm:static sm:h-auto sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <a
                  href="https://www.facebook.com/CCISStudentCouncil"
                  target="_blank"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-muted text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <img
                    src="/images/ccis-logo.png"
                    className="h-5 w-5 transition-all group-hover:scale-110"
                  />
                  <span className="sr-only">CCIS Week 2024</span>
                </a>
                {navItems.map(({ icon: Icon, label, path }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground cursor-pointer ${
                      location.pathname === path ? "text-primary" : ""
                    }`}
                    onClick={() => navigate(path)}
                  >
                    <Icon className="size-5" />
                    {label}
                  </div>
                ))}
                <div
                  className={
                    "flex items-center gap-4 px-2.5 text-destructive cursor-pointer"
                  }
                >
                  <LogOut className="size-5" />
                  Logout
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden sm:flex">
            <BreadcrumbList>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(item.path);
                        }}
                        className={
                          location.pathname === item.path ? "text-primary" : ""
                        }
                      >
                        {item.label}
                      </a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://scontent-mnl1-2.xx.fbcdn.net/v/t39.30808-6/441925813_441655938594840_4107996967858372694_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=qSnEdKcLbrQQ7kNvgG339QS&_nc_ht=scontent-mnl1-2.xx&oh=00_AYDOd0rX-_fPlNh5cdvtu43y20zrUOX6OM9vg8ZAna4Y3g&oe=66998CB7"
                    alt="@ccis2024"
                  />
                  <AvatarFallback>CC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <a
                href="https://www.facebook.com/CCISStudentCouncil"
                target="_blank"
              >
                <DropdownMenuItem>Visit Page</DropdownMenuItem>
              </a>
              <a href="https://mcl.edu.ph/" target="_blank">
                <DropdownMenuItem>Support</DropdownMenuItem>
              </a>
              <DropdownMenuSeparator />
              {/* //todo: POST method for logging out.  */}
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive font-semibold"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 sm:pt-4">
          <Outlet />
          {location.pathname === "/dashboard" && (
            <div className="grid flex-1 scroll-mt-20 items-start gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10">
              <PopulationChart />
              <PointsChart />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
