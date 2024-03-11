import React, { useEffect, useState } from 'react';
import {
  Box,
  Dialog,
  Grid,
  Typography,
  styled,
  Button,
  IconButton
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  closePremiumSubscriptionModal,
  openAuthModal
} from '../../utils/store/slice/appSlice';
import PaymentButton from './payment';
import FuningoLightLogo from '../../assets/funingo-logo-light.svg';
import Mascot from '../../assets/mascot.png';
import Bar from './images/bar.png';
import { Clear } from '@mui/icons-material';

const TitleBox = styled(Box)(({ active }) => ({
  flexGrow: 1,
  background: 'linear-gradient(25deg, #f7f7f7, #BEBEBE, #f7f7f7, #969696)',
  height: '45px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderBottom: active ? '1px solid black' : 'none'
}));
const Title = styled(Typography)({
  fontWeight: '600',
  lineHeight: '15px'
});

const PremiumSubscriptionModal = () => {
  const { isPremiumSubscriptionModalOpen } = useSelector(
    state => state.appSlice
  );
  // const { isLoggedIn } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const [selectedPremium, setSelectedPremium] = useState('50%$6_months');
  const handleClose = () => dispatch(closePremiumSubscriptionModal());

  return (
    <Dialog
      open={isPremiumSubscriptionModalOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          margin: '10px',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }}
      sx={{
        background: '#000000ab'
      }}
    >
      <Grid
        width={{
          xs: '370px',
          sm: '450px'
        }}
        sx={{
          background: 'linear-gradient(250deg, #132234, #05080E)',
          position: 'relative',
          borderRadius: '0px'
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px'
          }}
          onClick={handleClose}
        >
          <Clear sx={{ color: 'white' }} />
        </IconButton>
        <Box
          component='img'
          src={FuningoLightLogo}
          sx={{
            width: '90px',
            position: 'absolute',
            left: '30px',
            top: '0px'
          }}
        />
        <Grid marginTop='65px' p='10px'>
          <Typography
            sx={{
              color: 'white',
              fontWeight: '700',
              textAlign: 'center',
              fontSize: '18px'
            }}
          >
            Funingo Platinum Plans
          </Typography>
          <Typography
            sx={{
              color: '#FFE20C',
              fontWeight: '600',
              textAlign: 'center',
              fontSize: '14px'
            }}
          >
            MORE FUNINGO, MORE FUN, WITH MORE SAVINGS!
          </Typography>
          <Box
            sx={{
              width: '250px',
              height: '2px',
              background: 'white',
              margin: '10px auto 25px',
              borderRadius: '75%'
            }}
          />

          <Grid
            sx={{
              width: '320px',
              margin: '0px auto 20px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Grid
              sx={{
                background: 'linear-gradient(92deg, #17273A, #0e1b2b)',
                m: '4px',
                p: '15px 15px 15px 25px',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(349deg, #f7f7f7, #686b6d)',
                  position: 'absolute',
                  width: '40px',
                  height: '40px',
                  transform: 'rotate(45deg)',
                  top: '-20px',
                  left: '-20px'
                }}
              />
              <Box
                sx={{
                  background: 'linear-gradient(86deg, #f7f7f7, #686b6d)',
                  position: 'absolute',
                  width: '40px',
                  height: '40px',
                  transform: 'rotate(45deg)',
                  bottom: '-20px',
                  left: '-20px'
                }}
              />
              <Typography color='white' flexGrow={1} fontSize='12px'>
                Funingo Platinum offers supirior deals to all the adventure
                lovers who enjoy having a&nbsp;
                <Typography
                  component='span'
                  sx={{ color: '#FFE20C', fontWeight: '600' }}
                >
                  'Funingo Time'
                </Typography>
                &nbsp; frequently with their families. With multiple plans
                crafter for benefiting our customers, we aim to provide bliss of
                savings with a package of family Joy
              </Typography>
              <Box
                component='img'
                src={Mascot}
                sx={{
                  width: '130px',
                  height: '200px',
                  alignSelf: 'flex-end'
                }}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              background: 'white',
              margin: '20px',
              width: 'calc(100% - 40px)',
              borderRadius: '10px',
              border: '2px solid #FFE20C',
              mt: '30px'
            }}
          >
            <Grid
              sx={{
                display: 'flex'
              }}
            >
              <TitleBox
                sx={{
                  borderTopLeftRadius: '8px'
                }}
                active={selectedPremium === '50%$6_months'}
                onClick={() => setSelectedPremium('50%$6_months')}
              >
                <Title>6 Months</Title>
                <Title>50% Off Plan</Title>
              </TitleBox>
              <TitleBox
                active={selectedPremium === '50%$1_year'}
                onClick={() => setSelectedPremium('50%$1_year')}
              >
                <Title>1 Year</Title>
                <Title>50% Off Plan</Title>
              </TitleBox>
              <TitleBox
                sx={{
                  borderTopRightRadius: '8px'
                }}
                active={selectedPremium === '50%$100_years'}
                onClick={() => setSelectedPremium('50%$100_years')}
              >
                <Title>Life Long</Title>
                <Title>50% Off Plan</Title>
              </TitleBox>
            </Grid>
            <Grid
              sx={{
                p: '20px 15px',
                display: 'flex',
                gap: '20px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: '1px 0px'
                }}
              >
                <Box
                  component={'img'}
                  src={Bar}
                  sx={{
                    height: '50px',
                    m: 'auto'
                  }}
                />
              </Box>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  Every time you book, you get a 50% off on Final Ticket value
                </Typography>
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  With each Subscriber addition, get an additional 10% off*
                </Typography>
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  Exclusive Special gifts
                </Typography>
              </Grid>
            </Grid>
            <Grid p='5px 20px 20px'>
              <PaymentButton
                disabled={selectedPremium.split('$')?.[0] !== '50%'}
                premium_data={{
                  expiry: selectedPremium.split('$')?.[1],
                  premium_type: selectedPremium.split('$')?.[0],
                  quantity: 1
                }}
                handleClose={handleClose}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              background: 'white',
              margin: '20px',
              width: 'calc(100% - 40px)',
              borderRadius: '10px',
              border: '2px solid #FFE20C'
            }}
          >
            <Grid
              sx={{
                display: 'flex'
              }}
            >
              <TitleBox
                sx={{
                  borderTopLeftRadius: '8px'
                }}
                active={selectedPremium === '100%$6_months'}
                onClick={() => setSelectedPremium('100%$6_months')}
              >
                <Title>6 Months</Title>
                <Title>Unlimited</Title>
              </TitleBox>
              <TitleBox
                active={selectedPremium === '100%$1_year'}
                onClick={() => setSelectedPremium('100%$1_year')}
              >
                <Title>1 Year</Title>
                <Title>Unlimited</Title>
              </TitleBox>
              <TitleBox
                sx={{
                  borderTopRightRadius: '8px'
                }}
                active={selectedPremium === '100%$100_years'}
                onClick={() => setSelectedPremium('100%$100_years')}
              >
                <Title>Life Long</Title>
                <Title>Unlimited</Title>
              </TitleBox>
            </Grid>
            <Grid
              sx={{
                p: '20px 15px',
                display: 'flex',
                gap: '20px'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: '1px 0px'
                }}
              >
                <Box
                  component={'img'}
                  src={Bar}
                  sx={{
                    height: '50px',
                    m: 'auto'
                  }}
                />
              </Box>
              <Grid
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  Enjoy free booking any number of times in the desired time
                </Typography>
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  Unlimited Activities, Unlimited Times
                </Typography>
                <Typography fontSize={'12px'} lineHeight={'12px'}>
                  Free access to new additions also
                </Typography>
              </Grid>
            </Grid>
            <Grid p='5px 20px 20px'>
              <PaymentButton
                disabled={selectedPremium.split('$')?.[0] !== '100%'}
                premium_data={{
                  expiry: selectedPremium.split('$')?.[1],
                  premium_type: selectedPremium.split('$')?.[0],
                  quantity: 1
                }}
                handleClose={handleClose}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default PremiumSubscriptionModal;
