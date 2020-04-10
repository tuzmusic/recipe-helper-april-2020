import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import { CookingTimer, Instruction } from "../../models/Models";
import { CookingSessionState } from "../state/stateMap";

export enum Currentness {
  Left = -1,
  Current,
  Right
}

export const selectCookingSession = (state: RootState): CookingSessionState => state.cookingSession
export const selectAllSteps = (state: RootState): Instruction[] => state.cookingSession.instructions
export const selectCurrentStepIndex = (state: RootState): number => state.cookingSession.currentStepIndex

export const selectCurrentStep = createSelector(selectAllSteps, selectCurrentStepIndex, (steps, i): Instruction => steps[i])
export const selectCurrentStepTimers = createSelector(selectCurrentStep, ({ timers }): CookingTimer[] => timers)

export const getIndexForStep = (step: Instruction) => {
  return createSelector(selectAllSteps,
    (steps: Instruction[]): number => steps.indexOf(step)
  )
}

export const getCurrentness = (step: Instruction) => {
  return createSelector(selectCurrentStepIndex, getIndexForStep(step),
    (currentIndex, thisIndex): Currentness =>
      (thisIndex < currentIndex) ? Currentness.Left :
        (thisIndex > currentIndex) ? Currentness.Right
          : Currentness.Current
  )
}
