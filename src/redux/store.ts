import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
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
