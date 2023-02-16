import { useEffect } from 'react';
import { paramCase } from 'change-case';
// next
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../../../redux/store';
import { getProducts } from '../../../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../../../routes/paths';
// hooks
import useSettings from '../../../../../../hooks/useSettings';
// layouts
import Layout from '../../../../../../layouts';
// components
import Page from '../../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../../components/HeaderBreadcrumbs';
// sections
import NewsEditForm from '../../../../../../sections/dashboard/admin/news/NewsEditForm';

// ----------------------------------------------------------------------

EcommerceProductEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EcommerceProductEdit() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { query } = useRouter();

  const { id } = query;

  const { news } = useSelector((state) => state.news);

  const currentNews = news.find((item) => paramCase(item._id) === id);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Edit News">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit news"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'news',
              href: PATH_DASHBOARD.news.root,
            },
            { name: id as string },
          ]}
        />

        <NewsEditForm isEdit currentNews={currentNews} />
      </Container>
    </Page>
  );
}
