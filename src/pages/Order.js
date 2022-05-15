import * as React from 'react';
import { Container ,Typography, Paper, Button, StepContent, StepLabel, Step, Box, Stepper, Grid, CardMedia, Input, Snackbar , Alert, TextField, RadioGroup, FormControlLabel, Radio, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useNavigate } from "react-router-dom";
import { Label } from "reactstrap";

const Order = () => {
        const [dataCartReview, setDataCartReview] = useState([]);
        const [refreshPage, setRefreshPage] = useState(0);
        const [activeStep, setActiveStep] = useState(0);
        const [handleDisplayCart, setHandleDisplayCart] = useState("none");

        const [fullName, setFullName] = useState("");
        const [email, setEmail] = useState("");
        const [address, setAddress] = useState("");
        const [phone, setPhone] = useState("");
        const [city, setCity] = useState("");
        const [country, setCountry] = useState("");

        const [expanded1, setExpanded1] = useState(false);
        const [expanded2, setExpanded2] = useState(false);

        const [namePaymentMethod, setNamePaymentMethod] = useState("");

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
//////////////////////////////////////////////////////////////////////////////////////////////////
        const [open, setOpen] =useState(false);
        const [dataAlert, setDataAlert] = useState("");
               
          const handleClose = () => {
            setOpen(false);
          }

          const handleOpen = () =>{
            setOpen(true);
          }
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////// HANDLE SLECT PAYMNET METHOD

        const handleChange1 = () => {
            setExpanded1(true);
            setExpanded2(false);
            setNamePaymentMethod("Cash Out Delivery (COD)");
          };
        
          const handleChange2 = () => {
            setExpanded2(true);
            setExpanded1(false);
            setNamePaymentMethod("Direct Bank Transfer")
          };

//////////////////////// HANDLE SLECT PAYMNET METHOD
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

        const handleDataInput = () =>{
            let inputForm = {
                fullName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                country: ""
            }

            getDataInput(inputForm)
            let isValidateData = validateData(inputForm);
            if(isValidateData){
                // alert("ok");
                setActiveStep(activeStep + 1);
            }
        }

        const getDataInput = (paramInputForm) =>{
            paramInputForm.fullName = fullName;
            paramInputForm.email = email;
            paramInputForm.phone = phone;
            paramInputForm.address = address;
            paramInputForm.city = city;
            paramInputForm.country = country;

        }

        const validateData = (paramInputForm) =>{
            if(paramInputForm.fullName ===""){
                setDataAlert("Please fill out the fullname")
                handleOpen()
                return false;
            }

            var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
            if(paramInputForm.email === "" ){
                setDataAlert("Please fill out the email")
                handleOpen()
                return false;
            }
            if(paramInputForm.phone === ""){
                setDataAlert("Please fill out the phone")
                handleOpen()
                return false;
            }
            if(isNaN(parseInt(paramInputForm.phone,10))){
                setDataAlert("Phone invalid, please try agian !")
                handleOpen()
                return false;
            }
            if(paramInputForm.address ===""){
                setDataAlert("Please fill out the address")
                handleOpen()
                return false;
            }
            if(expanded1 === false && expanded2 === false){
                setDataAlert("Please select payment method")
                handleOpen();
                return false;
            }
            return true;
        }

    
    return(
        <>
            <Header
                handleDisplayCart = {handleDisplayCart}

            />
            <Container sx={{marginTop:"80px"}}>
            <Box >
            <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'right' }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={6000}  
                   >
                       <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            <b>{dataAlert}</b>
                        </Alert>
                   </Snackbar>
                    
                
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
                                        <Input value={fullName} onChange={(event) =>{setFullName(event.target.value)}} fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Email:</b></Label>
                                        <Input value={email} onChange={(event) =>{setEmail(event.target.value)}} fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Phone:</b></Label>
                                        <Input value={phone} onChange={(event) =>{setPhone(event.target.value)}} fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Address:</b></Label>
                                        <Input value={address} onChange={(event) =>{setAddress(event.target.value)}} fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>City:</b></Label>
                                        <Input value={city} onChange={(event) =>{setCity(event.target.value)}} fullWidth></Input>
                                    </Grid>
                                    <Grid container marginY={4}>
                                        <Label><b>Country:</b></Label>
                                        <Input value={country} onChange={(event) =>{setCountry(event.target.value)}} fullWidth></Input>
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

                                        <Grid container borderBottom='2px solid green' marginTop={5}>
                                            <Typography color="#777" fontSize="20px" fontWeight={750} fontStyle='italic'>Choose a payment method</Typography>                                                                                                             
                                        </Grid>
                                        <Accordion expanded={expanded1} onChange={handleChange1}>
                                            <AccordionSummary
                                            expandIcon={expanded1 ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon /> }
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            >
                                            <Typography sx={{flexShrink: 0 }}>
                                                <b>Cash Out Delivery (COD)</b>
                                            </Typography>
                                            
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography fontSize="14px" color="#888">
                                                You will pay with cash upon delivery.
                                            </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded2} onChange={handleChange2}>
                                            <AccordionSummary
                                            expandIcon={expanded2 ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon /> }
                                            aria-controls="panel2bh-content"
                                            id="panel2bh-header"
                                            >
                                            <Typography sx={{flexShrink: 0 }}><b>Direct Bank Transfer</b></Typography>
                                            
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography fontSize="14px" color="#888">
                                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                onClick={handleDataInput}
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
                            <Typography variant="h5"><b>Confirm your order</b></Typography>
                        </StepLabel>
                        <StepContent>
                        <Box>
                            <Grid container justifyContent='center' marginY={5}>
                                <Grid item xs={10}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Fullname"
                                                    value={fullName}
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Email"
                                                    value={email}
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                            </Grid>
                                        </Grid>
                                        <Grid container marginTop={3}>                                       
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Phone number"
                                                    value={phone}
                                                    fullWidth
                                                    variant="standard"
                                                    />                                                                   
                                        </Grid>
                                        <Grid container marginTop={3}>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Address"
                                                    value={address}
                                                    fullWidth
                                                    variant="standard"
                                                    />                                       
                                        </Grid>
                                        <Grid container marginY={3}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="City"
                                                    value={city}
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Country"
                                                    value={country}
                                                    fullWidth
                                                    variant="standard"
                                                    />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                                <TextField
                                                    disabled
                                                    id="outlined-disabled"
                                                    label="Payment Method"
                                                    value={namePaymentMethod}
                                                    fullWidth
                                                    variant="standard"
                                                    />                                       
                                        </Grid>
                                        <Grid container>
                                            <Typography fontSize="18px" color="#999" fontStyle="italic">About cart :</Typography>
                                            {dataCartReview.map((element, index) =>{
                                                return(
                                                    <Grid container key={index}>
                                                        <Typography fontSize="15px" color="#999" fontStyle='italic' borderBottom="1px solid #888">{element.name} (x{element.count})   </Typography>
                                                    </Grid>
                                                )
                                            })}
                                            <Grid container marginY={1}>
                                            <Grid item xs={1}>
                                                <Typography color="#777" fontSize="18px">Payment:</Typography>                                     
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Typography align="center" color="#888" fontSize="18px" fontStyle="italic" fontWeight={750}>{handleTotalCart()}$</Typography>                                     
                                            </Grid>
                                        </Grid>
                                        </Grid>
                                </Grid>
                                
                            </Grid>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <div>
                            <Button
                                variant="contained"
                                color='secondary'
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Confirm
                            </Button>
                            <Button
                                c
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
                
            </Box>
        
            </Container>
        <Footer/>
        </>
    )
}

export default Order