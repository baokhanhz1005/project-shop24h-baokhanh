
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
                      
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={iphone}
                    alt="First slide"
                  />
                  <Carousel.Caption>
              
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={vivo}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                      
                  </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
                <img
                    className="d-block w-100 img-radius"
                    src={samsung}
                    alt="First slide"
                  />
                  <Carousel.Caption>
              
                  </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    )
}

export default CarouselSlider;