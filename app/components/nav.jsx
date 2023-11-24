'use client';
import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import Magnetic from './reusable/Magnetic';
import { gsap } from 'gsap';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(245, 0, 87, 0)',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
const navItems = ['Work', 'About', 'Contact'];

const NavBar = ({ locomotiveScroll }) => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight / 1.25,
        onLeave: () => {
          gsap.to(ref.current, {
            scale: 0,
            duration: 0.25,
            ease: 'power3.out',
          });
        },
        onEnterBack: () => {
          gsap.to(ref.current, {
            scale: 1,
            duration: 0.25,
            ease: 'power1.out',
          });
        },
      },
    });
  }, []);
  const handleLinkClick = (targetId) => {
    const targetElement = document.querySelector(targetId);

    if (targetElement && locomotiveScroll) {
      locomotiveScroll.scrollTo(targetElement, {
        offset: 0,
        duration: 4,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          ref={ref}
          sx={{ boxShadow: 'none', zIndex: '40' }}
          component='nav'
        >
          <Toolbar>
            <div className='flex w-full xsm:hidden items-center'>
              <div className='dropdown'>
                <label tabIndex={0} className=' m-1'>
                  <MenuIcon />
                </label>
                <ul
                  tabIndex={0}
                  className='dropdown-content mt-5 z-[1] menu p-2 shadow bg-transparent backdrop-blur-xl rounded-box w-52'
                >
                  {navItems.map((item, index) => (
                    <li key={index}>
                      <a
                        onClick={() =>
                          handleLinkClick(`#${item}`)
                        }
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <Typography
                sx={{
                  flexGrow: 1,
                  display: { xs: 'block', sm: 'none' },
                  ml: 2,
                  color: 'white',
                  width: '100%',
                }}
              >
                Matías Gigena
              </Typography>
            </div>

            <Typography
              variant='h6'
              component='div'
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: 'white',
              }}
            >
              Matías Gigena
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'white',
              }}
            >
              {navItems.map((item, index) => (
                <Magnetic key={index}>
                  <Button
                    onClick={() => {
                      handleLinkClick(`#${item}`);
                    }}
                    sx={{ color: 'white' }}
                  >
                    {item}
                  </Button>
                </Magnetic>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default NavBar;
