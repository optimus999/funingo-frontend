import React from "react";
import { Divider, Grid, IconButton, Typography, Button } from "@mui/material";
import img1 from "./image/img3.png"
import './third.scss';
export default function first() {
  return (
      
    <Grid id="third">
      <Grid className="pic">
        <img src={img1}></img>
      </Grid>
  
      <Grid className="zone-hover">
      <Typography className='sub'>Meetings</Typography>
      <Typography className='sub2' mt='5px'>Meeting spaces designed to </Typography>
      <Typography className='sub2' mt='10px'>provide a professional</Typography>


      <Typography className='sub'>Incentive</Typography>
      <Typography className='sub2' mt='5px'>Funingo is the perfect </Typography>
      <Typography className='sub2' mt='10px'>destination </Typography>

      <Typography className='sub'>Corporate Games...</Typography>
      <Typography className='sub2' mt='5px'>Paintball (field-1)</Typography>
      <Typography className='sub2' mt='10px'>Paintball (field-2)</Typography>
      </Grid>
      
      <Grid className="zone-hover" mt="16rem" >
    

      <Button 
          variant='contained'
          sx={{
            background: '#2CC248',
            boxShadow: '0px 2.5 9 0px rgba(0, 0, 0, 0.25)',
            borderRadius: '50px',
            padding: '10px 50px',
            fontFamily: 'Luckiest Guy',
            fontSize: '20px',
            

            '&:hover': {
              background: '#1e8e33'
            }
          }}
        >
          All Coorporate
        </Button>
      </Grid>

    

    </Grid>
    
  )
}
