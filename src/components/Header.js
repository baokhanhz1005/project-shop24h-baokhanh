import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link , Grid, Badge, CardMedia, Input, Stack, Popper , Grow, Paper, ClickAwayListener , MenuList, Modal} from '@mui/material';

import { auth, googleProvider } from '../firebase';

import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const pages = [<NotificationsIcon/> , <PersonIcon/>, <LocalGroceryStoreIcon/>];

const navBars = [
  {
    name: "HOME",
    route: "/"
  },
  {
    name: "PRODUCTS",
    route: "/products"
  },
  {
    name: "ORDER",
    route: "/order"
  }
]

const Header = ({dataCartProp, number, refreshPageHeader, handleAddMoreCart, handleDecreaseCart, handleDisplayCart}) => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [user, setUser] = useState(null);
  const [refreshPage, setRefreshPage] = useState(0);
 
  const [display, setDisplay] = useState("none");

  const [dataCartProduct, setDataCartProduct] = useState([]);
  const [numberCartProduct, setNumberCartProduct] = useState(0);

  const [open, setOpen] = React.useState(false);

  const [openCart, setOpenCart] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }


useEffect(() =>{
  const dataCart = JSON.parse(localStorage.getItem('dataCart'));
  const numberPPP = JSON.parse(localStorage.getItem('number'));

  if(dataCartProp){

    setDataCartProduct([...dataCartProduct, ...dataCartProp])
    setNumberCartProduct(number);
    console.log("11111111")
  }else{
    var dataHandleDuplicate = [...dataCart.reduce((r, e) => {
      let k = `${e._id}|${e.name}`;
      if(!r.has(k)) r.set(k, {...e, count: 1})
      else r.get(k).count++
      return r;
  }, new Map).values()]
    setDataCartProduct([...dataCartProduct, ...dataHandleDuplicate]); 
    setNumberCartProduct(numberPPP);
    console.log("22222");
  }
},[refreshPageHeader , refreshPage])
 


useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
    setUser(user);
  }
}, []);

const logoutGoogle = () =>{
  auth.signOut()
    .then(() =>{
      localStorage.setItem('user', null);
      localStorage.setItem('isLogin', false);
      localStorage.setItem('number', JSON.stringify(0));
      localStorage.setItem('dataCart', JSON.stringify([]));
      setUser(null);
      navigate(0);
    })
    .catch((error) =>{
      console.log(error);
    })
}

//TÍNH TONG PRICE
const handleTotalPrice = () =>{
  if(dataCartProp){
    let total = 0;
    for(let i = 0; i < dataCartProp.length; i++){
      total = total +  dataCartProp[i].buyPrice * dataCartProp[i].count;
    }
  return total;
  }else{
    let total = 0;
    for(let i = 0; i < dataCartProduct.length; i++){
      total = total +  dataCartProduct[i].buyPrice * dataCartProduct[i].count;
    }
    return total;
  }
}

const handleCloseCart = () =>{
  setOpenCart(false);
} //DONG GIO HANG
const handleOpenCart = () =>{
  setOpenCart(true);
} //MO GIO HANG

const onBtnAddMore = (paramData) =>{  //NUT THEM SAN PHAM TRONG GIO HANG
  if(dataCartProp){
    handleAddMoreCart(paramData);
  }
  else{
    setDataCartProduct([]);
    setNumberCartProduct(0);
    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    const numberPPP = JSON.parse(localStorage.getItem('number'));

    handleSaveData(numberPPP + 1, [...dataCart, paramData]);
  }
}
  
const onBtnDecreaseCart = (paramData) =>{ //NUT GIAM SAN PHAM TRONG GIO HANG
  if(dataCartProp){ //XU LY KHI Ở TRANG PRODUCT INFO
    handleDecreaseCart(paramData);
  }else{  //XU LY KHI O TRANG HOME VA PRODUCT LIST
    setDataCartProduct([]);
    setNumberCartProduct(0);

    const dataCart = JSON.parse(localStorage.getItem('dataCart'));
    const numberPPP = JSON.parse(localStorage.getItem('number'));

    let indexFindDelete = dataCart.map((element) =>{ return element._id }).indexOf(paramData._id)
    let dataGet = [...dataCart];
    dataGet.splice(indexFindDelete, 1);

    handleSaveData(numberPPP - 1, dataGet);
  }
}


const handleSaveData = (paramNumber, paramDataCart) =>{
  localStorage.setItem('number', JSON.stringify(paramNumber));
  localStorage.setItem('dataCart', JSON.stringify(paramDataCart));
  setRefreshPage(refreshPage + 1);
}

const onBtnGetToOrder = () =>{
    navigate("/order");
}

  return (
    <>
    {/* HIEN THI CART */}
   
    {dataCartProp ?
    <Modal open={openCart}
      onClose={handleCloseCart}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
  >
      <Box position="absolute" sx={{border:"1px solid #9999", top:"65px", right:0, backgroundColor:"white", width:"500px", zIndex:20}}>
      {dataCartProp.map((element, index) =>{
        return(
          <Grid container key={index} p={3} sx={{border:"1px solid #9999"}}>
            <Grid item xs={3}>
            <CardMedia
                component="img"
                image={element.imageUrl}
                alt="green iguana"
                sx={{width:"80px", height:"80px", objectFit:"contain"}}
                />
            </Grid>
            <Grid item xs={7}>
                <Typography variant='h6'>{element.name}</Typography>
                <Typography color="yellow" variant="body1"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/> </Typography>
                <Typography variant='body1' color="green" ><b>${element.buyPrice} (x{element.count})</b></Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid item xs={6}>
                <Button key={index} onClick={()=>{onBtnAddMore(element)}} variant='contained' color='info'><AddShoppingCartIcon/></Button>
              </Grid>
              <Grid item xs={6}>
                <Button key={index} onClick={()=>{onBtnDecreaseCart(element)}} variant='contained' color='error'><RemoveShoppingCartIcon/></Button>
              </Grid>
            </Grid>
      </Grid>
        )
      })}
      <Grid container justifyContent='space-between' p={3}>
        <Grid item xs={5}>
          <Typography variant='h5' fontWeight={700}>TOTAL: {handleTotalPrice()}$</Typography>
        </Grid>
       
        <Grid item xs={4}>
          <Button variant='contained' color='secondary' onClick={onBtnGetToOrder}>VIEW CART</Button>
        </Grid>
      </Grid>
    </Box>
    </Modal>
    :
    <Modal open={openCart}
      onClose={handleCloseCart}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
  >

    <Box position="absolute" sx={{border:"1px solid #9999", top:"65px", right:0, backgroundColor:"white", width:"500px", zIndex:20}}>
      {console.log(dataCartProduct)}
    {dataCartProduct.map((element, index) =>{
      return(
        <Grid container key={index} p={3} sx={{border:"1px solid #9999"}}>
          <Grid item xs={4}>
          <CardMedia
              component="img"
              image={element.imageUrl}
              alt="green iguana"
              sx={{width:"80px", height:"80px", objectFit:"contain"}}
              />
          </Grid>
          <Grid item xs={6}>
              <Typography variant='h6'>{element.name}</Typography>
              <Typography color="yellow" variant="body1"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/> </Typography>
              <Typography variant='body1' color="green" ><b>${element.buyPrice} (x{element.count})</b></Typography>
          </Grid>
          <Grid item xs={2}>
              <Grid item xs={6}>
                <Button key={index} onClick={()=>{onBtnAddMore(element)}} variant='contained' color='info'><AddShoppingCartIcon/></Button>
              </Grid>
              <Grid item xs={6}>
                <Button key={index} onClick={()=>{onBtnDecreaseCart(element)}} variant='contained' color='error'><RemoveShoppingCartIcon/></Button>
              </Grid>
            </Grid>
    </Grid>
      )
    })}
    <Grid container justifyContent='space-between' p={3}>
    <Grid item xs={5}>
          <Typography variant='h5' fontWeight={700}>TOTAL: {handleTotalPrice()}$</Typography>
        </Grid>
       
        <Grid item xs={4}>
          <Button variant='contained' color='secondary' onClick={onBtnGetToOrder}>VIEW CART</Button>
        </Grid>
    </Grid>
  </Box>

  </Modal>
    }

    {/* NAVBAR */}
    <AppBar position="fixed" style={{backgroundColor:'#15161D', borderBottom:'2px solid red'}}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            color="#fff"
          >
            <Link href="/" sx={{textDecoration:"none", color:"#fff", fontStyle:'italic'}}><b>Shop<div style={{display:"inline", color:'red'}}>24h</div></b></Link>
          </Typography>

          {/* MOBILE */}
        
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}> 
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* MOBILE */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
           <Link href="/"> DEVCAMP 120</Link>
          </Typography>

          <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' }}} justifyContent="flex-start">
              {navBars.map((navBar) =>(
                <Button
                key={navBar}
                href={navBar.route}
                sx={{fontWeight:700, color:"#fff"}}
                >
                  {navBar.name}
                </Button>
              ))}

          </Box>

          <Box sx={{ flexGrow: 4, display: { xs: 'none', md: 'flex' }}} justifyContent="flex-start">
                <Grid container>
                  <Grid item xs={8}>
                    <Input disableUnderline sx={{backgroundColor:"#fff", borderRadius:"15px 0 0 15px", padding:"2px"}} placeholder='Search products' fullWidth></Input>
                  </Grid>
                  <Grid item xs={4}>
                    <Button sx={{backgroundColor:"#D10024", color:"#fff", borderRadius:"0 15px 15px 0", paddingX:"15px"}}><b>Search</b></Button>
                  </Grid>
                </Grid>

          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}} justifyContent="flex-end">
            {user == null ?
              <Button sx={{fontWeight:700, color:"#fff"}} href='/dang-nhap'>Login</Button>
              :
              <Stack>
                <Button
                  id="composition-button"
                  aria-controls={open ? 'composition-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  justifyContent='flex-end'
                >
                    <img src={user.photoURL} width={30} height={30} alt="avatar" style={{borderRadius: "50%"}} ></img>
                  </Button>
                <Popper
                  open={open}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{top:"60px !important", left: "1075px !important"}}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom-start' ? 'left top' : 'left bottom',
                          
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logoutGoogle}>Logout</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Stack>
            // <Grid Container justifyContent="flex-end">
              
            //     <img src={user.photoURL} width={30} height={30} alt="avatar" style={{borderRadius: "50%"}} ></img>
              
              
            //       <Button onClick={logoutGoogle} sx={{fontWeight:700}} >Logout</Button>
            //       <Typography variant='body1' color="#fff" >Xin chào, {user.displayName}</Typography>
            // </Grid>
          }
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent="space-evenly">
         
            <Badge badgeContent={0} color="primary">
              <NotificationsIcon cursor="pointer" sx={{color: "#fff"}}/>
            </Badge>

            <Badge badgeContent={0} color="primary">
                <PersonIcon cursor="pointer" sx={{color: "#fff"}}/>
            </Badge>

             {number?
             <Badge badgeContent={number} color="error">
             {
             // console.log(dataCart)
               console.log(number)
             }
               <LocalGroceryStoreIcon cursor="pointer" onClick={handleOpenCart} sx={{color: "#fff"}}/>
           </Badge>
           :
           <Badge badgeContent={numberCartProduct} color="error">
           {
           // console.log(dataCart)
             console.log(numberCartProduct)
           }
             <LocalGroceryStoreIcon cursor="pointer" onClick={handleOpenCart} sx={{color: "#fff", display: {handleDisplayCart}}}/>
         </Badge>

            }   
            
                  
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
};
export default Header;
