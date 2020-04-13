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
    selectAllSteps,
    getActualStepsToDisplay,
    selectCurrentStepIndex,
    getIndexForStep(step),
    getDisplayedIndexForStep(step),
    selectDisplayedStepsCount,
    getAtWhichIndexToDisplayTheCurrentStep, (
      recipeSteps,
      displayedSteps,
      currentIndex,
      thisRecipeIndex,
      thisDisplayIndex,
      stepsCount,
      indexAtWhichToDisplayCurrentStep
    ): Currentness => {
      
      // if we still need to show filler steps
      if (currentIndex < indexAtWhichToDisplayCurrentStep) {
        if (step instanceof FillerStep) {
          return (thisDisplayIndex < currentIndex) ? Currentness.Past : Currentness.Current;
        } else {
          const firstCurrent = currentIndex;
          const numberOfFillerSteps = displayedSteps.filter(s => s instanceof FillerStep).length
          // index of the first future step
          const lastCurrent = firstCurrent + stepsCount - 1// + (numberOfFillerSteps - currentIndex);
          console.table({
            indexAtWhichToDisplayCurrentStep,
            currentIndex,
            numberOfFillerSteps,
            firstCurrent,
            lastCurrent
          })
  
          if (thisDisplayIndex < firstCurrent) return Currentness.Past;
          if (thisDisplayIndex > lastCurrent) return Currentness.Future;
          return Currentness.Current;
        }
      }
      
      // if all the filler steps are already past
      else /* if (currentIndex >= indexAtWhichToDisplayCurrentStep) */{
        if (step instanceof FillerStep) return Currentness.Past
        
        // first index to be visible
        const firstCurrent = Math.max(0, currentIndex - Math.floor(stepsCount / 2));
        // ** These actually both appear to work, as far as that goes
        // const firstCurrent = Math.max(0, currentIndex - indexAtWhichToDisplayCurrentStep);
        
        // index of the first future step
        const firstFuture = firstCurrent + stepsCount;
        if (thisRecipeIndex < firstCurrent) return Currentness.Past;
        if (thisRecipeIndex >= firstFuture) return Currentness.Future;
        return Currentness.Current;
      }
      
    });
}

export const getAtWhichIndexToDisplayTheCurrentStep = createSelector(selectDisplayedStepsCount,
  (stepsCount): number => {
    // if steps count is odd, it should be the middle
    // if steps count is even, it should be one before the middle
    return Math.ceil(stepsCount / 2) - 1
  }
)

export const getActualStepsToDisplay = createSelector(selectAllSteps, selectDisplayedStepsCount, getAtWhichIndexToDisplayTheCurrentStep,
  (steps, stepsCount, fillerStepsNeeded): Instruction[] => {
    // In order to always have the current step in the middle,
    // (e.g., to prevent the first step from showing at the top
    // instead of the middle when it's the current step)
    // we need to insert "filler" steps above the first step.
    
    // add filler steps as needed
    const fillerStepsArray = (fillerStepsNeeded > 0) ?
      Array.from({ length: fillerStepsNeeded }, (_, i) => new FillerStep(i - fillerStepsNeeded))
      // Array(fillerStepsNeeded).fill(new FillerStep())
      : [];
    
    // add the current steps
    return [...fillerStepsArray, ...steps];
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
