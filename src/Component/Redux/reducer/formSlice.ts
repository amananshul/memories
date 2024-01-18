// formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FormState {
  step1Data: Step1FormValues | null;
  step2Data: Step2FormValues | null;
}

interface Step1FormValues {
  name: string;
  age: string;
  sex: string;
  mobile: string;
  govIdType: string;
  govId: string;
}
export interface User {
  id: number;
  name: string;
  age: string;
  sex: string;
  mobile: string;
  govIdType: string;
  govId: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

interface Step2FormValues {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

interface FormState {
  step1Data: Step1FormValues | null;
  step2Data: Step2FormValues | null;
  submittedUsers: User[]; // Add a new field to store submitted users
}


const initialState: FormState = {
  step1Data: null,
  step2Data: null,
  submittedUsers: [], // Initialize the array
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    submitStep1: (state, action: PayloadAction<Step1FormValues>) => {
      state.step1Data = action.payload;
    },
    submitStep2: (state, action: PayloadAction<Step2FormValues>) => {
      state.step2Data = action.payload;
    },
    submitFormData: (state, action: PayloadAction<{ step1Data: Step1FormValues | null; step2Data: any }>) => {
      state.step1Data = action.payload.step1Data;
      state.step2Data = action.payload.step2Data;
    },
    submitUser: (state, action: PayloadAction<User>) => {
      state.submittedUsers.push(action.payload);
    },
  },
});
export const { submitStep1, submitStep2, submitFormData } = formSlice.actions;

export const selectStep1Data = (state: RootState): Step1FormValues | null => state.form.step1Data;
export const selectStep2Data = (state: RootState): Step2FormValues | null => state.form.step2Data;
export const selectFormData = (state: RootState): FormState => state.form;
export const { submitUser } = formSlice.actions;
export default formSlice.reducer;
