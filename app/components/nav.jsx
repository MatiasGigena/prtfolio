"use client";
import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(245, 0, 87, 0)",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});
const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

const NavBar = () => {
  const ref = useRef(null)
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {gsap.to(ref.current, {scale: 0, duration: 0.25, ease: "power1.out"})},
        onEnterBack: () => {gsap.to(ref.current, {scale: 1, duration: 0.25, ease: "power1.out"})},
      }
    })
  },[])
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Matías Gigena
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link href={`#${item}`} key={item} passHref style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar ref={ref} sx={{ boxShadow: "none", zIndex: "40" }} component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" }, color: "white" }}>
              <MenuIcon />
              <Typography sx={{ flexGrow: 1, display: { xs: "block", sm: "none" }, ml: 2, color: "white" }}>
                Matías Gigena
              </Typography>
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, color: "white" }}>
              Matías Gigena
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" }, color: "white" }}>
              {navItems.map((item) => (
                <Link href={`#${item}`} key={item} passHref style={{ textDecoration: "none", color: "inherit" }}>
                  <Button key={item} sx={{ color: "white" }}>
                    {item}
                  </Button>
                </Link>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}>
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
