import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Box, Grid } from '@material-ui/core';

export interface Step2FormValues {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const Step2Form: React.FC<{ onSubmit: any }> = ({ onSubmit }) => {
  const [countries, setCountries] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      address: '',
      state: '',
      city: '',
      country: '',
      pincode: '',
    } as Step2FormValues,
    validationSchema: Yup.object({
      address: Yup.string().required('Address is required'),
      state: Yup.string().required('State is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      pincode: Yup.string().matches(/^[0-9]*$/, 'Pincode must be numeric'),
    }),
    onSubmit: onSubmit,
  });

  // Fetch countries from the API as the user types
  const fetchCountries = async (searchTerm: string) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
      const countryNames = response.data.map((country: any) => country.name.common);
      setCountries(countryNames);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          bgcolor: '#f0f0f0', // Grey background color
          padding: '20px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('address')}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="state"
              label="State"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('state')}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('city')}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Autocomplete
              id="country"
              options={countries}
              fullWidth
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  {...formik.getFieldProps('country')}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
              onInputChange={(event, value) => fetchCountries(value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="pincode"
              label="Pincode"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('pincode')}
              error={formik.touched.pincode && Boolean(formik.errors.pincode)}
              helperText={formik.touched.pincode && formik.errors.pincode}
            />
          </Grid>
        </Grid>
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default Step2Form;
