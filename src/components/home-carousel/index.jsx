import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './styles.scss';
import { Cursor } from 'react-simple-typewriter';
import Slide0 from './images/slide-0.png';
import Slide1 from './images/slide-1.png';
import { Box, Grid, Button } from '@mui/material';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { openPremiumSubscriptionModal } from '../../utils/store/slice/appSlice';

const HomeCarousel = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    images: { banner }
  } = useSelector(state => state.appSlice);

  function useTypewriter({ words, loop, autoPlay }) {
    const [textIndex, setTextIndex] = useState(0);
    const [text, setText] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setText(words[textIndex]);
        setTextIndex(prevIndex => (prevIndex + 1) % words.length);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [words, loop]);

    return { text };
  }

  const { text } = useTypewriter({
    words: ['EXCITEMENT', 'THRILL', 'ENJOYMENT'],
    loop: {}
  });

  useEffect(() => {
    setTimeout(() => {
      setAutoPlay(true);
    }, 3500);
  }, []);

  return (
    <Grid position={'relative'}>
      {showText && (
        <Grid
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-70%)',
            zIndex: '10',
            left: '50px',
            width: 'fit-content',
            display: { xs: currentSlide === 0 ? 'none' : 'flex', md: 'flex' },
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Grid className='car-top-heading'>Get Ready For</Grid>
          {/* dynamic text */}
          <span className='car-bottom-heading '>
            {text} <Cursor />
          </span>
        </Grid>
      )}
      <Grid
        onClick={() =>
          currentSlide === 1 && dispatch(openPremiumSubscriptionModal())
        }
      >
        <Carousel
          autoPlay={autoPlay}
          centerMode={true}
          centerSlidePercentage={100}
          emulateTouch={true}
          infiniteLoop={true}
          interval={2500}
          showArrows={false}
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          stopOnHover={false}
          onChange={curr => {
            if (curr === 1) {
              setShowText(false);
              setTimeout(() => {
                setCurrentSlide(curr);
              }, 500);
            } else {
              setTimeout(() => {
                setShowText(true);
              }, 500);
              setCurrentSlide(curr);
            }
          }}
        >
          <Box maxHeight={'calc(100vh - 84px)'}>
            <img src={Slide0} alt={'slide 0'} />
          </Box>
          <Box maxHeight={'calc(100vh - 84px)'}>
            <img src={Slide1} alt={'slide 1'} />
          </Box>
          {banner?.map(img => (
            <Box maxHeight={'calc(100vh - 84px)'} key={img._id}>
              <img src={img.url} alt={'banner image'} />
            </Box>
          ))}
        </Carousel>
      </Grid>

      {showText && (
        <Grid>
          <Grid className='car-bottom-btn'>
            <Button
              className='car-bottom-botton'
              variant='contained'
              sx={{
                boxShadow: '2px 2.5 9 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '50px',
                padding: '10px 30px',
                fontFamily: 'Luckiest Guy',
                fontSize: '34px',
                fontWeight: '400',
                lineHeight: '34px',
                letterSpacing: '0em',
                textAlign: 'left',
                '&:hover': {
                  background: '#e1dc3e'
                }
              }}
              onClick={() => navigate('/book')}
            >
              Book Now
            </Button>
          </Grid>
          <Grid className='car-bottom-refer'>Refer & Get 50% OFF</Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default HomeCarousel;
