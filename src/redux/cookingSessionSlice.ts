import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppIngredient, AppInstruction, AppStepTimer, IngredientState, RecipeInfo, RecipeJSON } from "./state/stateMap";
import { CookingTimerState, Ingredient, Recipe } from "../models/Models";
import { getActiveTimers } from "./selectors/cookingSession.selectors";

export const initialCookingSessionState = {
  recipeInfo: null as RecipeInfo | null,
  instructions: [] as AppInstruction[],
  ingredients: [] as AppIngredient[],
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
      const recipe = Recipe.parseJsonToJson(recipeJson)
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
      PayloadAction<{ ingredient: Ingredient, stateKey: keyof IngredientState }>) {
      const { ingredient, stateKey } = payload;
      // todo: this assumes we're actually passing the ingredient and not a copy of
      //  its info. or something like that.
      ingredient.state[stateKey] = !ingredient.state[stateKey]
    },
  
    setTimerState(state, { payload }: PayloadAction<{ timer: AppStepTimer, timerState: CookingTimerState }>) {
      const { timer, timerState } = payload
      warnAboutTimerBug(state, payload)
      const timerInStore = state.stepTimers
        .find(t => t.id === timer.id)!
      timerInStore.state = timerState
    }
  }
});

const warnAboutTimerBug = (cookingSession: CookingSessionState, { timer, timerState }: { timer: AppStepTimer, timerState: CookingTimerState }) => {
  const activeTimerIndices = getActiveTimers({ cookingSession, prefs: { displayedSteps: 3 } }).map(t => t.stepIndex)
  if (timerState === CookingTimerState.Running && timer.stepIndex < Math.max(...activeTimerIndices)) {
    let str = 'KNOWN BUG: '
    str += 'Adding a timer from a step earlier than a current running timer '
    str += 'sets the wrong time for the newly added timer! '
    alert(str)
  }
}

export const {
  startRecipe,
  incStep, decStep, goToStep,
  toggleIngredientState,
  setTimerState,
} = cookingSessionSlice.actions;
export default cookingSessionSlice.reducer

/* Convenience actions */

export const toggleDone = (ingredient: Ingredient) => toggleIngredientState({ ingredient, stateKey: 'done' });
