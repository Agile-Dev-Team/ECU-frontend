import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography, Paper, Button } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionViewport, varFade } from '../../components/animate';
import Carousel from 'react-material-ui-carousel';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CARDS = [
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'AdBlue off',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
  },
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'DPF off',
    description: 'Easy to customize and extend each component, saving you time and money.',
  },
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'LSU off',
    description: 'Consistent design in colors, fonts ... makes brand recognition easy.',
  },
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'EGR off',
    description:
      'The set is built on the principles of the atomic design system. It helps you to create projects fastest and easily customized packages for your projects.',
  },
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'IMMO off',
    description: 'Easy to customize and extend each component, saving you time and money.',
  },
  {
    icon: 'https://minimal-assets-api-dev.vercel.app/assets/icons/ic_design.svg',
    title: 'TVA off',
    description: 'Consistent design in colors, fonts ... makes brand recognition easy.',
  },
];

const shadowIcon = (color: string) => `drop-shadow(2px 2px 2px ${alpha(color, 0.48)})`;

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));

const CardStyle = styled(Card)(({ theme }) => {
  const shadowCard = (opacity: number) =>
    theme.palette.mode === 'light'
      ? alpha(theme.palette.grey[500], opacity)
      : alpha(theme.palette.common.black, opacity);

  return {
    border: 0,
    maxWidth: 380,
    minHeight: 440,
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(10, 5, 0),
    boxShadow: theme.customShadows.z12,
    [theme.breakpoints.up('md')]: {
      boxShadow: 'none',
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    '&.cardLeft': {
      [theme.breakpoints.up('md')]: { marginTop: -40 },
      transition: 'all .6s ease-in-out',
    },
    '&.cardLeft:hover' :{
      [theme.breakpoints.up('md')]: {
        marginTop: -80,
        backgroundColor: theme.palette.background.paper,
        boxShadow: `-40px 40px 80px 0 ${shadowCard(0.4)}`,
        '&:before': {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          content: "''",
          margin: 'auto',
          position: 'absolute',
          width: 'calc(100% - 40px)',
          height: 'calc(100% - 40px)',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          backgroundColor: theme.palette.background.paper,
          boxShadow: `-20px 20px 40px 0 ${shadowCard(0.12)}`,
        },
      },
    },
    
  };
});

// ----------------------------------------------------------------------

export default function HomeMinimal() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';
  const items = [
    {
      img: '/assets/carbackgrounds/2.jpg',
      name: 'Hyundaai – Bosch EDC17C53 – DPF, EGR, DTC off w/o sensors',
      description:
        'Developed and added to the program DPF, EGR, DTC off w/o sensors for Hyundai ECU Bosch EDC17C53',
    },
    {
      img: '/assets/carbackgrounds/3.jpg',
      name: 'Christmas Promotion! All December! To 30% discount!',
      description:
        'With appreciation for your business and with warmest wishes for a happy Holiday Season and a prosperous New Year! Like all previous years, this year was no exception, and we are starting the Christmas sale for our beloved customers, which gives you the opportunity to purchase everything you want at a super price. Let’s start! 😉\
                    Only December! Every module 450 euro!\
                    FULL Version – 6400 euro!\
                    This price available from the 1st of December to the 31th of December 2022!\
                    If you want to buy the dongle in your country – check our reseller list. We have the dealsers more than 25 countrues.',
    },
    {
      img: '/assets/carbackgrounds/4.jpg',
      name: 'SALE WEEK!! To 20% OFF. THE 26-30th of SEPTEMBER!',
      description:
        'Every half an a year we make the SALE WEEK.\
                    Sale will be available from the 26th to the 30th of September 2022!\
                    Sale prices for these days\
                    – every ESS module from 450 to 600 euro depends from the regular module price\
                    – FULL version of ESS Software – 6900 euro',
    },
  ];

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 10, md: 7 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              News
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">What is for Today?</Typography>
          </m.div>
        </Box>
        <Carousel
          NextIcon={<NavigateNextIcon sx={{ color: 'primary.main' }} />}
          PrevIcon={<NavigateBeforeIcon sx={{ color: 'primary.main' }} />}
          sx={{ mb: 15 }}
        >
          {items.map((item, i) => (
            <Paper
              key={'item' + i}
              sx={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: { xs: 300, md: 600 },
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column',
                px: 5,
                color: 'white !important',
              }}
            >
              <m.h2 variants={varFade().inRight}>{item.name}</m.h2>
              <m.p variants={varFade().inUp}>{item.description}</m.p>

              <Button className="CheckButton">Check it out!</Button>
            </Paper>
          ))}
        </Carousel>

        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 12, md: 15 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">Our Service</Typography>
          </m.div>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 5, lg: 10 },
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' },
          }}
        >
          {CARDS.map((card, index) => (
            <m.div variants={varFade().inUp} key={card.title}>
              <CardStyle
                className="cardLeft"
              >
                <Image
                  src={card.icon}
                  alt={card.title}
                  sx={{
                    mb: 15,
                    mx: 'auto',
                    width: 40,
                    height: 40,
                    filter: (theme) => shadowIcon(theme.palette.primary.main),
                    ...(index === 0 && {
                      filter: (theme) => shadowIcon(theme.palette.info.main),
                    }),
                    ...(index === 1 && {
                      filter: (theme) => shadowIcon(theme.palette.error.main),
                    }),
                  }}
                />
                <Typography variant="h5" paragraph>
                  {card.title}
                </Typography>
                <Typography sx={{ color: isLight ? 'text.secondary' : 'common.white' }}>
                  {card.description}
                </Typography>
              </CardStyle>
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
