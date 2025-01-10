"use client";

import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { RequirePermission } from "@/components/common/RequirePermission";
import { PERMISSIONS } from "@/app/permissions";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

interface SideMenuProps {
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

export default function SideMenu({
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}: SideMenuProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  const desktopDrawer = (
    <>
      <Toolbar>
        <Typography
          variant="h2"
          align="center"
          noWrap
          sx={{
            mt: 2,
            color: "white",
            letterSpacing: 4,
            width: "100%",
            "& a": {
              textDecoration: "none",
              color: "inherit",
              "&:visited": {
                color: "inherit",
              },
            },
          }}
        >
          <Link href={"/dashboard"}>VTM</Link>
        </Typography>
      </Toolbar>

      <List
        sx={{
          mt: 2,
          color: "white",
          "& .MuiListItemButton-root": { color: "white" },
          "& .MuiListItemIcon-root": { color: "white" },
        }}
      >
        <RequirePermission permission={PERMISSIONS.CREATE_TRANSFERS}>
          <ListItem disablePadding>
            <ListItemButton selected={isActive("/transfer")}>
              <Link
                href={"/transfer"}
                style={{
                  display: "flex",
                  gap: "2px",
                  alignItems: "center",
                  textDecoration: "none",
                  width: "100%",
                }}
              >
                <ListItemIcon>
                  <SwapHorizIcon />
                </ListItemIcon>
                <ListItemText primary="Transfers" />
              </Link>
            </ListItemButton>
          </ListItem>
        </RequirePermission>
        <ListItem disablePadding>
          <ListItemButton selected={isActive("/dashboard")}>
            <Link
              href={"/dashboard"}
              style={{
                display: "flex",
                gap: "2px",
                alignItems: "center",
                textDecoration: "none",
                width: "100%",
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        onTransitionEnd={handleDrawerTransitionEnd}
        ModalProps={{
          keepMounted: true,
        }}
        sx={(theme) => ({
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
          },
        })}
      >
        {desktopDrawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={(theme) => ({
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
          },
        })}
        open
      >
        {desktopDrawer}
      </Drawer>
    </>
  );
}
