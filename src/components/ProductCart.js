import { Typography, Box , Card , CardActionArea, CardMedia, CardContent} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ProductCart = ({productProp}) =>{
    // const [display, setDisplay] = useState("none");
    const navigate = useNavigate();
    // const isLogin = JSON.parse(localStorage.getItem('isLogin'));
   
    const onBtnGetDetail = (element) =>{
            navigate(`/products/${element._id}`);
            localStorage.setItem('data', JSON.stringify(element))
    }
    return(
        <Box sx={{flexWrap:"wrap", display:"flex", padding:"15px"}}>
            {productProp.map((element, index) =>{
                return(          
                <Card sx={{flex:1, flexBasis: "30%", display:"flex", maxWidth:"310px", margin:"10px"}} key={index}>  
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
                
            
                )
            })}

            </Box>
    )
}

export default ProductCart;