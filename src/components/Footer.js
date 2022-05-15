
import {Container, Typography, Grid} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () =>{
    return(
        <div style={{padding: "20px" , backgroundColor: "#15161D", marginTop:"77px", borderTop:"3px solid red" , bottom: 0}}>
            <Container>
            <Grid container color='white'>
                <Grid item xs={3}>
                    <Typography variant="body1" marginY={3} fontWeight={600}>
                        <b>PRODUCTS</b>
                    </Typography>
                    <Typography marginY={1} varian="body2">
                        Help Center
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Contact Us
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Product Help
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Warranty
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Order Status
                    </Typography>
                </Grid>
                
                <Grid item xs={3}>
                    <Typography variant="body1" marginY={3} fontWeight={600}>
                        <b>SERVICES</b>
                    </Typography>
                    <Typography marginY={1} varian="body2">
                        Help Center
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Contact Us
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Product Help
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Warranty
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Order Status
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="body1" marginY={3} fontWeight={600}>
                        <b>SUPPORTS</b>
                    </Typography>
                    <Typography marginY={1} varian="body2">
                        Help Center
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Contact Us
                    </Typography>
                    <Typography marginY={1}  varian="body2">
                        Product Help
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Warranty
                    </Typography>
                    <Typography  marginY={1} varian="body2">
                        Order Status
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                <Typography variant="h4" marginY={3} fontWeight={600} align='center' fontStyle='italic'>
                <b>Shop<div style={{display:"inline", color:'red'}}>24h</div></b>
                    </Typography>

                <Typography align='center'>
                    <FacebookIcon/> <InstagramIcon/> <YouTubeIcon/> <TwitterIcon/>
                </Typography>
                </Grid> 

            </Grid>
            </Container>
        </div>    
    )
}

export default Footer;