import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  name: '',
  email: '',
  message: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: { 
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
