import { RootState } from "../rootReducer";
import { createSelector } from "@reduxjs/toolkit";
import { AppStepTimer, CookingTimerState } from "../state/stateMap";
import { selectCurrentStepIndex } from "./instructions.selectors";

export const selectAllTimers = (state: RootState): AppStepTimer[] => state.cookingSession.stepTimers;

export const selectCurrentStepTimers = createSelector(selectCurrentStepIndex, selectAllTimers,
  (stepIndex, timers): AppStepTimer[] => timers.filter(
    timer => timer.stepIndex === stepIndex && timer.state === CookingTimerState.Pending
  )
)

export const getActiveTimers = createSelector(selectAllTimers,
  (timers): AppStepTimer[] =>
    timers.filter(t => t.state !== CookingTimerState.Pending && t.state !== CookingTimerState.Done
    )
)

export const getDoneTimers = createSelector(selectAllTimers,
  (timers): AppStepTimer[] => timers.filter(
    t => t.state === CookingTimerState.Done
    // || t.state === CookingTimerState.Pending
  )
)

// not actually a selector!
export const getTimerStr = (durationSec: number): string => {
  const min = Math.floor(durationSec) / 60
  const sec = (durationSec % 60).toString().padStart(2, '0')
  return `${ min }:${ sec }`
}

// const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(n, min))
