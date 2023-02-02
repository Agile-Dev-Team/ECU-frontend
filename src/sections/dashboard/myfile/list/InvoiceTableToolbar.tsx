import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// components
import Iconify from '../../../../components/Iconify';
import { styled } from '@mui/material/styles';

const ContentStyle = styled('div')((theme) => ({
  textAlign: 'center',
  '&::-webkit-scrollbar': {
    borderRadius: '1px',
    height: '4px',
    width: '4px',
  },

  '&::-webkit-scrollbar-corner': {
    background: '#9c9c9c',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(180deg, #bcbcc8, #b0b0bf 33%), #bcbcc8',
    borderRadius: '1px',
  },
  '&::-webkit-scrollbar-track': {
    background:
      'linear-gradient(180deg, rgba(173, 173, 173, 0.05), hsla(0, 0%, 100%, 0)),\
      linear-gradient(0deg, #7b7b80, #1c1c22), #c4c4c4',
    borderRadius: '1px',
  },
}));
const INPUT_WIDTH = 210;

type Props = {
  optionsService: string[];
  filterName: string;
  filterService: string;
  filterStartDate: Date | null;
  filterEndDate: Date | null;
  onFilterName: (value: string) => void;
  onFilterService: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterStartDate: (value: Date | null) => void;
  onFilterEndDate: (value: Date | null) => void;
};

export default function InvoiceTableToolbar({
  optionsService,
  filterStartDate,
  filterEndDate,
  filterName,
  filterService,
  onFilterName,
  onFilterService,
  onFilterStartDate,
  onFilterEndDate,
}: Props) {
  return (
    <ContentStyle>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
        <TextField
          fullWidth
          select
          label="Service type"
          value={filterService}
          onChange={onFilterService}
          SelectProps={{
            MenuProps: {
              sx: {
                '& .MuiPaper-root': { maxHeight: 460 },
              },
            },
          }}
          sx={{
            maxWidth: { md: INPUT_WIDTH },
            textTransform: 'capitalize',
          }}
        >
          {optionsService.map((option) => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
              }}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>

        <DatePicker
          label="Start date"
          value={filterStartDate}
          onChange={onFilterStartDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <DatePicker
          label="End date"
          value={filterEndDate}
          onChange={onFilterEndDate}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              sx={{
                maxWidth: { md: INPUT_WIDTH },
              }}
            />
          )}
        />

        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search client or invoice number..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </ContentStyle>
  );
}
