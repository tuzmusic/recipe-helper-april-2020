import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientState, RecipeInfo } from "./state/stateMap";
import { CookingTimer, CookingTimerState, Ingredient, Instruction, Recipe, StepTimer } from "../models/Models";
import { getActiveTimers } from "./selectors/cookingSession.selectors";

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
  
    setTimerState(state, { payload }: PayloadAction<{ timer: StepTimer, timerState: CookingTimerState }>) {
      const { timer, timerState } = payload
      warnAboutTimerBug(state, payload)
      state.stepTimers
        .find(t => t.timerId === timer.timerId)!
        .state = timerState
    }
  }
});

const warnAboutTimerBug = (cookingSession: CookingSessionState, { timer, timerState }: { timer: StepTimer, timerState: CookingTimerState }) => {
  const activeTimerIndices = getActiveTimers({ cookingSession, prefs: { displayedSteps: 3 } }).map(t => t.stepIndex)
  if (timerState === CookingTimerState.Running && timer.stepIndex < Math.max(...activeTimerIndices))
    console.error('KNOWN BUG: ' +
      'Adding a timer from a step earlier than a current running timer ' +
      'sets the wrong time for the newly added timer!')
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
