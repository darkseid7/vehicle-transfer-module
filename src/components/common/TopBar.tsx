"use client";

import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@/app/context/userContext";

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { user, role } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout");
    handleCloseMenu();
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: "240px" },
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="body1" sx={{ mr: 2 }}>
          {user?.email}
        </Typography>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {role}
        </Typography>

        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar alt="User Photo" src="https://via.placeholder.com/150" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem disabled>Perfil</MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Exit</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
