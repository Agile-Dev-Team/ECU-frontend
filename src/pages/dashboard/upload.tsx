import { ReactElement, useState, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Stack,
  Grid,
  Box,
  TextField,
  MenuItem,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

import { m } from 'framer-motion';

import { styled } from '@mui/material/styles';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { TabItem } from 'src/sections/dashboard';
import { varFade } from 'src/components/animate';
import { number } from 'yup';
import { FormProvider, RHFUploadMultiFile } from 'src/components/hook-form';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

PageOne.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

const RootStyle = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));
// ----------------------------------------------------------------------

type Product = {
  id: string;
  cover: string;
  files: string[];
  name: string;
  price: number;
  code: string;
  sku: string;
  tags: string[];
  priceSale: number | null;
  totalRating: number;
  totalReview: number;

  sizes: string[];
  available: number;
  description: string;
  sold: number;
  createdAt: Date | string | number;
};

interface FormValuesProps extends Partial<Product> {
  taxes: boolean;
  inStock: boolean;
}

export default function PageOne() {
  const { themeStretch } = useSettings();

  // const { enqueueSnackbar } = useSnackbar();

  const [step, setStep] = useState<number>(1);
  const tabs = [
    {
      index: 1,
      title: 'Vehicles',
      titleInfo: 'Main',
      description: 'parameters',
    },
    {
      index: 2,
      title: 'Options',
      titleInfo: 'Prefered',
      description: 'options',
    },
    {
      index: 3,
      title: 'Upload',
      titleInfo: '*required',
      description: 'files',
    },
    {
      index: 4,
      title: 'Submit',
      titleInfo: 'Overview',
      description: 'submit',
    },
  ];
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    files: Yup.array().min(1, 'file is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      files: [],
      code: '',
      sku: '',
      price: 0,
      priceSale: 0,
      tags: [],
      inStock: true,
      taxes: true,
      gender: '',
      category: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const values = watch();
  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
    console.log(step);
  };
  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
    console.log('previous', step);
  };
  const isEdit = true;
  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);
    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    //   // push(PATH_DASHBOARD.eCommerce.list);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.files || [];

      setValue('files', [
        ...files,
        ...acceptedFiles.map((file: Blob | MediaSource) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.files]
  );
  const handleRemoveAll = () => {
    setValue('files', []);
  };
  const handleRemove = (file: File | string) => {
    const filteredItems = values.files?.filter((_file) => _file !== file);
    setValue('files', filteredItems);
  };
  return (
    <Page title="Page One">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Upload', href: PATH_DASHBOARD.user.root },
          ]}
        />
        <Grid
          container
          spacing={1}
          sx={{ mt: 5, color: 'common.white', ml: { xs: '10px', md: 0 } }}
        >
          {tabs.map((tab: any, id: number) => {
            console.log(tab);
            if (id + 1 <= step) {
              return (
                <Grid
                  key={id}
                  item
                  xs={11}
                  sm={11}
                  md={6}
                  lg={3}
                  sx={{ pr: { md: 2 } }}
                  onClick={(e) => {
                    console.log(step);
                    setStep(id + 1);
                  }}
                >
                  <TabItem
                    index={tab.index.toString()}
                    title={tab.title}
                    titleInfo={tab.titleInfo}
                    description={tab.description}
                    active={true}
                  />
                </Grid>
              );
            }
            return (
              <Grid
                key={id}
                item
                xs={11}
                sm={11}
                md={6}
                lg={3}
                sx={{ pr: { md: 2 } }}
                onClick={(e) => {
                  console.log(step);
                  setStep(id + 1);
                }}
              >
                <TabItem
                  index={tab.index.toString()}
                  title={tab.title}
                  titleInfo={tab.titleInfo}
                  description={tab.description}
                  active={false}
                />
              </Grid>
            );
          })}
        </Grid>
        <RootStyle>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Vehicle Information</Typography>
                <Grid container spacing={5} sx={{ mt: 0, color: 'common.white' }}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <TextField fullWidth label="Choose a brand" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Choose a Year" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Manual" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Ghoose a model" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Choose a generation" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Power(Hp)*" select>
                      <MenuItem value="petrol">PETROL</MenuItem>
                      <MenuItem value="disel">DISEL</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Torque (Nm)*" select>
                      <MenuItem value="petrol">PETROL</MenuItem>
                      <MenuItem value="disel">DISEL</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Engin*" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="ECU*" select />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="HW" select>
                      <MenuItem value="petrol">PETROL</MenuItem>
                      <MenuItem value="disel">DISEL</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="SW" select>
                      <MenuItem value="petrol">PETROL</MenuItem>
                      <MenuItem value="disel">DISEL</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            )}
            {step === 2 && (
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: 'common.white', mb: 3 }}>
                  Select Options
                </FormLabel>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="ADBLUE/SCR OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="DPF+EGR OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="DPF/FAP OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="EGR OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="02/LAMBA OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="DTC OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="IMMO OFF"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    value="check"
                    control={<Switch color="primary" />}
                    label="ORIGINAL FILE REQUEST"
                    labelPlacement="end"
                    sx={{ mr: 7, mb: 3 }}
                  />
                </FormGroup>
              </FormControl>
            )}
            {step === 3 && (
              <Box>
                <RHFUploadMultiFile
                  showPreview
                  name="files"
                  accept=""
                  maxSize={31457280}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </Box>
            )}
          </FormProvider>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 5 }}>
            <Button
              size="large"
              variant="contained"
              disabled={step === 1 ? true : false}
              sx={{ ml: 5 }}
              onClick={(e) => handlePreviousStep()}
            >
              PREVIOUS
            </Button>
            <Button
              size="large"
              variant="contained"
              sx={{ ml: 5 }}
              onClick={(e) => handleNextStep()}
              disabled={step === 4 ? true : false}
            >
              NEXT
            </Button>
          </Stack>
        </RootStyle>
      </Container>
    </Page>
  );
}
