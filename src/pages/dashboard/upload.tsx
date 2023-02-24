import { ReactElement, useState, useCallback, useMemo, useEffect } from 'react';

import { useSelector } from 'react-redux';
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
import { RootState } from '../../redux/store';
import { getBrand, getModel, getVersion, getModelYear, getEngineModel, getFuel, getEcu } from '../../redux/slices/upload';
import { dispatch } from '../../redux/store';
import Notiflix from 'notiflix';
import { UploadFile } from '../../utils/UploadFile';

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
  files: File[];
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
  const { brand, model, generation, engine, fuel, ecu, year } = useSelector((state: RootState)=> state.uploadfile);
  // const { enqueueSnackbar } = useSnackbar();

  const [ brandName, setBrandName ] = useState<string>('');
  const [ modelName, setModelName ] = useState<string>('');
  const [ versionName, setVersionName ] = useState<string>('');
  const [ modelYear, setModelYear ] = useState<string>('');
  const [ engineModel, setEngineModel ] = useState<string>('');
  const [ fuelName, setFuelName ] = useState<string>('');
  const [ ecuName, setEcuName ] = useState<string>('');
  const [ power, setPower] = useState<string>('');
  const [ torque, setTorque] = useState<string>('');
  const [ hw, setHw] = useState<string>('');
  const [ sw, setSw] = useState<string>('');
  const [ options, setOptions ] = useState<string []>([]);


  useEffect(()=>{
    dispatch(getBrand());
  },[])
  useEffect(()=>{
    dispatch(getModel(brandName));
  },[brandName])
  useEffect(()=>{
    dispatch(getVersion(brandName, modelName));
  },[modelName])
  useEffect(()=>{
    dispatch(getModelYear(brandName, modelName, versionName));
  },[versionName])
  useEffect(()=>{
    dispatch(getEngineModel(brandName, modelName, versionName, modelYear));
  },[modelYear])
  useEffect(()=>{
    dispatch(getFuel(brandName, modelName, versionName, modelYear, engineModel));
  },[engineModel])
  // when there is no enginemodel in database.
  useEffect(()=>{
    if(engine.length === 1 && engine[0] === '')
      dispatch(getFuel(brandName, modelName, versionName, modelYear, engineModel));
  },[engine])
  useEffect(()=>{
    console.log('fuelName');
    dispatch(getEcu(brandName, modelName, versionName, modelYear, engineModel, fuelName));
  },[fuelName])

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
  const hanldeChangeBrand = (e: any) => {
    console.log(e.target.value);
    setBrandName(e.target.value);
  }
  const hanldeChangeModel = (e: any) => {
    console.log(e.target.value);
    setModelName(e.target.value);
  }
  const hanldeChangeVersion = (e: any) => {
    console.log(e.target.value);
    setVersionName(e.target.value);
  }
  const hanldeChangeYear = (e: any) => {
    console.log(e.target.value);
    setModelYear(e.target.value);
  }
  const hanldeChangeEngine = (e: any) => {
    console.log(e.target.value);
    setEngineModel(e.target.value);
  }
  const hanldeChangeFuel = (e: any) => {
    console.log(e.target.value);
    setFuelName(e.target.value);
  }
  const hanldeChangeEcu = (e: any) => {
    console.log(e.target.value);
    setEcuName(e.target.value);
  }
  const handleChangePower = (e: any) => {
    console.log(e.target.value);
    setPower(e.target.value);
  }
  const handleChangeTorque = (e: any) => {
    console.log(e.target.value);
    setTorque(e.target.value);
  }
  const handleChangeHw = (e: any) => {
    console.log(e.target.value);
    setHw(e.target.value);
  }
  const handleChangeSw = (e: any) => {
    console.log(e.target.value);
    setSw(e.target.value);
  }
  const handleChangeCheck = (e: any, description : string) => {
    if(e.target.checked){
      setOptions([...options, description]);
    }
    else{
      setOptions(options.filter((item) => item!=description))
    }
  }
  const handleOnSubmit = async () => {
    if(!values.files || values.files?.length === 0){
      Notiflix.Notify.warning('Upload files.');
      return;
    }
    if(options.length === 0){
      Notiflix.Notify.warning('Select service options in Step 2');
      return;
    }
    const fileUrls: string []  = [];
    for(let i = 0 ; i < values.files.length ; i++){
        const url = await UploadFile(values.files[i], 'files');
        if(url)
          fileUrls.push(url);
    }
    const data = {
      brandName,
      modelName,
      versionName,
      modelYear,
      engineModel,
      fuelName,
      ecuName,
      power,
      torque,
      hw,
      sw,
      options,
      fileUrls,
    };
    

  }
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
                    {brand.length === 0 &&
                      <TextField fullWidth label="Choose a Brand" name='brand' select disabled/>
                    }
                    {brand.length > 0 &&
                      <TextField fullWidth label="Choose a Brand" name='brand' defaultValue={brandName} onChange={(e)=>hanldeChangeBrand(e)} select>
                        {brand.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {model.length === 0 &&
                      <TextField fullWidth label="Choose a Model" name='model' select disabled/>
                    }
                    {model.length > 0 &&
                      <TextField fullWidth label="Choose a Model" name='model' defaultValue={modelName} onChange={(e)=>hanldeChangeModel(e)} select>
                        {model.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {generation.length === 0 &&
                      <TextField fullWidth label="Generation" name='generation' select disabled/>
                    }
                    {generation.length > 0 &&
                      <TextField fullWidth label="Generation" name='generation' defaultValue={generation} onChange={(e)=>hanldeChangeVersion(e)} select>
                        {generation.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {year.length === 0 &&
                      <TextField fullWidth label="Year of production" name='year' select disabled/>
                    }
                    {year.length > 0 &&
                      <TextField fullWidth label="Year of production" name='year' defaultValue={modelYear} onChange={(e)=>hanldeChangeYear(e)} select>
                        {year.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {engine.length === 0 &&
                      <TextField fullWidth label="Engine" name='engine' select disabled/>
                    }
                    {engine.length > 0 &&
                      <TextField fullWidth label="Engine" name='engine' defaultValue={engineModel} onChange={(e)=>hanldeChangeEngine(e)} select>
                        {engine.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Power(Hp)*" name="power" defaultValue={power} onChange={(e)=>handleChangePower(e)}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="Torque (Nm)*" name="torque" defaultValue={torque} onChange={(e)=>handleChangeTorque(e)}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {fuel.length === 0 &&
                      <TextField fullWidth label="Fuel" name='fuel' select disabled/>
                    }
                    {fuel.length > 0 &&
                      <TextField fullWidth label="Fuel" name='fuel' defaultValue={fuelName} onChange={(e)=>hanldeChangeFuel(e)} select>
                        {fuel.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    {ecu.length === 0 &&
                      <TextField fullWidth label="ECU" name='ecu' select disabled/>
                    }
                    {ecu.length > 0 &&
                      <TextField fullWidth label="ECU" name='ecu' defaultValue={ecuName} onChange={(e)=>hanldeChangeEcu(e)} select>
                        {ecu.map((item, index)=>
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )}
                      </TextField>
                    }
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="HW" name='hw' defaultValue={hw} onChange={(e)=>handleChangeHw(e)}/>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <TextField fullWidth label="SW" name='sw' defaultValue={sw} onChange={(e)=>handleChangeSw(e)}/>
                      
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
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="ADBLUE/SCR OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'ADBLUE/SCR OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="DPF+EGR OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'DPF+EGR OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="DPF/FAP OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'DPF/FAP OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="EGR OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'EGR OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                  
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="02/LAMBA OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, '02/LAMBA OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="DTC OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'DTC OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="IMMO OFF"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'IMMO OFF')}
                    sx={{ mr: 7, mb: 3 }}
                  />
                  <FormControlLabel
                    defaultChecked={false}
                    control={<Switch color="primary" />}
                    label="ORIGINAL FILE REQUEST"
                    labelPlacement="end"
                    onChange={(e)=> handleChangeCheck(e, 'ORIGINAL FILE REQUEST')}
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
            {step === 4 && (
              <Stack direction="row" justifyContent="center" sx={{ mt: 5 }}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ ml: 5 }}
                  onClick={(e) => handlePreviousStep()}
                >
                  PREVIOUS
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ ml: 5 }}
                  onClick={(e) => handleOnSubmit()}
                  disabled={false}
                >
                  SUBMMIT
                </Button>
              </Stack>
            )}
          </FormProvider>
          {step < 4 &&
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
                disabled={false}
              >
                NEXT
              </Button>
            </Stack>
          }
          
        </RootStyle>
      </Container>
    </Page>
  );
}
