"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EmployersPageHeader } from "@/components/employer/EmployersPageHeader";
import SidebarLeft from "@/components/employer/SidebarLeft";

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const getIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 1023;
};

export const EmployerHeaderContext = React.createContext({ headerHeight: 0 });

export function MainLayout({
  children,
  currentPage,
  onNavigate,
}: MainLayoutProps) {
  const [isSidebarLeftExpanded, setSidebarLeftExpanded] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const handleToggleSidebar = () => {
    setSidebarLeftExpanded((prev) => !prev);
  };

  const showTooltips = !isSidebarLeftExpanded;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen">
        {/* Mobile Sidebar Overlay */}
        {getIsMobile() && (
          <div
            className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
              isSidebarLeftExpanded
                ? "opacity-50 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setSidebarLeftExpanded(false)}
          />
        )}

        <SidebarLeft
          isSidebarLeftExpanded={isSidebarLeftExpanded}
          showTooltips={showTooltips}
          currentPage={currentPage}
          onNavigate={onNavigate}
          handleToggleSidebar={handleToggleSidebar}
          isMobile={getIsMobile()}
        />

        <div className="flex h-screen overflow-hidden flex-col w-full">
          <EmployersPageHeader
            onHeightChange={setHeaderHeight}
            handleToggleSidebar={handleToggleSidebar}
            isFixed={false}
          />
          <EmployerHeaderContext.Provider value={{ headerHeight }}>
            <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
          </EmployerHeaderContext.Provider>
        </div>
      </div>
    </TooltipProvider>
  );
}
