import { Container} from "@mui/material";
import CarouselSlider from "../components/Carousel";
import Content from "../components/Content";
import Footer from "../components/Footer";
import Header from "../components/Header";

import { useState, useEffect } from "react";

const Home = () =>{

    const [refreshPage, setRefreshPage] = useState(0);
    const [numberDisplay, setNumberDisplay] = useState(9);
    const [dataDisplay, setDataDisplay] = useState([]);
    const [numberLengthData, setNumberLengthData] = useState(0);

    const dataCart = localStorage.getItem('dataCart');
    const number = localStorage.getItem('number');
        if(dataCart){
            console.log("data exist, no action");
        }else{
            localStorage.setItem('dataCart', JSON.stringify([]));
            localStorage.setItem('number', JSON.stringify(0));
            setRefreshPage(refreshPage + 1);
        }

    const getData = async (paramUrl, paramObject = {}) =>{
        const response = await fetch(paramUrl);
        const data = await response.json();
        return data;
    }


    useEffect(() =>{
        getData("https://shop24h-be.herokuapp.com/products")
        .then((data) =>{
            console.log(data);
            setNumberLengthData(data.data.length);
            setDataDisplay(data.data.splice(0 , numberDisplay));
        })
        .catch((error) =>{
            console.log(error);
        })
    }, [refreshPage])


    const handleMoreProduct = (paramIsMore) =>{
        if(!paramIsMore){
            setNumberDisplay(numberLengthData);
            setRefreshPage(refreshPage + 1);
        }
        else{
            setNumberDisplay(9);
            setRefreshPage(refreshPage + 1);
        }
    }

   
    return(
        <>
            <Header/>
            <CarouselSlider/>
                <Container>
                    
                    <Content
                        productProp = {dataDisplay}
                        handleMoreProductProp = {handleMoreProduct}
                    />

                </Container>

            <Footer/>
        
        </>
    )
}

export default Home;