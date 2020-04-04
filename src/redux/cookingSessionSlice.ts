import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CookingSessionState, IngredientState } from "./state/stateMap";
import { CookingTimer, Ingredient, Recipe } from "../models/Models";

export const initialCookingSessionState: CookingSessionState = {
  recipeInfo: null,
  instructions: [],
  ingredients: [],
  activeTimers: [],
  currentStepIndex: 0
};

const cookingSessionSlice = createSlice({
  name: 'session',
  initialState: initialCookingSessionState,
  reducers: {
    startRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
      const { info, instructions, ingredients } = recipe;
      state.recipeInfo = info;
      state.ingredients = [...ingredients];
      state.instructions = [...instructions]
    },
    
    incStep(state) {
      if (state.currentStepIndex + 1 < state.instructions.length)
        state.currentStepIndex++
    },
    decStep(state) {
      if (state.currentStepIndex > 0)
        state.currentStepIndex--
    },
    goToStep(state, { payload: stepNum }: PayloadAction<number>) {
      if (stepNum >= 0 && stepNum < state.instructions.length)
        state.currentStepIndex = stepNum
    },
    
    toggleIngredientState(state, { payload }:
      PayloadAction<{ ingredient: Ingredient, stateKey: keyof IngredientState }>) {
      const { ingredient, stateKey } = payload;
      // todo: this assumes we're actually passing the ingredient and not a copy of
      //  its info. or something like that.
      ingredient.state[stateKey] = !ingredient.state[stateKey]
    },
    
    // todo: timer actions
    startTimer(state, { payload: timer }: PayloadAction<CookingTimer>) {
      // timer.start()
      state.activeTimers.push(timer)
    },
    pauseTimer(state, { payload: timer }: PayloadAction<CookingTimer>) {
      // timer.stop()
    },
    clearTimer(state, { payload: timer }: PayloadAction<CookingTimer>) {
      // timer.stop()
      const timers = state.activeTimers;
      timers.splice(timers.indexOf(timer), 1)
    },
    
  }
});

export const {
  startRecipe,
  incStep, decStep, goToStep,
  toggleIngredientState,
  startTimer, clearTimer, pauseTimer
} = cookingSessionSlice.actions;
export default cookingSessionSlice.reducer

/* Convenience actions */

export const toggleDone = (ingredient: Ingredient) => toggleIngredientState({ ingredient, stateKey: 'done' });
