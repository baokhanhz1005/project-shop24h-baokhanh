import { Input, Grid, FormGroup, FormControlLabel, Checkbox, Button , Box, RadioGroup, Radio} from "@mui/material";
import { useState } from "react";
import { Label } from "reactstrap";



const ProductFilter = ({handleData}) =>{

    const [name, setName] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [type, setType] = useState("");


    const onBtnFilterData = () =>{
        handleData(name, minPrice, maxPrice, type);
    }
    return(
        <> 
        <Box sx={{borderRight: 1, paddingRight:"20px", borderColor:"#9999"}}>
            <Grid container>
                <Label><b>Product name</b></Label>
                <Input value={name} onChange={(event)=>{setName(event.target.value)}} disableUnderline placeholder="name" fullWidth sx={{border:1, padding:"3px", borderColor:"#9999", borderRadius:"10px"}} />
            </Grid>

            <Grid container justifyContent="space-between" marginY={5}>
                <Grid item xs={12}>
                    <Label><b>Price</b></Label>
                </Grid>
                <Grid item xs={5}>
                    <Input value={minPrice} onChange={(event)=>{setMinPrice(event.target.value)}} disableUnderline placeholder="(min)"  fullWidth sx={{border:1, padding:"3px", borderColor:"#9999", marginRight:"3px", borderRadius:"10px"}} />
                </Grid>
                <Grid item xs={1}>
                     --
                </Grid>
                <Grid item xs={5}>
                    <Input value={maxPrice} onChange={(event)=>{setMaxPrice(event.target.value)}}  disableUnderline placeholder="(max)"  fullWidth sx={{border:1, padding:"3px", borderColor:"#9999", borderRadius:"10px"}} />
                </Grid>
            </Grid>


            <Grid container>
                <FormGroup>
                <Label fullWidth><b>Categorys</b></Label>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={type}
                    onChange={(event) =>{setType(event.target.value)}}
                >                 
                    <FormControlLabel value="phone" control={<Radio/>} label="Phone"/>
                    <FormControlLabel value="headphone" control={<Radio/>} label="Headphone"/>
                    <FormControlLabel value="bag" control={<Radio/>} label="Bag"/>
                    <FormControlLabel value="watch" control={<Radio/>} label="Watch"/>
                    <FormControlLabel value="laptop" control={<Radio/>} label="Laptop"/>
                    </RadioGroup> 
                </FormGroup>
            </Grid>

            <Grid container marginTop={5}>
            <FormGroup>
                <Label marginBottom="-5px"><b>Color(Updating)</b></Label>                  
                 <FormControlLabel disabled control={<Checkbox/>} label="Red"/>
                 <FormControlLabel disabled control={<Checkbox/>} label="Green"/>
                 <FormControlLabel disabled control={<Checkbox/>} label="Blue"/>
                 <FormControlLabel disabled control={<Checkbox/>} label="Black"/>
            </FormGroup>
            </Grid>

            <Grid container marginTop={3}>
                <Button onClick={onBtnFilterData} variant="contained" sx={{bgcolor:"#D10024"}} fullWidth>Filter Data</Button>
            </Grid>

        </Box>

        </>
    )
}

export default ProductFilter;