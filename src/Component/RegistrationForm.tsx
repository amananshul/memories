// RegistrationForm.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Step1Form, { Step1FormValues } from './Step1Form';
import Step2Form, { Step2FormValues } from './Step2Form';
import { useDispatch, useSelector } from 'react-redux';
import { submitFormData, selectFormData, submitStep2, submitStep1, selectStep1Data } from '../Component/Redux/reducer/formSlice';

const SuccessPage: React.FC = () => (
    <div>
      <h2>Form Submitted Successfully!</h2>
    </div>
  );
  
const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector(selectFormData);
  console.log('Form Data:', formData);
  const step1Values = useSelector(selectStep1Data);

  const handleStep2Submit = (values: Step2FormValues) => {
    dispatch(submitStep2(values));

    const formData: any = {
      step1Data: step1Values,
      step2Data: values,
    };

    dispatch(submitFormData(formData));
    navigate('/success');
  };

  const handleStep1Next = (values: Step1FormValues) => {
    dispatch(submitStep1(values));
    navigate('/step-2');
  };

  return (
    <Routes>
      <Route
        path="/step-1"
        element={<Step1Form onNext={handleStep1Next} />}
      />
      <Route
        path="/step-2"
        element={<Step2Form onSubmit={handleStep2Submit} />}
      />
      <Route
        path="/success"
        element={<SuccessPage />}
      />
      <Route
        index
        element={<Navigate to="/step-1" />}
      />
    </Routes>
  );
};

export default RegistrationForm;
