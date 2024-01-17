// Step1Form.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitStep1 } from '../Component/Redux/reducer/formSlice';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Box, Grid } from '@material-ui/core';

export interface Step1FormValues {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  govIdType: string;
  govId: string;
}

interface Step1FormProps {
  onNext: (values: Step1FormValues) => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ onNext }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      sex: '',
      mobile: '',
      govIdType: '',
      govId: '',
    } as Step1FormValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
      age: Yup.number().required('Age is required').positive('Age must be a positive integer'),
      sex: Yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid Sex'),
      mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid Indian Mobile Number'),
      govIdType: Yup.string().required('Govt Issued ID Type is required').oneOf(['Aadhar', 'PAN'], 'Invalid ID Type'),
      govId: Yup.string().when("govIdType", {
        is: (val: any) => val === "Aadhar",
        then: () => Yup.string()
          .matches(/^[2-9]\d{11}$/, 'Aadhar number must be 12 digits')
          .notOneOf(['01'], 'Aadhar number cannot start with 0 or 1')
          .required('Aadhar number is required')
      }),
    }),
    onSubmit: (values: Step1FormValues) => {
      onNext(values);
      navigate('/step-2');
    },
  });

  const handleNextClick = async () => {
    try {
      await formik.validateForm();
      formik.submitForm(); // Use submitForm instead of handleSubmit
    } catch (errors) {
      // Handle validation errors (errors object contains validation messages)
      console.error('Validation errors:', errors);
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
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="age"
              label="Age"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('age')}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="sex"
              label="Sex"
              select
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('sex')}
              error={formik.touched.sex && Boolean(formik.errors.sex)}
              helperText={formik.touched.sex && formik.errors.sex}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="mobile"
              label="Mobile"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('mobile')}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="govIdType"
              label="Govt Issued ID Type"
              select
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('govIdType')}
              error={formik.touched.govIdType && Boolean(formik.errors.govIdType)}
              helperText={formik.touched.govIdType && formik.errors.govIdType}
            >
              <MenuItem value="Aadhar">Aadhar</MenuItem>
              <MenuItem value="PAN">PAN</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              id="govId"
              label="Govt Issued ID"
              variant="outlined"
              fullWidth
              {...formik.getFieldProps('govId')}
              error={formik.touched.govId && Boolean(formik.errors.govId)}
              helperText={formik.touched.govId && formik.errors.govId}
            />
          </Grid>
        </Grid>
       <Box>
       <Button variant="contained" color="primary" type="button" onClick={handleNextClick}>
          Next
        </Button>
       </Box>
      </Box>
    </form>
  );
};

export default Step1Form;
