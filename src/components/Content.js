import { Typography, Grid , Button, Box , Card , CardActionArea, CardMedia, CardContent, CircularProgress} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Content = ({productProp, handleMoreProductProp}) =>{

    const [isMore, setIsMore] = useState(false);
    const [nameButton, setNameButton] = useState("SHOW MORE");

    console.log(productProp)
    const navigate = useNavigate();

    const onBtnGetDetail = (element) =>{
        navigate(`/products/${element._id}`);
        localStorage.setItem('data', JSON.stringify(element))
    }

    const onBtnShowMore = () =>{
        if(!isMore){
            handleMoreProductProp(isMore);
            setNameButton("SHOW LESS");
            setIsMore(true);
        }else{
            handleMoreProductProp(isMore);
            setNameButton("SHOW MORE");
            setIsMore(false);
        }
    }
    <CircularProgress color="success"/>
    return(
        <>
            <Typography variant="h5" align="center" fontWeight={750} paddingY={5} >
                NEW PRODUCTS 
            </Typography>

            <Box sx={{flexWrap:"wrap", display:"flex"}}>
            {!productProp ? <CircularProgress color='success'/> :
            productProp.map((element, index) =>{
                return(
                    <>
                    <Card sx={{flex:1, flexBasis: "30%", display:{xs:'none',sm:'flex', md:'flex'}, maxWidth:"384px", margin:"10px"}} key={index}>  
                            <CardActionArea sx={{display:"flex", flexDirection:"column"}} onClick={()=>{onBtnGetDetail(element)}}>
                                <CardMedia
                                    component="img"
                                    image={element.imageUrl}
                                    alt="green iguana"
                                    sx={{width:"200px", height:"200px", objectFit:"contain"}}
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
                    <Card sx={{flex:1, flexBasis: "50%", display:{xs:'flex',sm:'none', md:'none'}, maxWidth:"384px", margin:"10px"}} key={index}>  
                            <CardActionArea sx={{display:"flex", flexDirection:"column"}} onClick={()=>{onBtnGetDetail(element)}}>
                                <CardMedia
                                    component="img"
                                    image={element.imageUrl}
                                    alt="green iguana"
                                    sx={{width:"200px", height:"200px", objectFit:"contain"}}
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
                    </>
                )
            })}

            </Box>

            
        
            <Grid container justifyContent="center" marginTop={3}>
                <Button onClick={onBtnShowMore}  variant="contained" sx={{bgcolor:"#D10024"}}><b>{nameButton}</b></Button>
            </Grid>
            
        </>
    )
}

export default Content;