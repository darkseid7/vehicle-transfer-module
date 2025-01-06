export const PERMISSIONS = {
  VIEW_TRANSFERS: "VIEW_TRANSFERS",
  CREATE_TRANSFERS: "CREATE_TRANSFERS",
  EDIT_TRANSFERS: "EDIT_TRANSFERS",
  DELETE_TRANSFERS: "DELETE_TRANSFERS",
};

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: [
    PERMISSIONS.VIEW_TRANSFERS,
    PERMISSIONS.CREATE_TRANSFERS,
    PERMISSIONS.EDIT_TRANSFERS,
    PERMISSIONS.DELETE_TRANSFERS,
  ],

  viewer: [PERMISSIONS.VIEW_TRANSFERS],
};

//IMPORTANT:This function checks if a user has a specific permission based on their role
export function hasPermission(
  role: string | null,
  permission: string
): boolean {
  if (!role) return false;
  const userPermissions = ROLE_PERMISSIONS[role] || [];
  return userPermissions.includes(permission);
}
