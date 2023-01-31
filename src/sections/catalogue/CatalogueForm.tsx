import { m } from 'framer-motion';
// @mui
import { Button, Typography, TextField, Stack, Grid, MenuItem } from '@mui/material';
// components
import { MotionViewport, varFade, varRotate } from '../../components/animate';

// ----------------------------------------------------------------------

export default function CatalogueForm() {
  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inDown}>
        <Typography variant="h3" sx={{pl:5}}>What do you want to find?</Typography>
      </m.div>

      <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inLeft}>
            <TextField fullWidth label="Vehicle Type" select />
          </m.div>
        </Grid>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inDown}>
            <TextField fullWidth label="Vehicle Brand" select />
          </m.div>
        </Grid>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inRight}>
            <TextField fullWidth label="Model" select />
          </m.div>
        </Grid>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inLeft}>
            <TextField fullWidth label="Generation" select />
          </m.div>
        </Grid>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inUp}>
            <TextField fullWidth label="Fuel" select />
          </m.div>
        </Grid>
        <Grid item xs={11} sm={11} md={6} lg={4} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inRight}>
            <TextField fullWidth label="Engine" select>
              <MenuItem value="petrol">
                PETROL
              </MenuItem>
              <MenuItem value="disel">
                DISEL
              </MenuItem>
            </TextField>
          </m.div>
        </Grid>
      </Grid>

      <m.div variants={varFade().inUp}>
        <Button size="large" variant="contained" sx={{ml:5}}>
          VIEW ECUs
        </Button>
      </m.div>
    </Stack>
  );
}
