import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define an enum for game modes
export enum GameMode {
  EnglishToSpanish = 'en-es',
  SpanishToEnglish = 'es-en',
}

// Define the state interface using the GameMode enum
interface GameState {
  gameMode: GameMode | undefined;
}

// Define the initial state using the GameState interface
const initialState: GameState = {
  gameMode: undefined,
};

export const gameModeSlice = createSlice({
  name: 'game-mode',
  initialState,
  reducers: {
    changeGameMode: (state, action: PayloadAction<GameMode>) => {
      state.gameMode = action.payload; // Using the enum as the type for the payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeGameMode } = gameModeSlice.actions;


export default gameModeSlice.reducer;
