import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CookingSessionState, IngredientState } from "./state/stateMap";
import { Ingredient, Recipe } from "../models/Models";

const initialState: CookingSessionState = {
  recipeInfo: null,
  instructions: [],
  ingredients: [],
  activeTimers: [],
  currentStepId: 0
};

const cookingSessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
      const { info, instructions, ingredients } = recipe;
      state.ingredients = ingredients;
      state = { ...state, recipeInfo: info, ingredients, instructions }
    },
    
    incStep(state) { state.currentStepId++ },
    decStep(state) { state.currentStepId-- },
    goToStep(state, { payload: stepNum }: PayloadAction<number>) {
      state.currentStepId = stepNum
    },
    
    toggleIngredientState(state, { payload }:
      PayloadAction<{ ingredient: Ingredient, stateKey: keyof IngredientState }>) {
      const { ingredient, stateKey } = payload;
      // todo: this assumes we're actually passing the ingredient and not a copy of
      //  its info. or something like that.
      ingredient.state[stateKey] = !ingredient.state[stateKey]
    }
    
    // todo: timer actions
  }
});

export const {
  startRecipe,
  incStep, decStep, goToStep,
  toggleIngredientState
} = cookingSessionSlice.actions;
export default cookingSessionSlice.reducer
