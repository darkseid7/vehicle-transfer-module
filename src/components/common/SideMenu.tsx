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
  Divider,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

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
  const desktopDrawer = (
    <>
      <Toolbar>
        <Typography
          variant="h2"
          align="center"
          noWrap
          sx={{ color: "white", letterSpacing: 4, width: "100%" }}
        >
          VTM
        </Typography>
      </Toolbar>
      <Divider />
      <List
        sx={{
          color: "white",
          "& .MuiListItemButton-root": { color: "white" },
          "& .MuiListItemIcon-root": { color: "white" },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Transfers" />
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
          display: { xs: "block", sm: "none" },
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
          display: { xs: "none", sm: "block" },
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
