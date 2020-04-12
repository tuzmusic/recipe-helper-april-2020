import { combineReducers } from '@reduxjs/toolkit'
import cookingSession from './cookingSessionSlice'
import prefs from './prefsSlice'

const rootReducer = combineReducers({ cookingSession, prefs });

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

