import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isFontsizeLarge: false,
};

export const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    changeFontSize: (state) => {
      state.isFontsizeLarge = !state.isFontsizeLarge;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFontSize } = accessibilitySlice.actions;

export default accessibilitySlice.reducer;
