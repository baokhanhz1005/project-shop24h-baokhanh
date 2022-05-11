import { Container, Grid, Pagination} from "@mui/material";

import BreadCrumb from "../components/BreadCrumb";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCart from "../components/ProductCart";
import ProductFilter from "../components/ProductFilter";

import { useState, useEffect } from "react";

const ProductList = () =>{

    
    const danhMuc = [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Products",
            url:"/products"
        }
    ]

    const [products, setProduct] = useState([]);
    const [name, setName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [type, setType] = useState("");

    const [noPage, setNoPage] = useState(0);
    const [page, setPage] = useState(1);
    const [limit  , setLimit] = useState(9);

    const [param, setParam] = useState("");

    const [refreshPage, setRefreshPage] = useState(0);

    const handleData = (paramName, paramMinPrice, paramMaxPrice, paramType) =>{
        
        setName(paramName);
        setMinPrice(paramMinPrice);
        setMaxPrice(paramMaxPrice);
        setType(paramType);
        setRefreshPage(refreshPage + 1);
    }

    const handleDataFilter = () =>{
        if(name !== ""){
            setParam(`?name=${name}`);
            return param
        }
        if(minPrice !== "" && maxPrice !==""){
            setParam(`?minPrice=${minPrice}&maxPrice=${maxPrice}`)
            return param
        }
        if(minPrice !== "" && maxPrice ===""){
            setParam(`?minPrice=${minPrice}`)
            return param
        }
        if(minPrice === "" && maxPrice !==""){
            setParam(`?maxPrice=${maxPrice}`)
            return param
        }
        if(type !== ""){
            setParam(`?type=${type}`)
             return param
        }
        return param
    }


    const getData = async (paramUrl, paramObject = {}) =>{
        const response = await fetch(paramUrl);
        const data = await response.json();
        return data;
    }

    useEffect(() =>{
        getData("https://shop24h-be.herokuapp.com/products" + handleDataFilter())
        .then((data) =>{
            console.log(data);
            setNoPage(Math.ceil(data.data.length / limit))
            setProduct(data.data.slice(limit * (page - 1), limit*page));
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [param, page, refreshPage])  //CAN CHINH SUA LẠI KHU VUC NAY`

    const handleChangePage = (event, value) =>{
        setPage(value);
    }

    return(
        <div>
            <Header/>
            <Container>
            <BreadCrumb  
                danhMucProp = {danhMuc}
            />
                
                <Grid container marginTop={"10px"}>
                        <Grid item xs={2}>
                            <ProductFilter 
                                handleData={handleData}
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <ProductCart  productProp = {products} />
                        </Grid>
                </Grid>

                <Grid container justifyContent="flex-end">
                    <Pagination count={noPage} defaultPage={page} onChange={handleChangePage} color="error" />
                </Grid>
               
            </Container>
            <Footer/>    
        </div>
    )
}

export default ProductList;