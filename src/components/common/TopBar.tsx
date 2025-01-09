"use client";

import { useState, FormEvent } from "react";
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
import { logoutAction } from "@/app/(dashboard)/dashboard/actions";

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

  const handleLogout = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await logoutAction();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        width: { md: `calc(100% - 240px)` },
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
              flexDirection: "column",
              gap: 2,
            },
          }}
        >
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {role}
          </Typography>
        </Box>

        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar
            alt="User Photo"
            src={`https://ui-avatars.com/api/?name=${user?.email}&background=7D2DFE&color=fff&rounded=true&font-size=0.5&format=svg&size=76`}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem disabled>Profile</MenuItem>
          <Divider />
          <form onSubmit={handleLogout}>
            <MenuItem
              component="button"
              sx={{
                width: "100%",
              }}
              type="submit"
            >
              Exit
            </MenuItem>
          </form>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
