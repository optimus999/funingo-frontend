import {
  Grid,
  Typography,
  Box,
  Divider,
  TextField,
  Button,
  useMediaQuery
} from '@mui/material';
import HomeCarousel from '../home-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import FranchiseBackground from './images/franchise-background.png';
import Img1 from './images/img1.png';
import Img2 from './images/img2.png';
import Img3 from './images/img3.png';
import Img4 from './images/img4.png';
import Img5 from './images/img5.png';
import stroke from './images/paint-stroke.png';
import Gallery from './carousel';

import './styles.scss';
import FranchiseDataForm from '../franchise/franchise-data-form';
import { useNavigate } from 'react-router-dom';

function Home({}) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px');

  return (
    <Grid className='home'>
      <HomeCarousel />
      <Grid className='zones'>
        <img src={stroke} alt='background-img' className='background-event' />
        <Grid>
          <Grid className='data'>
            <div id='combinediv'>
              <h1 className='headmain'>Activities</h1>

              <Grid
                sx={{
                  display: { xs: 'flex', md: 'grid' },
                  gridTemplateColumns: { md: '1fr 1fr' },
                  gap: { xs: '15px', md: '50px' },
                  justifyItems: 'center',
                  maxWidth: '100vw',
                  overflow: 'auto',
                  p: '0px 10px'
                }}
              >
                <div className='example'>
                  <img src={Img1} alt='house' />
                  <h1>Zone A</h1>
                  <div className='fadedbox'>
                    <div className='title text'> Book Now </div>
                  </div>
                </div>

                <div className='example'>
                  <img src={Img2} alt='house' />
                  <h1>Zone B</h1>
                  <div className='fadedbox'>
                    <div className='title text'> Book Now </div>
                  </div>
                </div>

                <Grid className='example' display='block'>
                  <img src={Img3} alt='house' />
                  <h1>Zone C</h1>
                  <div className='fadedbox'>
                    <div className='title text'> Book Now </div>
                  </div>
                </Grid>

                <Grid className='example' display='block'>
                  <img src={Img4} alt='house' />
                  <h1>Zone D</h1>
                  <div className='fadedbox'>
                    <div className='title text'> Book Now </div>
                  </div>
                </Grid>
              </Grid>
              <Button
                variant='contained'
                sx={{
                  background: 'white',
                  boxShadow: '0px 2.5 9 0px rgba(0, 0, 0, 0.25)',
                  borderRadius: '5px',
                  color: '#2474d2',
                  fontWeight: '600',
                  fontSize: '22px',
                  mt: '50px',

                  '&:hover': {
                    background: 'white'
                  }
                }}
                onClick={e => {
                  e.preventDefault();
                  navigate('/zone');
                }}
              >
                Explore More
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid mt={{ xs: '30px', sm: '75px' }}>
        <Gallery />
      </Grid>

      <Grid className='franchise'>
        <img
          src={FranchiseBackground}
          alt='background-img'
          className='background'
        />
        <Typography className='heading'>Franchise</Typography>
        <Divider
          sx={{
            borderColor: '#D9D9D9',
            borderWidth: '5px',
            borderRadius: '5px',
            width: '250px'
          }}
        />

        <FranchiseDataForm />
      </Grid>
    </Grid>
  );
}

export default Home;
