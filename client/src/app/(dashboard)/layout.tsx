"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type React from "react";

function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="h-16 px-4" />
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      return (
        <BreadcrumbItem>
          <BreadcrumbPage>Home</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    const breadcrumbItems = [];

    if (segments.length > 0) {
      breadcrumbItems.push(<BreadcrumbSeparator key="home-separator" />);
    }

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;
      const displayName = formatSegmentName(segment);

      if (isLast) {
        breadcrumbItems.push(
          <BreadcrumbItem key={`item-${index}`}>
            <BreadcrumbPage>{displayName}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        breadcrumbItems.push(
          <BreadcrumbItem key={`item-${index}`}>
            <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
          </BreadcrumbItem>
        );
        breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${index}`} />);
      }
    });

    return breadcrumbItems;
  };

  const formatSegmentName = (segment: string): string => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
