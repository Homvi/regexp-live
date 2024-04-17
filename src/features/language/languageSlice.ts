import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from '../../../LanguageContent'

interface State {
  language: LanguageCode;
}

const initialState: State = {
  language: 'en', // default language
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state: State, action: PayloadAction<LanguageCode>) => {
      state.language = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
