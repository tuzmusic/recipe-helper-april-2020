import { combineReducers } from '@reduxjs/toolkit'
import cookingSession from './cookingSessionSlice'

const rootReducer = combineReducers({ cookingSession });

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

