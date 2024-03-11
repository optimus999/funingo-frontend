import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Button,

  useMediaQuery
} from '@mui/material';
import './style.scss';
import top from './images/img1.png';


const Packages = () => {
  const isMobile = useMediaQuery('(max-width:900px');

  return (
    <Grid className='Packages'>

     {/* first box */}
     <Grid   className='top'>
      <Typography height='60vh' className='heading'>Packages</Typography>
      </Grid>
      {/* first box end  */}

      

    </Grid>

      
  );
};

export default Packages;



