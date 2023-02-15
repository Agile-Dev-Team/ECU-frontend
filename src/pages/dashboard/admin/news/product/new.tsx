// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// hooks
import useSettings from '../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../layouts';
// components
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
// sections
import NewsEditForm from '../../../../../sections/dashboard/admin/news/NewsEditForm';

// ----------------------------------------------------------------------

EcommerceProductCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Add a News">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a News"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'News',
              href: PATH_DASHBOARD.news.root,
            },
            { name: 'New' },
          ]}
        />
        <NewsEditForm />
      </Container>
    </Page>
  );
}
