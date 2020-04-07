import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { initialCookingSessionState } from "./cookingSessionSlice";
import { cookies } from "../data/sampleRecipes";

const { ingredients, instructions, info: recipeInfo } = cookies();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cookingSession: {
      ...initialCookingSessionState,
      ingredients, instructions, recipeInfo
    }
  },
  middleware: getDefaultMiddleware().slice(0, 1) // leave out the middleware that checks for a serializable state.
});

if (process.env.NODE_ENV === 'development') {
  (module as any).hot?.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store
