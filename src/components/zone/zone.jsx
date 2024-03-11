import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import img1 from './images/top.png';
import './style.scss';
import img2 from './images/zone1.png';
import img3 from './images/zone2.png';
import { Tour } from "@mui/icons-material";
import inflatable from '../../assets/Meltdown.jpeg'
import img4 from './images/zone3.png';
import climb from '../../assets/quoridor-giant-board-game-2-lg.jpg'
import race from '../../assets/rc-race-transformed.jpeg'
import rc from '../../assets/hoping race.png'
import car from '../../assets/kids go cart.png'
import bg1 from './images/top2.png';
import fhek from '../../assets/throw.jpg'
import game from "../../assets/quoridor-giant-board-game-2-lg.jpg"
import court from '../../assets/Segway image edit.png'
import gg from '../../assets/Chess-edit-image.jpg'

import { useNavigate } from 'react-router';

const zoneData = [
  {
    name: 'Zone 1',
    subhead: 'Trampoline Park',
    top1: img2,
    Activity1: "Trampoline Park",
    Activity1Prop: {
      red: 0,
      green: 0,
      yellow: 0
    },
    Activity2: "VR Games",
    Activity2Prop: {
      red: 1,
      green: 0,
      yellow: 1
    },
    Activity3: "",
    Activity4: "",
    Activity5: "",
    Activity6: "",


  },
  {
    name: 'Zone 2',
    subhead: 'Inflatable Zone ',
    top1: inflatable,
    Activity1: "Obstable Course",
    Activity1Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity2: "Bull",
    Activity2Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity3: "Sumo",
    Activity3Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity4: "Meltdown",
    Activity4Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 3',
    subhead: 'Paintball & Zorbie Fight ',
    top1: img4,
    Activity1: "Zorbie Fight",
    Activity1Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity2: "Paint ball kids ",
    Activity2Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity3: "Paint ball Adult",
    Activity3Prop: {
      red: 2,
      green: 0,
      yellow: 0
    },
    Activity4: "",
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 4',
    subhead: 'Tower Activities ',
    top1: climb,
    Activity1: "Gaint Swing",
    Activity1Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity2: "Rock Climbing",
    Activity2Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity3: "Cycle Zip",
    Activity3Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity4: "Net Climbing",
    Activity4Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 5',
    subhead: 'Race Track ',
    top1: race,
    Activity1: "Go kart Peddal Race",
    Activity1Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity2: "Rc race",
    Activity2Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity3: "Segway",
    Activity3Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity4: "Drifter",
    Activity4Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity5: "Hoverboat",
    Activity5Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity6: "",
  },
  {
    name: 'Zone 6',
    subhead: 'Sky Zone ',
    top1: car,
    Activity1: "Rc level 1",
    Activity1Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity2: "Rc level 2",
    Activity2Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity3: "Rocket Ejector",
    Activity3Prop: {
      red: 1,
      green: 0,
      yellow: 0
    },
    Activity4: "",
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 7',
    subhead: 'Fun Zone ',
    top1: fhek,
    Activity1: "Archery",
    Activity1Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity2: "Bhalla Fek",
    Activity2Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity3: "Human Foosbal",
    Activity3Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity4: "360 Cycle",
    Activity4Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity5: "Team 360",
    Activity5Prop: {
      red: 0,
      green: 0,
      yellow: 1
    },
    Activity6: "Selfie 360",
    Activity6Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
  },
  {
    name: 'Zone 8',
    subhead: 'Brain-box ',
    top1: img3,
    Activity1: "",
    Activity2: "",
    Activity3: "",
    Activity4: "",
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 9',
    subhead: 'Giant Games ',
    top1: gg,
    Activity1: "Giant Tic Tae Toe",
    Activity1Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },

    Activity2: "Giant Chess",
    Activity2Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity3: "Ring Toss",
    Activity3Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity4: "Giant snake and Ladder",
    Activity4Prop: {
      red: 0,
      green: 1,
      yellow: 0
    },
    Activity5: "",
    Activity6: "",
  },
  {
    name: 'Zone 10',
    subhead: 'Food Court ',
    top1: court,
    Activity1: "Brand 1",
    Activity2: "Brand 2",
    Activity3: "Brand 3",
    Activity4: "Brand 4",
    Activity5: "",
    Activity6: "",
  }

];

const Zone = () => {
  const navigate = useNavigate();
  return (
    <Grid className='homes'>
      {/* first box */}
      <Grid height='70vh' className='top'>
        <Typography height='60vh' className='heading'>
          Activity Zones
        </Typography>
      </Grid>
      {/* first box end  */}

      {/* second box */}
      {zoneData.map((data, i) => (
        <Grid className='top2' mt='30px' key={i}>
          <img src={bg1} alt='background-img' className='background-event' />
          <Grid className='first'>
            <Typography className='sub'>{data.name}</Typography>
            <Typography className='sub1'>{data.subhead}</Typography>


            {data.Activity1 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
                gap="10px"
                paddingX={"4px"}
                alignItems={"center"}>
                Activity 1 - {data.Activity1}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity1Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity1Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity1Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity1Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity1Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity1Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>
              </Typography>
            )}


            {data.Activity2 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
                gap="10px"
                paddingX={"4px"}
                alignItems={"center"}>
                Activity 2 - {data.Activity2}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity2Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity2Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity2Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity2Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity2Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity2Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>
              </Typography>
            )}



            {data.Activity3 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
                gap="10px"
                paddingX={"4px"}
                alignItems={"center"}>
                Activity 3 - {data.Activity3}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity3Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity3Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity3Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity3Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity3Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity3Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>
              </Typography>
            )}



            {data.Activity4 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
                gap="10px"
                paddingX={"4px"}
                alignItems={"center"}>
                Activity 4 - {data.Activity4}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity4Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity4Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity4Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity4Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity4Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity4Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>

              </Typography>
            )}


            {data.Activity5 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
                gap="10px"
                paddingX={"4px"}
                alignItems={"center"}>
                Activity 5 - {data.Activity5}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity5Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity5Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity5Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity5Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity5Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity5Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>
              </Typography>
            )}


            {data.Activity6 !== "" && (
              <Typography className='sub2' mt='10px' display={"flex"}
              gap="10px"
              paddingX={"4px"}
              alignItems={"center"}>
                Activity 6 - {data.Activity6}
                <Grid display={"flex"}
                  gap="10px"
                  paddingX={"4px"}
                  alignItems={"center"}>
                  {data?.Activity6Prop?.["red"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity6Prop?.["red"]}&nbsp;
                    <Tour
                      sx={{
                        color: "#fa1942",
                      }}
                    />
                  </Typography>}

                  {data?.Activity6Prop?.["green"] !== 0 && <Typography
                    fontWeight={"600"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {data?.Activity6Prop?.['green']}&nbsp;{" "}
                    <Tour
                      sx={{
                        color: "#76de9a",
                      }}
                    />
                  </Typography>}
                  {data?.Activity6Prop?.["yellow"] !== 0 &&
                    <Typography
                      fontWeight={"600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {data?.Activity6Prop?.['yellow']}&nbsp;{" "}
                      <Tour
                        sx={{
                          color: "#fac219",
                        }}
                      />
                    </Typography>}
                </Grid>
              </Typography>
            )}

            <Button
              variant='contained'
              sx={{
                background: '#2CC248',
                boxShadow: '0px 2.5 9 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '50px',
                padding: '10px 50px',
                fontFamily: 'Luckiest Guy',
                fontSize: '24px',
                marginTop: '20px',

                '&:hover': {
                  background: '#1e8e33'
                }
              }}
              onClick={() => {
                navigate('/book');
              }}
            >
              Book Now
            </Button>
          </Grid>

          <img className='imgtop2' src={data.top1} alt={'Zone Area'} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Zone;
