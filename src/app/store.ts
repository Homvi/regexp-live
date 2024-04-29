import { configureStore } from '@reduxjs/toolkit';
import changeLanguageReducer from '../features/language/languageSlice';
import accessabilityReducer from '../features/accessibility/accessibilitySlice';
import gameModeReducer from '../features/game/gameModeSlice';

export const store = configureStore({
  reducer: {
    language: changeLanguageReducer,
    accessibility: accessabilityReducer,
    gameMode: gameModeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const selectIsFontSizeLarge = (state: RootState) =>
  state.accessibility.isFontsizeLarge;
export const selectGameMode = (state: RootState) => state.gameMode.gameMode;
