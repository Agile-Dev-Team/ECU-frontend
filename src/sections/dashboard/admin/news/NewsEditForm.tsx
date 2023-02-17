import * as Yup from 'yup';
// import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types

import { News } from '../../../../@types/news';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../../components/hook-form';

import { addNews, updateNews } from '../../../../redux/slices/admin/news';
import { dispatch } from '../../../../redux/store';
import { UploadFile } from '../../../../utils/UploadFile';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

interface FormValuesProps extends Partial<News> {
  title: string;
  content: string;
  imageUrl: File | any;
  status: boolean;
}

type Props = {
  isEdit?: boolean;
  currentNews?: News;
};

export default function ProductNewEditForm({ isEdit, currentNews }: Props) {
  const { push } = useRouter();

  // const { enqueueSnackbar } = useSnackbar();

  const NewsSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const defaultValues = {
    title: currentNews?.title || '',
    content: currentNews?.content || '',
    imageUrl: currentNews?.imageUrl || '',
    status: currentNews?.status || false,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewsSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  useEffect(() => {
    if (isEdit && currentNews) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentNews]);

  const onSubmit = async (data: FormValuesProps) => {
    console.log('onsubmit');
    try {
      console.log('add news data: ',data);
      let url = isEdit ? data.imageUrl : '';
      
      if(data.imageUrl.path && data.imageUrl.path.substring(0, data.imageUrl.path.length - 4) !== defaultValues.imageUrl)
        url = await UploadFile(data.imageUrl, 'news') || '';
      const news : News = {
        _id:isEdit ? (currentNews?._id ||'') : '',
        title: data.title || '',
        content: data.content || '',
        imageUrl: url || '',
        status: data.status || false,
      }
      console.log(isEdit, "isEdit");
      if(!isEdit)
        await dispatch(addNews(news));
      else
        await dispatch(updateNews(news));
      push(PATH_DASHBOARD.news.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log('handldrop');
      const file = acceptedFiles[0];
      console.log(file);
      if (file) {
        setValue(
          'imageUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="News Title" />

              <div>
                <LabelStyle>News Content</LabelStyle>
                <RHFEditor simple name="content" />
              </div>
              <div>
                <RHFSwitch label="Status" name="status"/>
              </div>
              <div>
                <LabelStyle>News background</LabelStyle>
                <RHFUploadSingleFile
                  name="imageUrl"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </div>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create News' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
