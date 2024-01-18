// RegistrationForm.tsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitFormData,
  selectFormData,
  submitStep2,
  submitStep1,
  submitUser,
  User,
} from '../Component/Redux/reducer/formSlice';
import Step2Form, { Step2FormValues } from './Step2Form';
import Step1Form from './Step1Form';
import TableUser from './TableUser';
import SuccessPage from './SuccessPage';
// jquery.d.ts

const RegistrationForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const step1Values = useSelector(selectFormData);
  
  const submittedUsers = useSelector((state: any) => state.form.submittedUsers);
// RegistrationForm.tsx
const handleStep2Submit = (values: Step2FormValues) => {
  dispatch(submitStep2(values));

  const allFormValues = {
    step1Data: step1Values.step1Data,
    step2Data: values,
    submittedUsers: [] // Add this line
  };
  

  dispatch(submitFormData(allFormValues));


  const user: User = {
    id: Date.now(),
    name: step1Values.step1Data?.name || '',
    age: step1Values.step1Data?.age || '',
    sex: step1Values.step1Data?.sex || '', // Add appropriate value
    mobile: step1Values.step1Data?.mobile || '', // Add appropriate value
    govIdType: step1Values.step1Data?.govIdType || '', // Add appropriate value
    govId: step1Values.step1Data?.govId || '', // Add appropriate value
    address: values.address || '', // Add appropriate value
    state: values.state || '', // Add appropriate value
    city: values.city || '', // Add appropriate value
    country: values.country || '', // Add appropriate value
    pincode: values.pincode || '', // Add appropriate value
  };
  
  dispatch(submitUser(user));
  
  navigate('/success');
};



  const handleStep1Next = (values: any) => {
    
    const table = $('#userTable').DataTable();
    dispatch(submitStep1(values));
    navigate('/step-2');
    table.destroy();
  };


  useEffect(() => {
  
    return () => {
      // Destroy DataTable instance or perform cleanup if needed
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/step-1" element={<Step1Form onNext={handleStep1Next} />} />
        <Route path="/step-2" element={<Step2Form onSubmit={handleStep2Submit} />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route index element={<Navigate to="/step-1" />} />
      </Routes>

      {/* UserTable component for Datatables.net */}
  
  
    </>
  );
};

export default RegistrationForm;
