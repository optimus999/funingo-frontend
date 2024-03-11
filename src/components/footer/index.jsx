import React from 'react';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import playerImg from '../../utils/images/player.png';
import FuningoStrip from './images/funingo-strip.png';

import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import './styles.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FreebiesMascot from '../freebies-modal/freebies-mascot';

const Footer = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const { phone_numbers = [] } = useSelector(state => state.appSlice);
  const { isLoggedIn = false } = useSelector(state => state.userSlice);

  return (
    <Grid
      className='footer'
      m={{ xs: '70px 20px', lg: '70px 220px' }}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      {/* section 1 */}
      <Grid
        className='footer-top-box'
        display={{ xs: 'flex' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={'center'}
      >
        <Grid className='container-footer' display={'flex'}>
          <Typography className='heading'>Contact Us</Typography>
          {phone_numbers.map(contact => (
            <Typography key={contact._id}>
              {contact.name}&nbsp;-&nbsp;{contact.number}
            </Typography>
          ))}
        </Grid>
        <Grid className='container-footer' display={{ xs: 'none', md: 'flex' }}>
          {isLoggedIn ? (
            <FreebiesMascot small={true} backgroundFilter={false} />
          ) : (
            <img src={playerImg} alt={'Mascot'} style={{ height: '60%' }} />
          )}
        </Grid>
        <Grid className='container-footer' display={{ xs: 'none', md: 'flex' }}>
          <Typography className='heading'>Events</Typography>
          <Typography>Birthday </Typography>
          <Typography>Baby Shower </Typography>
          <Typography>Pre Wedding</Typography>
          <Typography>Kitty Party</Typography>
        </Grid>
        <Grid className='container-footer' display={{ xs: 'none', md: 'flex' }}>
          <Typography className='heading'>Corporate</Typography>
          <Typography>Meetings</Typography>
          <Typography>Incentives</Typography>
          <Typography>Corporate Game </Typography>
        </Grid>
      </Grid>
      {isMobile && (
        <Grid className='container-footer' display={'flex'}>
          {isLoggedIn ? (
            <FreebiesMascot backgroundFilter={false} />
          ) : (
            <img
              src={playerImg}
              alt={''}
              style={{ height: '80%', marginTop: '25px' }}
            />
          )}
        </Grid>
      )}
      {/* <Divider
        sx={{
          borderWidth: '1px',
          width: '100%',
          my: '20px'
        }}
      /> */}
      <Box
        component={'img'}
        src={FuningoStrip}
        width={{ xs: '100vw', sm: '100%' }}
        height={{ md: 'auto' }}
        mt='20px'
      />
      <Divider
        sx={{
          borderWidth: '1px',
          width: '100%',
          mt: '20px'
        }}
      />
      <Grid
        display={'flex'}
        alignItems={'center'}
        minWidth={'300px'}
        justifyContent={'center'}
        py='10px'
      >
        <Typography>Follow Us:</Typography>
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <YouTubeIcon />
        </IconButton>
        <IconButton>
          <LinkedInIcon />
        </IconButton>

        <Divider orientation='vertical' sx={{ mx: '20px' }} />
        <Typography
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
          onClick={() => navigate('/careers')}
        >
          Careers
        </Typography>
      </Grid>
      <Divider
        sx={{
          borderWidth: '1px',
          width: '100%'
        }}
      />
      <Grid mt='10px'>
        <Typography
          variant='subtitle1'
          fontWeight={'600'}
          color='#555F68'
          fontSize={'12px'}
        >
          Copyright &nbsp;
          {/* &#169; */}
          2023 Funingo Limited | All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
