import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import { CookingTimer, Instruction } from "../../models/Models";
import { CookingSessionState } from "../state/stateMap";

export enum Currentness {
  Past = -1,
  Current,
  Future
}

export const selectCookingSession = (state: RootState): CookingSessionState => state.cookingSession
export const selectAllSteps = (state: RootState): Instruction[] => state.cookingSession.instructions
export const selectCurrentStepIndex = (state: RootState): number => state.cookingSession.currentStepIndex

export const selectCurrentStep = createSelector(selectAllSteps, selectCurrentStepIndex, (steps, i): Instruction => steps[i])
export const selectCurrentStepTimers = createSelector(selectCurrentStep, ({ timers }): CookingTimer[] => timers)
export const selectDisplayedStepsCount = (state: RootState): number => state.prefs.displayedSteps

export const getIndexForStep = (step: Instruction) => {
  return createSelector(selectAllSteps,
    (steps: Instruction[]): number => steps.indexOf(step)
  )
}

export const getCurrentness = (step: Instruction) => {
  return createSelector(selectCurrentStepIndex, getIndexForStep(step),
    (currentIndex, thisIndex): Currentness =>
      (thisIndex < currentIndex) ? Currentness.Past :
        (thisIndex > currentIndex) ? Currentness.Future
          : Currentness.Current
  );
}

export const getShouldShowStep = (step: Instruction) => {
  return createSelector(selectCurrentStepIndex, getIndexForStep(step), selectDisplayedStepsCount,
    (currentIndex, thisIndex, stepsCount): Currentness => {
      // first index to be visible
      const firstCurrent = currentIndex - Math.floor(stepsCount / 2);
      // index of the first future step
      const firstFuture = Math.max(stepsCount, firstCurrent + stepsCount);
      if (thisIndex < firstCurrent) return Currentness.Past;
      if (thisIndex >= firstFuture) return Currentness.Future;
      return Currentness.Current;
    });
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(n, min))
