import { Container, Grid, Link, Typography } from "@mui/material"
import Login from '../components/Login'

const LoginForm = () =>{
    return(

        <>
        <Container sx={{display:"flex", justifyContent:"center", marginTop:"64px"}}>
            <Login />
            
        </Container>
        <Grid container marginTop={2}>
            <Grid item xs={12}>
                <Typography align="center" variant='body2'>Don't have an account ? <Link href="/">Sign up here</Link>  </Typography>    
            </Grid>
        </Grid>
        </>
    )
}

export default LoginForm;