import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import meetingHeading from './images/meetings.png';
import incentives from './images/incentives.png';
import meetingMain from './images/meetingsmain.webp';
import incentivesmain from './images/incentivesmain.jpeg';
import corporatesmain from './images/corporatesmain.webp';
import corporategames from './images/corporategames.png';
import bg3Light from './images/bg3Light.png';
import bg3 from './images/bg3.png';
import './styles.scss';
import { useNavigate } from 'react-router';
import { scrollToBottom } from '../../utils';

const corporateData = [
  {
    name: 'meeting',
    heading: meetingHeading,
    main: meetingMain
  },
  {
    name: 'incentives',
    heading: incentives,
    main: incentivesmain
  },
  {
    name: 'corporategame',
    heading: corporategames,
    main: corporatesmain
  }
];

const Corporate = () => {
  const navigate = useNavigate();
  return (
    <Grid className='corporate'>
      {/* {First Box} */}
      <Grid height='70vh' className='top'>
        <Typography height='60vh' className='heading'>
          CORPORATE
        </Typography>
      </Grid>

      {corporateData.map((data, i) => (
        <Grid
          key={data.name}
          className='top2'
          mt='70px'
          flexDirection={i % 2 === 0 ? 'row' : 'row-reverse'}
        >
          <img
            src={i % 2 === 0 ? bg3 : bg3Light}
            alt='background-img'
            className='background-corp'
          />
          <Grid className='first'>
            <Box
              component={'img'}
              sx={{ borderRadius: '10px' }}
              className='main-img'
              src={data.main}
              alt={'Corporate Event'}
            />
          </Grid>
          <Grid
            className='second'
            width={{ xs: '95%', md: '40vw' }}
            marginRight={{ md: i % 2 ? '100px' : '0px' }}
          >
            <Grid className='top-box'>
              <img className='heading-img' src={data.heading} alt={'Heading'} />
            </Grid>
            <Grid className='content-box'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
              inventore repellat commodi delectus error animi voluptatem, maxime
              consectetur culpa perferendis tenetur, velit nam ullam rem dicta
              nisi provident laborum quasi!
            </Grid>
            <Button
              variant='contained'
              sx={{
                background: '#2CC248',
                boxShadow: '0px 2.5 9 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '50px',
                padding: '20px 50px',
                fontFamily: 'Luckiest Guy',
                fontSize: '24px',
                marginTop: '20px',
                marginLeft: '20px',

                '&:hover': {
                  background: '#1e8e33'
                }
              }}
              onClick={() => {
                scrollToBottom();
              }}
            >
              <p> Book Now </p>
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Corporate;
