import React, { useEffect, useState } from 'react';
import { validatePhoneNumber } from '../../utils/validators/validate';
import shortid from 'shortid';
import axios from 'axios';
import { apiUrl, flag_prices, payment_modes } from '../../constants';
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Button,
  Grid,
  Typography,
  FormHelperText,
  CircularProgress,
  Box
} from '@mui/material';
import { Tour } from '@mui/icons-material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListedOptionLayout from './ListedOptionLayout';
import { windowPurchase } from '../../actions/exployee';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import ConfirmationModal from './modal';
import IndividualFlag from '../booknow/individualFlags';
import { useForm } from 'react-hook-form';

const WindowPurchase = () => {
  const navigate = useNavigate();

  const [selectedSlots, setSelectedSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [gstPrice, setGstPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [packageData, setPackageData] = useState([]);
  const { token } = useSelector(state => state.userSlice);
  const [shortId, setShortId] = useState(null);
  const [paymentMode, setPaymentMode] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const [dummyFreebiesData, setDummyFreebiesData] = useState([]);

  const paymentModes = payment_modes.map(paymentMode => ({
    label: paymentMode[0].toUpperCase() + paymentMode.slice(1),
    value: paymentMode
  }));

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' }
  ];

  const handlePhoneNumberChange = e => {
    setPhoneNumber(e.target.value);
    setIsValid(true);
  };

  const handleCheckClick = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setHelperText('Invalid phone number');
      setIsValid(false);
    } else {
      setHelperText('');
      setIsValid(true);
    }

    async function fetchData() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Login or SignUp First');
        }

        const headers = {
          token: token,
          'Content-Type': 'application/json'
        };
        const response = await axios.get(
          `${apiUrl}/user/freebies/+91-${phoneNumber}`,
          {
            headers: headers
          }
        );

        if (!response.data.success) {
          throw new Error("Couldn't Fetch Freebies");
        }
        console.log('fetched freebies', response.data);
        setDummyFreebiesData(response.data.freebies);
      } catch (error) {
        console.log(error.message, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  };

  const handleCountChange = event => {
    const newCount = parseInt(event.target.value, 10);
    if (newCount < 0 || newCount > 10) {
      return;
    }
    setCount(newCount);
    setSelectedSlots(prevSelectedSlots => {
      const updatedSelectedSlots = [...prevSelectedSlots];
      if (newCount < updatedSelectedSlots.length) {
        return updatedSelectedSlots.slice(0, newCount);
      } else {
        for (let i = updatedSelectedSlots.length; i < newCount; i++) {
          updatedSelectedSlots.push({
            package: '',
            freebies: '',
            extra_red: 0,
            extra_green: 0,
            extra_yellow: 0,
            golden_flag: 0,
            name: '',
            age: '',
            gender: ''
          });
        }
        return updatedSelectedSlots;
      }
    });
  };

  const handleChange = (index, newSelectedSlot) => {
    setSelectedSlots(prev =>
      prev.map((selectedSlot, ind) => {
        if (ind === index) return newSelectedSlot;
        return selectedSlot;
      })
    );
  };

  const handlePackageSelectChange = (event, index) => {
    const selectedValue = event.target.value;
    setSelectedSlots(prevSelectedSlots => {
      const updatedSelectedSlots = [...prevSelectedSlots];
      updatedSelectedSlots[index].package = selectedValue;
      return updatedSelectedSlots;
    });
  };

  const handleFreebiesSelectChange = (event, index) => {
    const selectedValue = event.target.value;
    setSelectedSlots(prevSelectedSlots => {
      const updatedSelectedSlots = [...prevSelectedSlots];
      updatedSelectedSlots[index].freebies = selectedValue;
      return updatedSelectedSlots;
    });
  };

  const handleDeleteSelect = index => {
    setSelectedSlots(prevSelectedSlots => {
      const updatedSelectedSlots = [...prevSelectedSlots];
      updatedSelectedSlots.splice(index, 1);
      setCount(count - 1);
      return updatedSelectedSlots;
    });
    let totalPrice = 0;
    selectedSlots.forEach(selectedSlot => {
      const packagePrice = selectedSlot.package?.price || 0;
      totalPrice += packagePrice;
    });
    setGstPrice(Math.round((0.18 * totalPrice + Number.EPSILON) * 100) / 100);
    totalPrice += 0.18 * totalPrice;
    totalPrice = Math.round((totalPrice + Number.EPSILON) * 100) / 100;
    setTotalPrice(totalPrice);
  };

  const getAvailablePackageOptions = () => {
    const availableOptions = packageData;
    return availableOptions;
  };

  const getAvailableFreebiesOptions = index => {
    const selectedValues = selectedSlots.slice();
    const availableOptions = dummyFreebiesData.filter(
      option =>
        !selectedValues.some(
          selected =>
            selected.freebies === option.id &&
            selected.freebies !== '' &&
            selected.freebies !== selectedValues[index].freebies
        ) ||
        option.id === selectedValues[index].freebies ||
        option.id === ''
    );
    return availableOptions;
  };

  const handlePackageDataResponse = data => {
    setPackageData(
      data.map((item, index) => {
        const obj = {
          ...item,
          id: item?._id
        };
        return obj;
      })
    );
  };

  const handlePurchase = async callback => {
    const details = selectedSlots.map(data => ({
      ...data,
      package: data.package._id
    }));
    console.log(details);
    const response = await windowPurchase({
      total_amount: totalPrice,
      details,
      token,
      phone_no: phoneNumber ? '+91-' + phoneNumber : undefined,
      payment_mode: paymentMode.value
    });
    if (response.success) {
      setShortId(response.short_id);
      callback?.(response.short_id);
      setConfirmationModalOpen(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get(`${apiUrl}/package`);
        if (!response.data.success) {
          throw new Error("Couldn't Fetch Packages");
        }

        handlePackageDataResponse(response.data.packages);
        setIsLoading(false);
      } catch (error) {
        console.error(error.message, error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let totalPrice = 0;
    selectedSlots.forEach(selectedSlot => {
      const packagePrice = selectedSlot.package?.price || 0;
      totalPrice += packagePrice;
      totalPrice += selectedSlot.extra_green * flag_prices.green_flag_price;
      totalPrice += selectedSlot.extra_red * flag_prices.red_flag_price;
      totalPrice += selectedSlot.extra_yellow * flag_prices.yellow_flag_price;
      totalPrice += selectedSlot.golden_flag * flag_prices.golden_flag_price;
    });
    const gst = Math.round((0.18 * totalPrice + Number.EPSILON) * 100) / 100;
    setGstPrice(gst);
    setTotalPrice(totalPrice + gst);
  }, [selectedSlots]);

  return (
    <Grid
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <ConfirmationModal
        open={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        handlePurchase={handlePurchase}
      />
      {isLoading && (
        <Grid
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
        >
          <CircularProgress sx={{ color: 'white' }} />
        </Grid>
      )}
      <Grid
        sx={{
          width: { xs: '100%', lg: '60%' },
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}
      >
        <Grid
          display={'flex'}
          width={'100%'}
          justifyContent={'space-between'}
          sx={{
            gap: '15px',
            marginBottom: '25px',
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <FormControl sx={{ width: { xs: '100%', lg: '50%' } }}>
            <TextField
              label='Select the number of options'
              type='number'
              value={count}
              onChange={handleCountChange}
            />
          </FormControl>
          <FormControl sx={{ width: { xs: '100%', lg: '50%' } }}>
            <TextField
              label='Check Freebies via Number'
              type='number'
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              InputProps={{
                sx: {
                  height: '100%',
                  '& input': {
                    border: '0px !important',
                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button':
                      {
                        WebkitAppearance: 'none',
                        margin: 0
                      }
                  }
                },

                endAdornment: (
                  <Button
                    sx={{
                      background: '#257ac4',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#257ac4',
                        color: 'white'
                      },
                      border: 'none',
                      outline: 'none'
                    }}
                    onClick={handleCheckClick}
                  >
                    Check
                  </Button>
                )
              }}
            />
            <FormHelperText error={!isValid}>
              {!isValid && helperText}
            </FormHelperText>
          </FormControl>
        </Grid>
        {count > 0 &&
          selectedSlots.map((selectedSlot, index) => (
            <Grid
              key={index}
              sx={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginBottom: '15px'
              }}
            >
              <hr width={'100%'} />
              <Grid
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Roboto Mono, monospace',
                    fontSize: { xs: '15px', lg: '20px' },
                    letterSpacing: '2px'
                  }}
                >
                  {`TICKET NUMBER : ${index + 1}  Price -> Rs ${
                    selectedSlot?.package?.price
                      ? parseInt(selectedSlot.package.price)
                      : 0
                  }`}
                </Typography>
                <Button
                  variant='outlined'
                  onClick={() => handleDeleteSelect(index)}
                  sx={{
                    height: '40px',
                    width: '20px',
                    '&:hover': {
                      //   backgroundColor: "#f52047",
                      color: '#f52047',
                      outline: 'none',
                      border: 'none'
                    },
                    outline: 'none',
                    border: 'none',
                    borderRadius: '50%'
                  }}
                >
                  <DeleteForeverIcon sx={{ borderRadius: '50%' }} />
                </Button>
              </Grid>

              <Grid
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: '15px', md: '10px' }
                }}
              >
                <Grid
                  sx={{
                    width: { xs: '100%', lg: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Select Package</InputLabel>
                    <Select
                      label='Select Package'
                      value={
                        selectedSlot?.package === '' ? '' : selectedSlot.package
                      }
                      onChange={e => handlePackageSelectChange(e, index)}
                    >
                      <MenuItem value=''>
                        <em>
                          {getAvailablePackageOptions &&
                          getAvailablePackageOptions.length === 0
                            ? 'No Packages Available Now'
                            : 'None'}
                        </em>
                      </MenuItem>
                      {getAvailablePackageOptions(index).map((option, i) => (
                        <MenuItem key={i} value={option}>
                          <ListedOptionLayout data={option} boolFlag={true} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  sx={{
                    width: { xs: '100%', lg: '50%' },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Select Freebies</InputLabel>
                    <Select
                      label='Select Freebies'
                      value={selectedSlot.freebies}
                      onChange={e => handleFreebiesSelectChange(e, index)}
                    >
                      <MenuItem value=''>
                        <em>
                          {getAvailableFreebiesOptions &&
                          getAvailableFreebiesOptions.length === 0
                            ? 'No Freebies Available Now'
                            : 'None'}
                        </em>
                      </MenuItem>
                      {getAvailableFreebiesOptions(index).map((option, i) => (
                        <MenuItem key={i} value={option.id}>
                          <ListedOptionLayout data={option} boolFlag={false} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                width={'100%'}
              >
                <Grid className='input-freebies' width={'100%'}>
                  <Typography mb='5px'>Add Individual Flags</Typography>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <IndividualFlag
                      label={
                        <Tour
                          sx={{
                            color: '#fa1942'
                          }}
                        />
                      }
                      mode='dark'
                      value={selectedSlot.extra_red}
                      onChange={val =>
                        handleChange(index, {
                          ...selectedSlot,
                          extra_red: val
                        })
                      }
                    />
                    <IndividualFlag
                      label={
                        <Tour
                          sx={{
                            color: '#e7e710'
                          }}
                        />
                      }
                      mode='dark'
                      value={selectedSlot.extra_yellow}
                      onChange={val =>
                        handleChange(index, {
                          ...selectedSlot,
                          extra_yellow: val
                        })
                      }
                    />
                    <IndividualFlag
                      label={
                        <Tour
                          sx={{
                            color: '#76de9a'
                          }}
                        />
                      }
                      mode='dark'
                      value={selectedSlot.extra_green}
                      onChange={val =>
                        handleChange(index, {
                          ...selectedSlot,
                          extra_green: val
                        })
                      }
                    />
                  </Grid>
                  <Grid mt='15px'>
                    <Typography className='book-now-label' fontSize={'16px'}>
                      For Trampoline Park{' '}
                      <Typography component={'span'} fontSize={'12px'}>
                        (Can be selected without other packages)
                      </Typography>
                    </Typography>
                    <IndividualFlag
                      label={
                        <Tour
                          sx={{
                            color: '#FFD700'
                          }}
                        />
                      }
                      mode='dark'
                      value={selectedSlot.golden_flag}
                      onChange={val =>
                        handleChange(index, {
                          ...selectedSlot,
                          golden_flag: val
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid width={'100%'}>
                <Typography mb='5px'>Optional Fields</Typography>
                <Grid
                  display={'flex'}
                  justifyContent={'space-between'}
                  mb={'15px'}
                  flexDirection={'row'}
                  width={'100%'}
                  gap='20px'
                >
                  <Grid flexGrow={1}>
                    <TextField
                      name='name'
                      type='text'
                      placeholder='Name'
                      value={selectedSlot.name}
                      onChange={e =>
                        handleChange(index, {
                          ...selectedSlot,
                          name: e.target.value
                        })
                      }
                      required={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      name='age'
                      type='text'
                      placeholder='Age'
                      value={selectedSlot.age}
                      onChange={e =>
                        handleChange(index, {
                          ...selectedSlot,
                          age: e.target.value
                        })
                      }
                      required={true}
                      fullWidth
                    />
                  </Grid>

                  <Grid>
                    <ReactSelect
                      id='gender'
                      name='gender'
                      value={genderOptions.find(
                        option => option?.value === selectedSlot.gender
                      )}
                      onChange={e => {
                        handleChange(index, {
                          ...selectedSlot,
                          gender: e?.value
                        });
                      }}
                      placeholder='Gender'
                      styles={{
                        control: provided => ({
                          ...provided,
                          background: 'white',
                          height: '40px'
                        }),
                        input: provided => ({
                          ...provided,
                          color: 'black',
                          '& input': {
                            height: '30px'
                          }
                        }),
                        ValueContainer: provided => ({
                          ...provided
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          color: state.isSelected ? 'white' : 'black'
                        })
                      }}
                      required={true}
                      isSearchable={false}
                      options={genderOptions}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}

        <Grid
          sx={{
            width: '100%',
            height: '150px',
            backgroundColor: 'beige',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: 'black',
            padding: '15px 30px',
            marginBottom: '25px',
            borderRadius: '5px'
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '22px', lg: '15px' },
              fontWeight: '600',
              letterSpacing: '3px'
            }}
          >
            PAYMENT SUMMARY
          </Typography>
          <Grid
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography>Subtotal </Typography>
            <Typography>Rs {totalPrice - gstPrice} </Typography>
          </Grid>

          <Grid
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
          >
            <Typography>Discount </Typography>
            <Typography>Rs {discount} </Typography>
          </Grid>
          <Grid
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            paddingBottom={'3px'}
          >
            <Typography>Gst@18% </Typography>
            <Typography>Rs {gstPrice} </Typography>
          </Grid>

          <hr width={'100%'} />

          <Grid
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            paddingTop={'5px'}
          >
            <Typography>Total </Typography>
            <Typography>Rs {totalPrice - discount}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Grid mb='20px'>
            <ReactSelect
              options={paymentModes}
              onChange={e => setPaymentMode(e)}
              placeholder='Payment mode'
              value={paymentMode}
              styles={{
                container: styles => ({
                  ...styles,
                  flexBasis: '300px'
                })
              }}
              isClearable={false}
            />
          </Grid>
          {shortId ? (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                mb: '10px'
              }}
            >
              <Typography>
                Your ticket is booked. TicketId: {shortId}
              </Typography>
              <Button
                onClick={() => navigate(`/we/get-qr-tickets?tid=${shortId}`)}
              >
                Generate QR Tickets
              </Button>
            </Box>
          ) : (
            <Button
              onClick={() => setConfirmationModalOpen(true)}
              variant='contained'
              fullWidth
            >
              Buy Now
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WindowPurchase;
