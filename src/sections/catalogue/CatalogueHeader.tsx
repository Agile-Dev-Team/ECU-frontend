import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
//
import { TextAnimate, Texth4Animate, MotionContainer, varFade } from '../../components/animate';


// ----------------------------------------------------------------------

const CONTACTS = [
  {
    brand: 'Abarth Abarth 124 Spider',
    type: '16v MultiAir Turbo',
    gear: '6AT Fiat MultiAir 55253268',
    year: '2016 1.4',
  },
  {
    brand: 'Abarth 500 Assetto Corse',
    type: '16v MultiAir Turbo',
    gear: '6AT Fiat MultiAir 55253268',
    year: '2016 1.4',
  },
 
  {
    brand: 'Audi A1 8X',
    type: 'TDI Ultra (90)',
    gear: 'VW Group EA288 CUSB',
    year: '2017 1.4',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage:
    'url(/assets/overlay.svg), url(/assets/carbackgrounds/4.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    position: 'absolute',
    bottom: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

export default function CatalogueHeader() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate text="Vehicle Catalogue" sx={{ color: 'primary.main', mr:2 }} variants={varFade().inRight} />
          <br />
          <Box sx={{ display: 'flex',flexWrap:'wrap', color: 'common.white', mt:4}}>
            <Texth4Animate text="Looking for a ECU for a specific vehicle?" sx={{ mr: 2 }} />
          </Box>
          <Grid container spacing={5} sx={{ mt: 5, color: 'common.white' }}>
            {CONTACTS.map((contact) => (
              <Grid key={contact.brand} item xs={12} sm={6} md={6} lg={4} sx={{ pr: { md: 5 } }}>
                <m.div variants={varFade().in}>
                  <Typography variant="h6" paragraph>
                    {contact.brand}
                  </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                  <Typography variant="body2">
                    {contact.type}
                    <br /> {contact.gear}
                    <br /> {contact.year}
                  </Typography>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
