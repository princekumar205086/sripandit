"use client";
import React, { ReactNode, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MdAssignment } from "react-icons/md";
import { FaMapMarkedAlt } from "react-icons/fa";
import SettingsIcon from "@mui/icons-material/Settings";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LockIcon from "@mui/icons-material/Lock";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Collapse,
  useMediaQuery,
  Theme,
  useTheme,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import "@/app/globals.css";
import Image from "next/image";

interface Props {
  children?: ReactNode;
}

const drawerWidth = 240;

export default function Layout(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [username, setUsername] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Hydration Fix: Ensure state-based changes only happen client-side
  useEffect(() => {
    setIsMounted(true);

    // Get username from localStorage for display
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (
      pathname.startsWith("/support") ||
      pathname.startsWith("/change-password") ||
      pathname.startsWith("/contact")
    ) {
      setIsCollapse(true);
    }
  }, [pathname]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleCollapse = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCollapse((prev) => !prev);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Successfully logged out");
    router.push("/login");
  };

  // Get current page title in a more readable format
  const getPageTitle = () => {
    if (!pathname) return "Dashboard";

    const path = pathname.replace(/^\//, "");
    if (!path) return "Dashboard";

    return path
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const activeItemClass = "bg-cream text-orangeRed font-medium rounded-md";
  const inactiveItemClass = "text-cream hover:bg-cream/10 transition-all";

  const drawer = (
    <div className="bg-redOrange text-cream h-full flex flex-col">
      <Toolbar className="shadow-lg bg-cream py-2">
        <Link href="/" className="flex justify-center w-full">
          <Image
            alt="logo"
            src="/image/okpuja logo.png"
            height={50}
            width={180}
            className="object-contain"
          />
        </Link>
      </Toolbar>

      {username && (
        <Box className="px-4 py-3 flex items-center gap-3">
          <Avatar
            sx={{
              bgcolor: "#F8EFBA",
              color: "#ff4500",
              fontWeight: "bold",
            }}
          >
            {username.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" className="text-cream font-medium">
              Welcome,
            </Typography>
            <Typography variant="body2" className="text-cream/90">
              {username}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ bgcolor: "rgba(248, 239, 186, 0.2)" }} />

      <List className="flex-grow">
        {[
          { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
          { name: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
          { name: "My Booking", icon: <MdAssignment />, path: "/mybooking" },
          { name: "Address", icon: <FaMapMarkedAlt />, path: "/address" },
        ].map((item) => (
          <Link
            href={item.path}
            key={item.name}
            style={{ textDecoration: "none" }}
            onClick={isMobile ? handleDrawerClose : undefined}
          >
            <ListItem disablePadding className="px-2 py-0.5">
              <ListItemButton
                className={
                  pathname === item.path || pathname.startsWith(item.path + "/")
                    ? activeItemClass
                    : inactiveItemClass
                }
              >
                <ListItemIcon
                  className={
                    pathname === item.path ||
                    pathname.startsWith(item.path + "/")
                      ? "text-orangeRed min-w-[40px]"
                      : "text-cream min-w-[40px]"
                  }
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}

        <Divider sx={{ my: 1.5, bgcolor: "rgba(248, 239, 186, 0.2)" }} />

        <ListItem disablePadding className="px-2 py-0.5">
          <ListItemButton
            onClick={handleCollapse}
            className={
              isCollapse ? "bg-cream/10 text-cream" : inactiveItemClass
            }
          >
            <ListItemIcon className="text-cream min-w-[40px]">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
      </List>

      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List className="pl-4">
          {[
            { name: "Support", icon: <SupportAgentIcon />, path: "/support" },
            {
              name: "Change Password",
              icon: <LockIcon />,
              path: "/change-password",
            },
            { name: "Contact", icon: <ContactMailIcon />, path: "/contact" },
          ].map((item) => (
            <Link
              href={item.path}
              key={item.name}
              style={{ textDecoration: "none" }}
              onClick={isMobile ? handleDrawerClose : undefined}
            >
              <ListItem disablePadding className="px-2 py-0.5">
                <ListItemButton
                  className={
                    pathname === item.path ? activeItemClass : inactiveItemClass
                  }
                >
                  <ListItemIcon
                    className={
                      pathname === item.path
                        ? "text-orangeRed min-w-[40px]"
                        : "text-cream min-w-[40px]"
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{ fontSize: "0.9rem" }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>

      <Divider sx={{ bgcolor: "rgba(248, 239, 186, 0.2)" }} />

      <Box className="mt-auto">
        <ListItem
          disablePadding
          onClick={handleLogout}
          className="px-2 py-0.5 mb-2"
        >
          <ListItemButton className="bg-cream/10 hover:bg-cream text-cream hover:text-orangeRed transition-all duration-200 rounded-md my-2">
            <ListItemIcon className="text-cream hover:text-orangeRed min-w-[40px]">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </Box>
    </div>
  );

  return (
    <html lang="en">
      <body className="bg-cream">
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              bgcolor: "#ff4500",
              color: "#F8EFBA",
              boxShadow: 2,
              borderBottom: "none",
            }}
          >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    letterSpacing: "0.5px",
                  }}
                >
                  {getPageTitle()}
                </Typography>
              </Box>

              {!isMobile && (
                <Button
                  color="error"
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    textTransform: "none",
                    borderRadius: "20px",
                    color: "#ff4500",
                    px: 3,
                    backgroundColor: "#F8EFBA",
                    "&:hover": {
                      backgroundColor: "#F8EF99",
                    },
                    transition: "all 0.2s ease",
                    boxShadow: 1,
                  }}
                  startIcon={<LogoutIcon className="text-orangeRed" />}
                >
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
            }}
            aria-label="dashboard navigation"
          >
            {/* Mobile drawer */}
            <Drawer
              container={undefined}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true, // Better mobile performance
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  boxShadow: 3,
                },
              }}
            >
              {drawer}
            </Drawer>

            {/* Desktop drawer */}
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  border: "none",
                  boxShadow: 2,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
              pt: { xs: 8, sm: 10 },
              px: { xs: 2, sm: 3, md: 4 },
              pb: { xs: 6, sm: 4 },
              transition: "padding 0.2s ease",
            }}
          >
            {isMounted ? (
              <Box className="max-w-7xl mx-auto">{children}</Box>
            ) : null}
          </Box>
        </Box>

        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontSize: "14px",
            },
            success: {
              duration: 3000,
              style: {
                background: "#22c55e",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#22c55e",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#ef4444",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#ef4444",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
