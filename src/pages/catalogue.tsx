// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// layouts
import Layout from '../layouts';
// _mock
import { _mapContact } from '../_mock';
// components
import Page from '../components/Page';
// sections
import { CatalogueHeader, CatalogueForm } from '../sections/catalogue';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

Contact.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Contact() {
  return (
    <Page title="Catalogue">
      <RootStyle>
        <CatalogueHeader />

        <Container sx={{ my: 10 }}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={12}>
              <CatalogueForm />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
