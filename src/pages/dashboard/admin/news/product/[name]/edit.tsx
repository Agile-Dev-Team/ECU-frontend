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

  const { name } = query;

  const { products } = useSelector((state) => state.product);

  const currentProduct = products.find((product) => paramCase(product.name) === name);

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
            { name: name as string },
          ]}
        />

        <NewsEditForm isEdit currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
