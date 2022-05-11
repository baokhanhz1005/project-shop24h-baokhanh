import { Button, Grid, Box, Typography, Input } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import {auth, googleProvider} from '../firebase';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';



const Login = () =>{
    
    const [user , setUser ] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const onBtnLogin = () =>{
        console.log("Clickkkkkk");
        auth.signInWithPopup(googleProvider)
        .then((data) =>{
            console.log(data);
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('isLogin', JSON.stringify(true))
            setUser(data.user);
            navigate(-1);
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    useEffect(() =>{
        auth.onAuthStateChanged((result) =>{
        console.log(result);
        setUser(result);
        })
      },[])

    
    return(
        <>
            <Header/>

            <Grid container width={450} padding={5} sx={{backgroundColor:"white", border:1, borderColor: "#999", borderRadius:"10px", marginTop:"50px"}}>
                <Grid item xs={12} marginBottom={5}>
                    <Button onClick={onBtnLogin} fullWidth variant='contained' color='warning'><GoogleIcon/>Sign in with Google</Button>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ borderBottom: 1, borderColor: "#9999"}}></Box>
                </Grid>
                <Grid item xs={12} sx={{textAlign:"center", marginTop:"-15px"}}>
                    <Typography variant='body2' fontWeight={700} sx={{borderRadius: "50%", border:1 , display:"inline-block", padding:"3px", backgroundColor:"white"}}> Or </Typography>
                </Grid>
                <Grid item xs={12} marginTop={5}>
                    <Input disableUnderline placeholder='    Username...' fullWidth sx={{border:1, borderRadius:"15px", borderColor:"#9999", paddingX:"15px"}} />
                </Grid>
                <Grid item xs={12} marginTop={3}>
                    <Input disableUnderline placeholder='    Password...' fullWidth sx={{border:1, borderRadius:"15px", borderColor:"#9999", paddingX:"15px"}} />
                </Grid>
                <Grid item xs={12} marginTop={3}>
                <Button fullWidth variant='contained' color='success' fontWeight={700} borderRadius="15px">Sign in</Button>
                </Grid>
            </Grid> 

            
        </> 

    )
}

export default Login;