// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Switch, Container, Typography, Stack } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { PricingPlanCard } from '../sections/pricing';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Pricing.getLayout = function getLayout(page: React.ReactElement) {
  
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Pricing() {
  return (
    <Page title="Pricing">
      <RootStyle>
        <Container>
          <Typography variant="h3" paragraph>
            How much will it cost?
          </Typography>
          <Typography sx={{mb:5}}>
            Our prices are transparent and without any hidden costs, conditions or required credits. We offer a set price for off-the-shelf matched files and calculated price for custom remap requests. Purchase one of our Prepaid Packages for additional savings. We offer our Slave tool customers additional discounts and benefits as well.
          </Typography>

          <Typography variant="h3" paragraph>
            01 Cloud Remap
          </Typography>
          <Typography >
            Our automatic file matching system will immediately show you the remaps and solutions available that are exact matches for your uploaded original file. Simple one-click purchase ensures you will get a high quality tested file in the shortest time possible. All files are developed by us and tested on a dyno and on real life road conditions. DON’T MISS OUR PROMO PRICES WHILE THEY LAST!          </Typography>
          <Box sx={{ my: 5 }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end">
              <Typography variant="overline" sx={{ mr: 1.5 }}>
                MONTHLY
              </Typography>

              <Switch />
              <Typography variant="overline" sx={{ ml: 1.5 }}>
                YEARLY (save 10%)
              </Typography>
            </Stack>

            <Typography
              variant="caption"
              align="right"
              sx={{ color: 'text.secondary', display: 'block' }}
            >
              * Plus applicable taxes
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {_pricingPlans.map((card, index) => (
              <Grid item xs={12} md={4} key={card.subscription}>
                <PricingPlanCard card={card} index={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
