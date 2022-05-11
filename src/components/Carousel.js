
import 'bootstrap/dist/css/bootstrap.min.css'
import { Carousel } from 'react-bootstrap';
import {Grid, Typography, Button} from '@mui/material'
import headphone from '../assets/images/headphone.jpg'
import pc from '../assets/images/pc.jpg'
import bag from '../assets/images/bag.jpg'
import watch from '../assets/images/watch.jpg'

import xiaomi from '../assets/images/bannerxiaomi.jpg';
import iphone from '../assets/images/banneriphone.jpg';
import vivo from '../assets/images/bannervivo.jpg';
import samsung from '../assets/images/bannersamsung.jpg';




const CarouselSlider = () =>{
    return(
        <Carousel interval={2000} fade style={{marginTop: "64px"}}>
        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={xiaomi}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                      <Button sx={{ marginBottom:"50px", marginRight:"700px", fontWeight:700, color: "#087ea7", fontSize:"25px"}}>GET MORE...</Button>
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={iphone}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                      <Button sx={{ marginBottom:"50px", fontWeight:700, color: "#767676", fontSize:"25px"}}>GET MORE...</Button>
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={vivo}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                      <Button sx={{ marginBottom:"50px", fontWeight:700, color: "#087ea7", fontSize:"25px"}}>GET MORE...</Button>
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={samsung}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                      <Button sx={{ marginBottom:"50px", fontWeight:700, color: "#087ea7", fontSize:"25px"}}>GET MORE...</Button>
                  </Carousel.Caption>
        </Carousel.Item>

        {/* <Carousel.Item>
            <Grid container>
                <Grid item xs={1}></Grid> 
                <Grid item xs={5} justifyContent="center" display="flex" flexDirection="column" width="80%">
                    <Typography variant='h5' fontWeight={600} >
                        Perspiciatis Unde Omnis
                    </Typography>
                    <Typography variant='h3'fontWeight={800} >
                        Perspiciatis PC
                    </Typography>
                    <Typography variant='body2' marginY={5} color="#999">
                    blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                    </Typography>
                    
                    <Grid container>
                        <Button variant="contained" width="200px" sx={{backgroundColor:"#D10024"}}>BUY NOW</Button>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                <img
                    className="d-block w-100 img-radius"
                    src={pc}
                    alt="First slide"
                  />
                </Grid>
            </Grid>
        </Carousel.Item>

        <Carousel.Item>
            <Grid container>
                <Grid item xs={1}></Grid> 
                <Grid item xs={5} justifyContent="center" display="flex" flexDirection="column" width="80%">
                    <Typography variant='h5' fontWeight={600} >
                    Voluptas Sit Aspernatur
                    </Typography>
                    <Typography variant='h3'fontWeight={800} >
                    Voluptas Sit BAG
                    </Typography>
                    <Typography variant='body2' marginY={5} color="#999">
                    laudantium totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem vel illum qui dolorem
                    </Typography>
                    
                    <Grid container>
                        <Button variant="contained" width="200px" sx={{backgroundColor:"#D10024"}}>BUY NOW</Button>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                <img
                    className="d-block w-100 img-radius"
                    src={bag}
                    alt="First slide"
                  />
                </Grid>
            </Grid>
        </Carousel.Item>

        <Carousel.Item>
            <Grid container>
                <Grid item xs={1}></Grid> 
                <Grid item xs={5} justifyContent="center" display="flex" flexDirection="column" width="80%">
                    <Typography variant='h5' fontWeight={600} >
                    Aliquam Quaerat Voluptatem
                    </Typography>
                    <Typography variant='h3'fontWeight={800} >
                    Aliquam Quaerat Watch
                    </Typography>
                    <Typography variant='body2' marginY={5} color="#999">
                    beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </Typography>
                    
                    <Grid container>
                        <Button variant="contained" width="200px" sx={{backgroundColor:"#D10024"}}>BUY NOW</Button>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                <img
                    className="d-block w-100 img-radius"
                    src={watch}
                    alt="First slide"
                  />
                </Grid>
            </Grid>
        </Carousel.Item> */}

      </Carousel>
    )
}

export default CarouselSlider;