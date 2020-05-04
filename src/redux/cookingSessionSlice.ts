import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppInstruction,
  AppStepTimer,
  CookingTimerState,
  IngredientState,
  RecipeInfo,
  RecipeIngredient,
} from "./state/stateMap";
import { Recipe } from "../models/RecipeModel";
import { RecipeJSON } from "../types/parser.types";

export const initialCookingSessionState = {
  recipeInfo: null as RecipeInfo | null,
  instructions: [] as AppInstruction[],
  ingredients: [] as RecipeIngredient[],
  stepTimers: [] as AppStepTimer[],
  // activeTimers: [] as CookingTimer[],
  currentStepIndex: 0 as number,
};
export type CookingSessionState = typeof initialCookingSessionState

const cookingSessionSlice = createSlice({
  name: 'session',
  initialState: initialCookingSessionState,
  reducers: {
    startRecipe(state, { payload: recipeJson }: PayloadAction<RecipeJSON>) {
      const recipe = Recipe.createRecipeFromJson(recipeJson)
      const { info, instructions, ingredients, timers } = recipe;
      state.recipeInfo = info;
      state.ingredients = [...ingredients];
      state.instructions = [...instructions]
      state.stepTimers = [...timers];
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
      PayloadAction<{ ingredient: RecipeIngredient, stateKey: keyof IngredientState }>) {
      const { ingredient, stateKey } = payload;
      // todo: this assumes we're actually passing the ingredient and not a copy of
      //  its info. or something like that.
      ingredient.state[stateKey] = !ingredient.state[stateKey]
    },
    
    setTimerState(state, { payload }: PayloadAction<{ timer: AppStepTimer, timerState: CookingTimerState }>) {
      const { timer, timerState } = payload
      const timerInStore = state.stepTimers.find(t => t.id === timer.id)!
      timerInStore.state = timerState
    }
  }
});

export const {
  startRecipe,
  incStep, decStep, goToStep,
  toggleIngredientState,
  setTimerState,
} = cookingSessionSlice.actions;
export default cookingSessionSlice.reducer

/* Convenience actions */

export const toggleDone = (ingredient: RecipeIngredient) => toggleIngredientState({ ingredient, stateKey: 'done' });
