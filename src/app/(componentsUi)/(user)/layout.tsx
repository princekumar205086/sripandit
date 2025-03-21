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
import { Collapse } from "@mui/material";
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
  const [isMounted, setIsMounted] = useState(false); // For Hydration Issue

  const router = useRouter();
  const pathname = usePathname();

  // Hydration Fix: Ensure state-based changes only happen client-side
  useEffect(() => {
    setIsMounted(true);
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

  const drawer = (
    <div className="bg-redOrange text-cream h-full">
      {/* Apply background and text color */}
      <Toolbar className="shadow-lg bg-cream">
        <Link href="/">
          <Image
            alt="logo"
            src="/image/okpuja logo.png"
            height={50}
            width={180}
          />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Profile", "My Booking", "Address"].map((text) => (
          <Link
            href={`/${text.toLowerCase().replace(/\s+/g, "")}`}
            key={text}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem
              disablePadding
              className={
                pathname.startsWith("/" + text.toLowerCase())
                  ? "text-orangeRed bg-cream"
                  : "text-cream" // Change text color to cream
              }
            >
              <ListItemButton>
                <ListItemIcon
                  className={
                    pathname.startsWith("/" + text.toLowerCase())
                      ? "text-orangeRed bg-cream"
                      : "text-cream" // Change text color to cream
                  }
                >
                  {text === "Dashboard" && <DashboardIcon />}
                  {text === "Profile" && <AccountCircleIcon />}
                  {text === "My Booking" && <MdAssignment />}
                  {text === "Address" && <FaMapMarkedAlt />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <Divider />
        <ListItem
          disablePadding
          onClick={handleCollapse}
          className={
            pathname.startsWith("/setting")
              ? "text-sky-600 bg-slate-100"
              : "text-cream" // Change text color to cream
          }
        >
          <ListItemButton>
            <ListItemIcon
              className={
                pathname.startsWith("/setting")
                  ? "text-sky-600 bg-slate-100"
                  : "text-cream" // Change text color to cream
              }
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setting" />
            {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
      </List>
      <Collapse in={isCollapse} timeout="auto" unmountOnExit>
        <List>
          {["Support", "Change-Password", "Contact"].map((text) => (
            <Link
              href={`/${text.toLowerCase()}`}
              key={text}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem
                disablePadding
                className={
                  pathname.startsWith("/" + text.toLowerCase())
                    ? "text-sky-600 bg-slate-100"
                    : "text-cream" // Change text color to cream
                }
              >
                <ListItemButton>
                  <ListItemIcon
                    className={
                      pathname.startsWith("/" + text.toLowerCase())
                        ? "text-sky-600 bg-slate-100"
                        : "text-cream" // Change text color to cream
                    }
                  >
                    {text === "Support" && <SupportAgentIcon />}
                    {text === "Change-Password" && <LockIcon />}
                    {text === "Contact" && <ContactMailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
      <Divider />
      <List className="bg-cream text-orangeRed mt-auto">
        {" "}
        {/* Added mt-auto to push to bottom */}
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton className="py-3">
            {" "}
            {/* Added more padding */}
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "error.main" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container = undefined;

  return (
    <html lang="en">
      <body className="bg-cream">
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              bgcolor: "#ff4500",
              color: "#F8EFBA",
              boxShadow: "none",
              borderBottom: "solid #6a11cb 1px",
            }}
          >
            <Toolbar>
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
                sx={{ fontWeight: "bold" }}
              >
                {pathname.replace(/^\//, "").toUpperCase()}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="error"
                variant="contained"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  color: "#ff4500",
                  px: { xs: 2, sm: 3 }, // Responsive padding
                  py: { xs: 0.5, sm: 0.75 }, // Responsive padding
                  fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Responsive font size
                  backgroundColor: "#F8EFBA",
                  "&:hover": {
                    backgroundColor: "#F8EF99",
                  },
                  display: { xs: "none", md: "flex" }, // Hide on small screens
                }}
                startIcon={<LogoutIcon className="text-orange-500" />}
              >
                Logout
              </Button>
              <IconButton
                onClick={handleLogout}
                sx={{
                  display: { xs: "flex", md: "none" },
                  backgroundColor: "#F8EFBA",
                  color: "#ff4500",
                  "&:hover": {
                    backgroundColor: "#F8EF99",
                  },
                  ml: 1,
                }}
                aria-label="logout"
              >
                <LogoutIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="dashboard"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
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
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              mt: 4,
            }}
          >
            {isMounted ? children : null}{" "}
            {/* Only render content after mounted */}
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
            },
            success: {
              duration: 3000,
              style: {
                background: "#22c55e",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#ef4444",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
