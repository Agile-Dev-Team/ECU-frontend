// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';

// components
import Page from '../components/Page';
// sections
import { HowToHeader } from 'src/sections/how';

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
    <Page title="Contact us">
      <RootStyle>
        <HowToHeader/ >
      </RootStyle>
    </Page>
  );
}
