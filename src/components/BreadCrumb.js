
import { Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom';

const BreadCrumb = ({danhMucProp}) =>{

    return (
        <>
            <Breadcrumbs separator="›" aria-label="breadcrumb" marginTop={"70px"}>
                {danhMucProp.map((element, index) =>{
                    return(
                        <Link sx={{textDecoration:"none"}} key={index} underline="hover" color="inherit" to={element.url}>{element.name}</Link>
                    )
                })}
            </Breadcrumbs>
        
        </>

    )
}

export default BreadCrumb;