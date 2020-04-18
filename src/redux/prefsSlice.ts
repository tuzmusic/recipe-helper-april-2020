import { createSlice } from "@reduxjs/toolkit";

type PrefsState = {
  displayedSteps: number,
}

const initialPrefsState: PrefsState = {
  displayedSteps: 3
}

const prefsSlice = createSlice({
  name: 'prefs',
  initialState: initialPrefsState,
  reducers: {
    showMoreSteps({ displayedSteps }) { displayedSteps++ },
    showFewerSteps({ displayedSteps }) {
      if (displayedSteps > 1) displayedSteps--
    },
  }
})

export const { showFewerSteps, showMoreSteps } = prefsSlice.actions

export default prefsSlice.reducer;
