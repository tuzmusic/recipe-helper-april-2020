import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientState, RecipeInfo } from "./state/stateMap";
import { CookingTimer, CookingTimerState, Ingredient, Instruction, Recipe, StepTimer } from "../models/Models";

export const initialCookingSessionState = {
  recipeInfo: null as RecipeInfo | null,
  instructions: [] as Instruction[],
  ingredients: [] as Ingredient[],
  activeTimers: [] as CookingTimer[],
  currentStepIndex: 0 as number,
  stepTimers: [] as StepTimer[]
};
export type CookingSessionState = typeof initialCookingSessionState

const cookingSessionSlice = createSlice({
  name: 'session',
  initialState: initialCookingSessionState,
  reducers: {
    startRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
      const { info, instructions, ingredients } = recipe;
      state.recipeInfo = info;
      state.ingredients = [...ingredients];
      state.instructions = [...instructions]
  
      state.stepTimers = [];
  
      state.instructions.forEach(({ timers }, stepIndex) => {
        timers.forEach(timer =>
          state.stepTimers.push({
            ...timer,
            timerId: state.stepTimers.length,
            stepIndex,
            state: CookingTimerState.Pending,
          })
        )
      })
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
    startTimer(state, { payload: timer }: PayloadAction<StepTimer>) {
      state.stepTimers
        .find(t => t.timerId === timer.timerId)!
        .state = CookingTimerState.Running
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
