import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import { CookingTimerState, FillerStep, Instruction, StepTimer } from "../../models/Models";
import { CookingSessionState } from "../cookingSessionSlice";

export enum Currentness {
  Past = -1,
  Current,
  Future
}

export const selectCookingSession = (state: RootState): CookingSessionState => state.cookingSession
export const selectAllSteps = (state: RootState): Instruction[] => state.cookingSession.instructions
export const selectAllTimers = (state: RootState): StepTimer[] => state.cookingSession.stepTimers;
export const selectCurrentStepIndex = (state: RootState): number => state.cookingSession.currentStepIndex

export const selectCurrentStep = createSelector(selectAllSteps, selectCurrentStepIndex, (steps, i): Instruction => steps[i])
export const selectDisplayedStepsCount = (state: RootState): number => state.prefs.displayedSteps

export const selectCurrentStepTimers =
  createSelector(selectCurrentStepIndex, selectAllTimers,
    (stepIndex, timers): StepTimer[] => timers.filter(
      timer => timer.stepIndex === stepIndex && timer.state === CookingTimerState.Pending
    ))

export const getActiveTimers = createSelector(selectAllTimers,
  (timers): StepTimer[] => timers.filter(t =>
    t.state !== CookingTimerState.Pending && t.state !== CookingTimerState.Done
  ))

export const getDingingTimers = createSelector(selectAllTimers,
  (timers): StepTimer[] => timers.filter(t => t.state === CookingTimerState.Done)
)

export const getIndexForStep = (step: Instruction) => {
  return createSelector(selectAllSteps,
    (steps: Instruction[]): number => steps.indexOf(step)
  )
}

export const getDisplayedIndexForStep = (step: Instruction) => {
  return createSelector(getActualStepsToDisplay,
    (steps): number => steps.indexOf(step)
  )
}

export const getNumberForStep = (step: Instruction) => {
  return createSelector(getIndexForStep(step),
    (index): number => index + 1
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
      fillerStepsCount,
      recipeSteps
    ): Currentness => {
      
      // are we at the beginning or and and need to show the filler steps?
      const showingFillersStepsAtStart = currentIndex < fillerStepsCount;
      const showingFillerStepsAtEnd = currentIndex >= (recipeSteps.length - fillerStepsCount)
      const showingFillerSteps = showingFillersStepsAtStart || showingFillerStepsAtEnd;
      
      // get the indexes of the top and bottom displayed steps
      const firstCurrent = showingFillerSteps
        ? currentIndex
        : Math.max(0, currentIndex - fillerStepsCount);
      const lastCurrent = firstCurrent + dispStepsCount - 1
      
      // determine position based on whether the step is between the top and bottom displayed step,
      // using the relevant index depending on whether we're showing the filter steps.
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
  
    // to get the right index of the otherwise-identical filler steps (we need it in
    // getDisplayedIndexForStep), we need *some* different value in each one.
    const createFillerStepsArray = (): FillerStep[] =>
      Array.from({ length: fillerStepsNeeded }, (_, i) => new FillerStep(Math.random()));
  
    // pad the current steps with the filler steps and return
    return [createFillerStepsArray(), steps, createFillerStepsArray()].flat()
  }
)

export const getIsStepTheCurrentStep = (step: Instruction) => {
  return createSelector(selectAllSteps, selectCurrentStepIndex,
    (steps, currIndex): boolean => steps.indexOf(step) === currIndex)
}

// const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(n, min))
