import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid, Stack, Button } from '@mui/material';
//
import { TextAnimate, Texth4Animate, MotionContainer, varFade } from '../../components/animate';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';


// ----------------------------------------------------------------------

const CONTACTS = [
  {
    title: 'Upload & Search',
    icon: <CloudUploadIcon sx={{color:'primary.main', width:'20%', height:'auto', transform:'rotate(20deg)',mb:2}}/>,
    content1: 'Drop upload for automatic search of available remaps and options.',
    content2:
      'Use our drag & drop search to upload your original file and see all the remaps and options available for that file.',
    btnContent: 'UPLOAD FILE',
    link: '',
  },
  {
    title: 'File requests',
    icon:<InsertChartIcon sx={{color:'primary.main', width:'20%', height:'auto', transform:'rotate(20deg)',mb:2}}/>,
    content1: 'Select power remap, options or deactivations for your original file.',
    content2:
      'Upload the original file or ECU ID and select the desired combination of power remaps, deactivation solutions and modifications for aftermarket parts.',
    btnContent: 'TRY IT NOW',
    link: '',
  },

  {
    title: 'One-click purchase',
    icon: <CreditCardIcon sx={{color:'primary.main', width:'20%', height:'auto', transform:'rotate(20deg)',mb:2}}/>,
    content1: 'Simply select and purchase a tuning file, no credits required.',
    content2:
      'Payment via Paypal, Credit cards or Bank transfer. Immediate file download and delivery on your email. An account is required for purchasing and invoicing.',
    btnContent: 'UPLOAD FILE',
    link: '',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/overlay.svg), url(/assets/carbackgrounds/5.jpg)',
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
    bottom: theme.spacing(0),
  },
  '& .test': {
    height: '280px',
    overflow: 'hidden',
    borderStyle:'solid',
    borderWidth: '1px',
    borderRadius:'5px'
  },
  '& .test .first-box': {
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all .6s ease-in-out',
    backgroundColor:'#00000085',
    height: '100%',
  },
  '& .test:hover': {
    '& .first-box': {
      transform: 'translateY(-100%)',
    },
    "& .second-box": {
      transform: 'translateY(-100%)',
    }
  },
  '& .test .second-box': {
    cursor: 'pointer',
    transition: 'all .6s ease-in-out',
    backgroundColor: '#000000E6',
    height: '100%',
  },
}));

// ----------------------------------------------------------------------

export default function HowToHeader() {
  return (
    <RootStyle>
      <Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
        <ContentStyle>
          <TextAnimate
            text="Get your ECU tuning file"
            sx={{ color: 'common.white', mr: 2 }}
            variants={varFade().inUp}
          />
          <br />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', color: 'primary.main', mt: 2 }}>
            <Texth4Animate text="In just 3 easy steps" sx={{ mr: 2 }} variants={varFade().inLeft} />
          </Box>

          <Grid container spacing={5} sx={{ mt: 2, color: 'common.white' }}>
            {CONTACTS.map((contact, index) => (
              <Grid key={contact.title} item xs={12} sm={12} md={4} lg={4} sx={{ pr: { md: 1 } }}>
                <m.div variants={ index===0? varFade().inUp : varFade().inDown}>
                  <Box className="test" sx={{borderColor: 'primary.main'}}>
                    <Stack 
                      className="first-box"
                      justifyContent="center"
                      alignItems='center'
                      >
                      {contact.icon}
                      <Typography variant="h4" paragraph>
                        {contact.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {contact.content1}
                      </Typography>
                    </Stack>
                    <Stack 
                      className="second-box"
                      justifyContent="center"
                      sx={{px:2}}
                    >
                      <Typography variant="h6" paragraph>
                        {contact.title}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {contact.content2}
                      </Typography>
                      <Button variant='outlined' sx={{borderColor:'primary.main'}}>
                        {contact.btnContent}
                      </Button>
                    </Stack>
                  </Box>
                </m.div>
              </Grid>
            ))}
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
