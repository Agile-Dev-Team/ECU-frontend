// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { HomeHeader, HomeMinimal } from '../sections/home';

import { Grid, Container } from '@mui/material';
import { CatalogueHeader, CatalogueForm } from '../sections/catalogue';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Welcome to ECU store">
      <HomeHeader />

      <ContentStyle>
        <HomeMinimal />
        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={12}>
              <CatalogueForm />
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </Page>
  );
}
