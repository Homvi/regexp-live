import { configureStore } from '@reduxjs/toolkit';
import changeLanguageReducer from '../features/language/languageSlice';
import accessabilityReducer from '../features/accessibility/accessibilitySlice';

export const store = configureStore({
  reducer: {
    language: changeLanguageReducer,
    accessibility: accessabilityReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
