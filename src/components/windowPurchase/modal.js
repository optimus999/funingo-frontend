import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  Grid,
  Typography,
  Box,
  Button,
  TextField
} from '@mui/material';
import { downloadImage, exportAsImage } from '../../utils';
import axios from 'axios';
import { apiUrl } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { saveTicketRiskImage } from '../../actions/ticket';

const ConfirmationModal = ({ open, onClose, handlePurchase }) => {
  const [name, setName] = useState('');
  const ref = useRef(null);
  const { token } = useSelector(state => state.userSlice);

  const saveImage = async () => {
    if (ref?.current) {
      try {
        const image = await exportAsImage(ref.current, 'Confirmation');

        const binaryString = atob(image.split(',')[1]);

        // Step 2: Create a Blob
        const blobArray = [];
        for (let i = 0; i < binaryString.length; i++) {
          blobArray.push(binaryString.charCodeAt(i));
        }
        const imageBlob = new Blob([new Uint8Array(blobArray)], {
          type: 'image/png'
        });

        onClose();
        handlePurchase(short_id => {
          saveTicketRiskImage({ imageBlob, short_id, token });
        });
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='lg'>
      <Grid width={'700px'} p='20px' ref={ref}>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus
          eget nunc scelerisque viverra. Viverra tellus in hac habitasse platea
          dictumst vestibulum. Nibh venenatis cras sed felis eget velit aliquet
          sagittis. At tempor commodo ullamcorper a lacus vestibulum sed arcu.
          Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus.
          Phasellus vestibulum lorem sed risus ultricies tristique. In egestas
          erat imperdiet sed euismod. Turpis egestas maecenas pharetra convallis
          posuere morbi leo. Interdum posuere lorem ipsum dolor sit. Eu lobortis
          elementum nibh tellus molestie nunc non. Iaculis nunc sed augue lacus.
          Aliquam etiam erat velit scelerisque. Nec tincidunt praesent semper
          feugiat nibh sed pulvinar proin. Facilisis leo vel fringilla est
          ullamcorper eget. Quam viverra orci sagittis eu volutpat odio. Proin
          sed libero enim sed faucibus turpis in eu. Enim ut tellus elementum
          sagittis vitae et leo. Nibh tortor id aliquet lectus proin nibh nisl
          condimentum id. Risus commodo viverra maecenas accumsan lacus. Quis
          imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper.
          Convallis a cras semper auctor neque vitae tempus quam pellentesque.
          Elementum nisi quis eleifend quam adipiscing vitae proin sagittis
          nisl. Massa ultricies mi quis hendrerit dolor magna eget est lorem.
          Lacus sed viverra tellus in hac. Ultrices gravida dictum fusce ut. Sit
          amet mauris commodo quis imperdiet massa tincidunt. Suspendisse in est
          ante in nibh. Ac tortor vitae purus faucibus. Vitae auctor eu augue ut
          lectus arcu. Id faucibus nisl tincidunt eget nullam. Et malesuada
          fames ac turpis egestas. Facilisi morbi tempus iaculis urna id
          volutpat lacus laoreet. Posuere morbi leo urna molestie at. Amet
          consectetur adipiscing elit ut aliquam. Euismod lacinia at quis risus
          sed vulputate odio. Aliquet sagittis id consectetur purus ut faucibus
          pulvinar elementum integer. Massa sed elementum tempus egestas sed sed
          risus pretium. Pellentesque id nibh tortor id aliquet lectus. Quis
          risus sed vulputate odio ut enim blandit. Integer enim neque volutpat
          ac tincidunt vitae. Venenatis a condimentum vitae sapien pellentesque
          habitant morbi.
        </Typography>
        <Box
          sx={{
            my: '20px'
          }}
        >
          <Typography fontWeight='600'>Your digital signature</Typography>
          <TextField
            fullWidth
            placeholder='Type in your name'
            onChange={e => setName(e.target.value)}
            value={name}
            sx={{
              '& fieldset': {
                border: 'none'
              }
            }}
            inputProps={{
              sx: {
                padding: '5px'
              }
            }}
          />
        </Box>
        <Button
          // onClick={() => handlePurchase()}
          variant='contained'
          fullWidth
          disabled={!name.length}
          onClick={() => saveImage()}
        >
          Buy Now
        </Button>
      </Grid>
    </Dialog>
  );
};

export default ConfirmationModal;
