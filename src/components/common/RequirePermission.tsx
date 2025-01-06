"use client";

import React from "react";
import { hasPermission } from "@/app/permissions";
import { useUser } from "@/app/context/userContext";

interface RequirePermissionProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RequirePermission({
  permission,
  fallback = null,
  children,
}: RequirePermissionProps) {
  const { role } = useUser();

  const canRender = hasPermission(role, permission);
  if (!canRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
