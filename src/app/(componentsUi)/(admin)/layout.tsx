"use client";

import React, { ReactNode, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import HdrAutoIcon from "@mui/icons-material/HdrAuto";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
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
import { toast } from "react-hot-toast";
import Image from "next/image";
import "@/app/globals.css";

interface Props {
  children?: ReactNode;
}

const drawerWidth = 240;

export default function Layout(props: Props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isCollapse, setIsCollapse] = React.useState(false);

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

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname.startsWith("/support") ||
      pathname.startsWith("/change-password") ||
      pathname.startsWith("/contact")
    ) {
      setIsCollapse(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    toast.success("Successfully logged out");
    router.push("/login");
  };

  const drawer = (
    <div className="bg-redOrange text-cream h-full">
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
        {["Dashboard", "Profile", "AstrologyService", "PujaService", "Users"].map(
          (text) => (
            <Link
              href={`/admin/${text.toLowerCase()}`}
              key={text}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem
                disablePadding
                className={
                  pathname.includes(text.toLowerCase())
                    ? "text-orangeRed bg-cream"
                    : "text-cream"
                }
              >
                <ListItemButton>
                  <ListItemIcon
                    className={
                      pathname.includes(text.toLowerCase())
                        ? "text-orangeRed bg-cream"
                        : "text-cream"
                    }
                  >
                    {text === "Dashboard" && <DashboardIcon />}
                    {text === "Profile" && <AccountCircleIcon />}
                    {text === "AstrologyService" && <HdrAutoIcon />}
                    {text === "Users" && <PeopleIcon />}
                    {text === "PujaService" && <LocalFireDepartmentIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
        <Divider />
        <ListItem disablePadding onClick={handleCollapse}>
          <ListItemButton>
            <ListItemIcon className="text-cream">
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
              href={`/admin/${text.toLowerCase()}`}
              key={text}
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon className="text-cream">
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
      <List>
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
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
              <Typography variant="h6" noWrap component="div">
                {pathname.replace(/^\//, "").toUpperCase()}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  px: 3,
                  backgroundColor: "#F8EFBA",
                }}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
