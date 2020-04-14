import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import { CookingTimer, FillerStep, Instruction } from "../../models/Models";
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

export const getDisplayedIndexForStep = (step: Instruction) => {
  return createSelector(getActualStepsToDisplay,
    (steps): number => {
      return steps.indexOf(step);
    }
  )
}

export const getShouldShowStep = (step: Instruction) => {
  return createSelector(
    selectCurrentStepIndex,
    getIndexForStep(step),
    getDisplayedIndexForStep(step),
    selectDisplayedStepsCount,
    getAtWhichIndexToDisplayTheCurrentStep,
    selectAllSteps, (
      currentIndex,
      thisRecipeIndex,
      thisDisplayIndex,
      dispStepsCount,
      indexAtWhichToDisplayCurrentStep,
      recipeSteps
    ): Currentness => {
    
      const showingFillersStepsAtStart = currentIndex < indexAtWhichToDisplayCurrentStep;
      const showingFillerStepsAtEnd = currentIndex > (recipeSteps.length - indexAtWhichToDisplayCurrentStep - 1)
      const showingFillerSteps = showingFillersStepsAtStart || showingFillerStepsAtEnd;
      const firstCurrent = showingFillerSteps
        ? currentIndex
        : Math.max(0, currentIndex - indexAtWhichToDisplayCurrentStep);
      const lastCurrent = firstCurrent + dispStepsCount - 1
    
      const relevantIndex = showingFillerSteps ? thisDisplayIndex : thisRecipeIndex
      if (relevantIndex < firstCurrent) return Currentness.Past;
      if (relevantIndex > lastCurrent) return Currentness.Future;
      else return Currentness.Current;
    });
}

export const getAtWhichIndexToDisplayTheCurrentStep = createSelector(selectDisplayedStepsCount,
  (stepsCount): number => {
    // if steps count is odd, it should be the middle
    // if steps count is even, it should be one before the middle
    return Math.ceil(stepsCount / 2) - 1
  }
)

export const getActualStepsToDisplay = createSelector(selectAllSteps, getAtWhichIndexToDisplayTheCurrentStep,
  (steps, fillerStepsNeeded): Instruction[] => {
    // In order to always have the current step in the middle,
    // (e.g., to prevent the first step from showing at the top
    // instead of the middle when it's the current step)
    // we need to insert "filler" steps above the first step.
    const createFillerStepsArray = (): FillerStep[] =>
      Array.from({ length: fillerStepsNeeded }, (_, i) => new FillerStep(Math.random()));
    // add filler steps as needed
    const fillerStepsArray = (fillerStepsNeeded <= 0) ? [] :
      Array.from({ length: fillerStepsNeeded }, (_, i) => new FillerStep(i - fillerStepsNeeded));
    
    // add the current steps
    return [...createFillerStepsArray(), ...steps, ...createFillerStepsArray()]//, ...fillerStepsArray];
  }
)

export const getNumberForStep = (step: Instruction) => {
  return createSelector(selectAllSteps,
    (steps): number => steps.indexOf(step) + 1)
}

export const getIsStepTheCurrentStep = (step: Instruction) => {
  return createSelector(selectAllSteps, selectCurrentStepIndex,
    (steps, currIndex): boolean => steps.indexOf(step) === currIndex)
}

// const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(n, min))
