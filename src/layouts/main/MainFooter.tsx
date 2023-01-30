// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Catalogue',
    content:
      'Check out the largest database of custom remapped tuning files online! Find ERC tuning specifications for more than 6000 engines!',
    href: PATH_PAGE.catalogue,
  },
  {
    headline: 'Price list',
    content:
      'See prices of our chip tuning files and solutions and don’t forget to check out our pre-paid packages for maximum savings on tuning files.',
    href: PATH_PAGE.pricing,
  },
  {
    headline: 'How to?',
    content:
      'It’s simple. Drag & drop your file for an automatic search of available remaps and options, or order a custom remap, and pay with Paypal or a credit card',
    href: PATH_PAGE.how,
  },
  {
    headline: 'Contact & Support',
    content:
      'Please do not hesitate to contact us at the link below. For support with a file, please send us a support ticket from your PRO account.',
    href: '#',
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Typography variant="h3" sx={{ pr: { md: 5 } }}>
              The highest quality ECU files
            </Typography>
            <Typography variant="body1" sx={{ pr: { md: 5 } }}>
              for vehicle tuning professionals
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2} sx={{cursor:'pointer'}}>
                  <NextLink href={list.href} passHref>
                    <Link variant="h4">{list.headline}</Link>
                  </NextLink>
                  <Typography color="inherit" variant="body2" sx={{ display: 'block' }}>
                    {list.content}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          alignItems={{ xs: 'center', md: 'center' }}
          sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
        >
          <SocialsButton sx={{ mx: 0.5 }} />
        </Stack>
      </Container>
    </RootStyle>
  );
}
