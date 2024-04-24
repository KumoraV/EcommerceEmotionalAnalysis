import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SideDrawer from './SideDrawer';
import SignOutButton from './buttons/SignOutButton';
import SignUpButton from './buttons/SignUpButton';
import SignInButton from './buttons/SignInButton';
import GoToCreateProductButton from './buttons/GoToCreateProductButton';
import GoToCartButton from './buttons/GoToCartButton';
import GoToOrdersButton from './buttons/GoToOrdersButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountPageButton from './buttons/AccountPageButton';
import SearchProduct from './SearchProduct';

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start', // Center align the buttons horizontally
  alignItems: 'center',
  '& .MuiButton-root': {
    color: 'white',
  },
});


const NavBarContainer = styled(Box)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'flex-start', // Center align the buttons horizontally
  
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#b39ddb', // Change to your preferred background color
  boxShadow: 'none', // Remove box shadow for a cleaner look
});

const Title = styled(Typography)({
  flexGrow: 1,
  fontWeight: 'bold', // Adjust font weight for emphasis
});

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(1, 1, 1, 4),
  '& .MuiInputBase-input': {
    width: 'unset',
  },
}));

const LogoImg = styled('img')({
  height: '60px', // Adjust height as needed
  marginRight: '230px', // Add some spacing between logo and text/buttons
});

const isLoggedIn = localStorage.getItem('user') !== null;
const user = JSON.parse(localStorage.getItem('user'));
const isAdmin = user !== null && user.admin;

export default function NavBar() {
  

  return (
    <NavBarContainer>
      <StyledAppBar position="static">
        <Toolbar>
          
        <SideDrawer />
        <LogoImg src={window.location.origin + '/media/bannerImages/logo.png'} alt="Logo" />

        <ButtonContainer>
          <Button color="primary" component={Link} to="/">
            Home
          </Button>
          <Button color="primary" component={Link} to="/all">
            Products
          </Button>
          {isAdmin && <GoToCreateProductButton />}
          {isLoggedIn && !isAdmin && <GoToCartButton />}
          {isLoggedIn && !isAdmin && <GoToOrdersButton />}
          {!isLoggedIn && <SignInButton />}
          {!isLoggedIn && <SignUpButton />}
          {isLoggedIn && <SignOutButton />} 
          {isLoggedIn && <AccountPageButton />}

        </ButtonContainer>

        <SearchContainer>
         <SearchProduct/>
          </SearchContainer>
        </Toolbar>
      </StyledAppBar>
    </NavBarContainer>
  );
}
