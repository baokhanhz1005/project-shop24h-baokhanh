import { Container ,Typography, Paper, Button, StepContent, StepLabel, Step, Box, Stepper, Grid, CardMedia, Input } from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from "react-router-dom";
import { Label } from "reactstrap";

const Order = () => {
        const [dataCartReview, setDataCartReview] = useState([]);
        const [refreshPage, setRefreshPage] = useState(0);
        const [activeStep, setActiveStep] = useState(0);
        const [handleDisplayCart, setHandleDisplayCart] = useState("none")

        const navigate = useNavigate();
        const handleNext = () => {
          setActiveStep(activeStep + 1);
        };
      
        const handleBack = () => {
          setActiveStep(activeStep - 1);
        };
      
        const handleReset = () => {
          setActiveStep(0);
        };

        const checkLogin = (paramIsLogin) =>{
            if(!paramIsLogin){
                navigate("/dang-nhap");
            }
        }

        const handleDuplicateData = (paramDataCart) =>{
            let dataHandle = [...paramDataCart.reduce((r, e) => {
                let k = `${e._id}|${e.name}`;
                if(!r.has(k)) r.set(k, {...e, count: 1})
                else r.get(k).count++
                return r;
            }, new Map).values()]
            return dataHandle;
        }

        const handleTotalCart = () =>{
            let price = 0;
            for(let i = 0; i < dataCartReview.length; i++){
                price = price + dataCartReview[i].buyPrice * dataCartReview[i].count
            }
            return price;
        }

        useEffect(() =>{
            const isLogin = JSON.parse(localStorage.getItem('isLogin'));
            checkLogin(isLogin);
            const dataCart = JSON.parse(localStorage.getItem('dataCart'));
            const number = JSON.parse(localStorage.getItem('number'));
            let newDataLocal = handleDuplicateData(dataCart);
            setDataCartReview([...dataCartReview, ...newDataLocal]);

        },[refreshPage])

        const onBtnAddMoreProduct = (paramDataCart) =>{
            setDataCartReview([]);
            const dataCart = JSON.parse(localStorage.getItem('dataCart'));
            const number = JSON.parse(localStorage.getItem('number'));
            
            handleSaveData(number +1 ,[...dataCart, paramDataCart]);
        }

        const onBtnDecreaseProduct = (paramDataCart) =>{
            setDataCartReview([]);

            const dataCart = JSON.parse(localStorage.getItem('dataCart'));
            const numberPPP = JSON.parse(localStorage.getItem('number'));

            let indexFindDelete = dataCart.map((element) =>{ return element._id }).indexOf(paramDataCart._id)
            let dataGet = [...dataCart];
            dataGet.splice(indexFindDelete, 1);

            handleSaveData(numberPPP - 1, dataGet);
        }

        const handleSaveData = (paramNumber , paramDataSave) =>{
            localStorage.setItem('dataCart', JSON.stringify(paramDataSave));
            localStorage.setItem('number', JSON.stringify(paramNumber));
            setRefreshPage(refreshPage + 1);
        }

    
    return(
        <>
            <Header
                handleDisplayCart = {handleDisplayCart}

            />
            <Container sx={{marginTop:"80px"}}>
            <Box >
                <Stepper activeStep={activeStep} orientation="vertical">
                    {/* MUC 1 - GIO HANG */}
                    <Step>  
                        <StepLabel>
                            <Typography variant="h5"><b>Review your this cart</b></Typography>
                        </StepLabel>
                        <StepContent>
                        <Typography fontWeight={700} align="right" variant="h6" color='success'>Payment: {handleTotalCart()}$</Typography>
                            
                        <Box>
                        {dataCartReview.map((element, index) =>{
                            return(
                            <Grid container key={index} padding='20px 30px' border="1px solid #9999" marginY='5px'>
                                <Grid item xs={1}>
                                    <CardMedia
                                        conponent='img'
                                        image={element.imageUrl}
                                        alt='image cart'
                                        sx={{width: "60px", height:"60px", objectFit:'contain'}}
                                    />
                                </Grid>
                                <Grid item xs={4} flexDirection='column' justifyContent='center' display='flex'>
                                    <Typography marginLeft='20px' variant='h5' fontWeight={750}>{element.name}</Typography>
                                </Grid>
                                <Grid item xs={2} flexDirection='column' justifyContent='center' display='flex'>
                                    <b>Price: {element.buyPrice}$</b>
                                </Grid>
                                <Grid item xs={2} flexDirection='column' justifyContent='center' display='flex'>
                                    <b>Amount: {element.count}</b>
                                </Grid>
                                <Grid item xs={1} flexDirection='column' justifyContent='center' display='flex'>
                                    <Button key={index} onClick={()=>{onBtnAddMoreProduct(element)}} variant='contained' sx={{backgroundColor:"#198754", color:"white", width:"50px"}}><ArrowDropUpIcon/></Button>
                                    <Button key={index} onClick={()=>{onBtnDecreaseProduct(element)}} variant='contained' sx={{backgroundColor:"#D10024", color:'white', width:"50px"}}><ArrowDropDownIcon/></Button>
                                </Grid>
                                <Grid item xs={2} flexDirection='column' justifyContent='center' display='flex'>
                                    <Typography marginLeft='30px' variant='h6' fontWeight={750} fontStyle='italic' color='info'>Total: {element.buyPrice * element.count}$</Typography>
                                </Grid> 
                            </Grid>
                            )
                        })}
                        </Box>                       
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Continue
                            </Button>
                            <Button
                                disabled
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>

                    {/* MUC 2 - NHAP THONG TIN KHACH HANG */}
                    <Step>
                        <StepLabel>
                            <Typography variant="h5"><b>Customer Information</b></Typography>
                        </StepLabel>
                        <StepContent>
                        <Box>
                            <Grid container>
                                <Grid item xs={7}>
                                    <Grid container marginY={4}>
                                        <Label><b>Fullname:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Email:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Phone:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Address:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>City:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Country:</b></Label>
                                        <Input fullWidth></Input>
                                    </Grid>
                                </Grid>

                                <Grid item xs={5} padding={5}>
                                    <Typography variant='h5' color='success.main' fontStyle='italic'><b>Your Order</b></Typography>
                                    <Box padding={3}>
                                        <Grid container borderBottom='3px solid green'>
                                            <Grid item xs={7}>
                                                <Typography fontSize="20px"  variant="body2"><b>PRODUCTS</b></Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                            <Typography fontSize="20px" align="center"><b>TOTAL PRICE</b></Typography>
                                            </Grid>
                                        </Grid>
                                        {dataCartReview.map((element, index) =>{
                                            return(
                                                <Grid container key={index} marginY={4} borderBottom='1px solid #9999'>
                                                    <Grid item xs={7}>
                                                        <Typography color="#777" fontSize="15px">{element.name} (x{element.count})</Typography>
                                                    </Grid>
                                                    <Grid item xs={5}>
                                                        <Typography fontSize="15px" align="center"><b>{element.buyPrice * element.count}$</b></Typography>                                  
                                                    </Grid>
                                                </Grid>
                                            )
                                        })}
                                        <Grid container borderBottom='2px solid green'>
                                            <Grid item xs={7}>
                                                <Typography color="#777" fontSize="20px">Payment</Typography>                                     
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography align="center" color="green" fontSize="30px" fontWeight={750}>{handleTotalCart()}$</Typography>                                     
                                            </Grid>
                                        </Grid>

                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Continue
                            </Button>
                            <Button
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>

                    {/* MUC 3 - KIEM TRA VA XAC NHAN DON HANG */}
                    <Step>
                        <StepLabel>
                            <Typography variant="h5"><b>Confirm Order</b></Typography>
                        </StepLabel>
                        <StepContent>
                        <Typography>ádaasdsadsadasdasdas</Typography>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={handleBack}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Back
                            </Button>
                            </div>
                        </Box>
                        </StepContent>
                    </Step>
                 
                </Stepper>
                {activeStep === 2 && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                    </Paper>
                )}
            </Box>
        
            </Container>
        <Footer/>
        </>
    )
}

export default Order