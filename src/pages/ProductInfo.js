import { Container, Grid , Card, CardActionArea, CardMedia, CardContent, Typography, Button, Box} from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import BreadCrumb from "../components/BreadCrumb";

import { useDispatch, useSelector } from "react-redux";

const ProductInfo = () =>{

    // const dispatch = useDispatch();
 
    // const { number } = useSelector((reduxData) =>{
    //   reduxData.taskReducer
    // });

    // const onBtnAddProduct = () =>{
    //     dispatch({
    //         type: "ADD_PRODUCT",
    //         payload: {
    //             addNumBer: number++
    //         }
    //     });
    // }


    const [products, setProduct] = useState([]);
    const {param} = useParams();

    const [refreshPage, setRefreshPage] = useState(0);      
    
    const [productMore, setProductMore] = useState([]);        // PRODUCT RELATED;

    const [dataCart, setDataCart] = useState(JSON.parse(localStorage.getItem('dataCart'))); //[ ]

    const [number, setNumber] = useState(JSON.parse(localStorage.getItem('number')));

    const [refreshPageHeader, setRefreshPageHeader] = useState(0);      

    const [dataHandleDuplicate, setDataHandleDuplicate] = useState(null);



    const getDataProductMore = async (paramUrl, paramObject = {}) =>{
        const response = await fetch(paramUrl);
        const data = await response.json();
        return data;
    }

    useEffect(() =>{
        getDataProductMore("https://shop24h-be.herokuapp.com/products?limit=6")
        .then((data) =>{
            console.log(data);
            setProductMore(data.data);
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [param])

    const handleRefreshPage = () =>{
        setRefreshPage(refreshPage + 1);
    }


    const getData = async (paramUrl, paramObject = {}) =>{
        const response = await fetch(paramUrl);
        const data = await response.json();
        return data;
    }

    useEffect(() =>{
        getData("https://shop24h-be.herokuapp.com/products/" + param)
        .then((data) =>{
            console.log(data);
            setProduct(data);
            window.scrollTo(0, 0)
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [refreshPage])

    const navigate = useNavigate();

    const onBtnGetDetail = (element) =>{
        navigate(`/products/${element._id}`);
        localStorage.setItem('data', JSON.stringify(element));
        handleRefreshPage();
    }

    const handleAddMoreCart = (paramDataCart) =>{
        setDataCart([...dataCart , paramDataCart]);
        setNumber(number + 1);
        handleDuplicateData([...dataCart , paramDataCart]);
        handleDataCart(number + 1 , [...dataCart , paramDataCart]);
    }

    const handleDecreaseCart = (paramDataCart) =>{
        let indexFindDelete = dataCart.map((element) => { return element._id}).indexOf(paramDataCart._id);
        
        console.log(indexFindDelete)
        let newData = [...dataCart]
        newData.splice(indexFindDelete, 1)
        // console.log(newData);
        console.log(paramDataCart._id)
        setDataCart(newData)
        setNumber(number - 1);
        handleDuplicateData(newData);
        handleDataCart(number - 1, newData);
    }


    const onBtnAddProduct = () =>{
        setNumber(number + 1);
        setDataCart([...dataCart , products]);
        handleDuplicateData([...dataCart , products]);
        handleDataCart(number + 1 , [...dataCart , products]);
    }
    
    const handleDataCart = (paramNumber, paramDataCart) =>{
        localStorage.setItem('number', JSON.stringify(paramNumber));
        localStorage.setItem('dataCart', JSON.stringify(paramDataCart));
        setRefreshPageHeader(refreshPageHeader + 1);
    }

    const handleDuplicateData = (paramDataCart) =>{
        setDataHandleDuplicate([...paramDataCart.reduce((r, e) => {
            let k = `${e._id}|${e.name}`;
            if(!r.has(k)) r.set(k, {...e, count: 1})
            else r.get(k).count++
            return r;
        }, new Map).values()])
    }
    

    const danhMuc = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Products",
            url:"/products"
        },
        {
            name: products.name,
            url:"/" + products._id
        }
    ]

    return(
        <>
        <Header
            dataCartProp = {dataHandleDuplicate}
            number = {number}
            refreshPageHeader = {refreshPageHeader}
            handleAddMoreCart = {handleAddMoreCart}
            handleDecreaseCart = {handleDecreaseCart}
        />
        <Container sx={{marginTop:"80px"}}>
                <BreadCrumb danhMucProp={danhMuc} />
                <Grid container marginTop={3}>
                    <Grid item xs={4}>  
                        {/* <img sx={{maxWidth:"300px"}} src={products.imageUrl} alt="product"/> */}
                        <CardMedia
                            component="img"
                            image={products.imageUrl}
                            alt="green iguana"
                            sx={{width:"300px"}}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        {console.log(dataHandleDuplicate)}
                            <Typography variant="h4">{products.name}</Typography>     
                            <Typography variant="h6">Brand: {products.name}</Typography>
                            <Grid container>
                                <Grid item xs={1}>
                                    <b>Rated:</b>
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography color="yellow" variant="body1"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/> </Typography>
                                </Grid>
                                </Grid>                        
                            <Typography marginY={3} variant="body1">Smartphones have seen technologies such as folding display and 144Hz refresh rate introduced among the premium flagship smartphones. Other innovations like 120Hz and 90Hz refresh rate display made it to mid-segment devices. Triple camera remained a common trend in 2021 and is likely to move into 2022</Typography>                        
                            <Typography marginY={3} color="red" variant="h4">${products.buyPrice}</Typography>                        
                           
                            <Button onClick={onBtnAddProduct} variant="contained" sx={{backgroundColor:"#D10024"}}>ADD TO CART</Button>

                    </Grid>
                </Grid>
                <Grid container marginY={5}>
                    <Typography variant="h6"><b>DESCRIPTION</b></Typography>     
                    <Grid item xs={12}>
                        {products.description}
                    </Grid>
                </Grid>

                <Typography marginBottom={3} variant="h6"><b>Related Products</b></Typography>     

                <Box sx={{flexWrap:"wrap", display:"flex"}}>
            {productMore.map((element, index) =>{
                return(

                <Card sx={{flex:1, flexBasis: "30%", display:"flex", maxWidth:"384px"}} key={index}>  
                        <CardActionArea sx={{display:"flex", flexDirection:"column"}} onClick={()=>{onBtnGetDetail(element)}}>
                            <CardMedia
                            component="img"
                            image={element.imageUrl}
                            alt="green iguana"
                            sx={{width:"200px"}}
                            />
                            <CardContent>
                            <Typography variant="body2" align="center">
                                    <b>{element.name}</b>
                            </Typography>
                            <Typography variant="body2" align="center" color="error">
                                    <b>${element.buyPrice}</b>
                            </Typography>
                            
                            </CardContent>
                        </CardActionArea>
                    </Card>
                )
            })}

            </Box>
        </Container>
        <Footer/>
        </>
    )
}   

export default ProductInfo;