import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
// @mui
import {
  Button,
  Typography,
  TextField,
  Input,
  Stack,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Box,
  Paper,
  InputAdornment
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// components
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/Iconify';

import { getVehicles } from '../../redux/slices/vehicle';
import { dispatch, RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { VehicleState } from 'src/@types/vehicle';
import InputStyle from '../../components/InputStyle';
// ----------------------------------------------------------------------

function Row(props: { row: VehicleState }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.vehicleType}
        </TableCell>
        <TableCell align="right">{row.brand}</TableCell>
        <TableCell align="right">{row.model}</TableCell>
        <TableCell align="right">{row.modelType}</TableCell>
        <TableCell align="right">{row.modelYear}</TableCell>
        <TableCell align="right">{row.version}</TableCell>
        <TableCell align="right">{row.ps}</TableCell>
        <TableCell align="right">{row.hp}</TableCell>
        <TableCell align="right">{row.ecuType}</TableCell>
        <TableCell align="right">{row.ecuBrand}</TableCell>
        <TableCell align="right">{row.ecuVersion}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Type
                    </TableCell>
                    <TableCell>{row.vehicleType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Brand
                    </TableCell>
                    <TableCell>{row.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Model
                    </TableCell>
                    <TableCell>{row.model}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Model Type
                    </TableCell>
                    <TableCell>{row.modelType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Model Year
                    </TableCell>
                    <TableCell>{row.modelYear}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Version
                    </TableCell>
                    <TableCell>{row.version}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      PS
                    </TableCell>
                    <TableCell>{row.ps}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      HP
                    </TableCell>
                    <TableCell>{row.hp}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ECU Type
                    </TableCell>
                    <TableCell>{row.ecuType}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ECU Brand
                    </TableCell>
                    <TableCell>{row.ecuBrand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ECU Version
                    </TableCell>
                    <TableCell>{row.ecuVersion}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


export default function CatalogueForm() {
  const vehicles: VehicleState[] = useSelector((state: RootState) => state.vehicle.vehicles);
  const totalCount: number = useSelector((state: RootState) => state.vehicle.totalCount);

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(getVehicles(page, pageSize, searchString));
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch(getVehicles(newPage, pageSize, searchString));
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { value } = event.target;
      setSearchString(value);
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSearch = () => {
    dispatch(getVehicles(page, pageSize, searchString));
  }

  return (
    <Stack component={MotionViewport} spacing={5}>
      <m.div variants={varFade().inDown}>
        <Typography variant="h3" sx={{pl:5}}>What do you want to find?</Typography>
      </m.div>

      <Grid container spacing={5} sx={{ mt: 5, color: 'common.white', "& .MuiGrid-item":{paddingLeft:0}} }>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ pr: { md: 5 } }}>
          <m.div variants={varFade().inUp}>
            <InputStyle
              size="small"
              value={searchString}
              onChange={handleSearchChange}
              placeholder="Search vehicles..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{ color: 'text.disabled', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{ ml: 1, width: '91%' }}
            />
            <Button variant='outlined' onClick={handleSearch}>Search</Button>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Brand</TableCell>
                    <TableCell align="right">Model</TableCell>
                    <TableCell align="right">Model Type</TableCell>
                    <TableCell align="right">Model Year</TableCell>
                    <TableCell align="right">Version</TableCell>
                    <TableCell align="right">PS</TableCell>
                    <TableCell align="right">HP</TableCell>
                    <TableCell align="right">ECU Type</TableCell>
                    <TableCell align="right">ECU Brand</TableCell>
                    <TableCell align="right">ECU Version</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vehicles.map((vehicle) => (
                    <Row key={vehicle._id} row={vehicle} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10]}
              rowsPerPage={pageSize}
              component="div"
              count={totalCount}
              page={page}
              onPageChange={handleChangePage}
            />
          </m.div>
        </Grid>
      </Grid>
    </Stack>
  );
}