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

interface Step2FormValues {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const initialState: FormState = {
  step1Data: null,
  step2Data: null,
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
    submitFormData: (state, action: PayloadAction<FormState>) => {
      // Create a new state object to avoid issues with immer
      return {
        ...state,
        step1Data: action.payload.step1Data,
        step2Data: action.payload.step2Data,
      };
     
    },
  },
});
export const { submitStep1, submitStep2, submitFormData } = formSlice.actions;

export const selectStep1Data = (state: RootState): Step1FormValues | null => state.form.step1Data;
export const selectStep2Data = (state: RootState): Step2FormValues | null => state.form.step2Data;
export const selectFormData = (state: RootState): FormState => state.form;

export default formSlice.reducer;
