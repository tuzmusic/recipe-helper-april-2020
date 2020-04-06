import React, { MouseEvent } from 'react'
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { CookingTimer, Instruction } from "../models/Models";
import { clearTimer, decStep, incStep, startTimer } from "../redux/cookingSessionSlice"

type ClickHandler = (event: MouseEvent) => void

const CurrentStep = ({ step, startTimer }: { step: Instruction, startTimer: (t: CookingTimer) => void }) => {
  return (
    <div style={ { border: "solid black thin", padding: 10 } }>
      <h2>Current Step</h2>
      <p>{ step.text }</p>
      { step.timers.length > 0 && <div>
          <p>Timers:</p>
        { step.timers.map(timer =>
          <button onClick={ () => startTimer(timer) }>Start "{ timer.label }"</button>) }
      </div> }
    </div>
  )
};

const CurrentStepContainer = connect(
  ({ cookingSession }: RootState) => ({
    step: cookingSession.instructions[cookingSession.currentStepIndex]
  }),
  { startTimer }
)
(CurrentStep);

const StepControls = ({ incStep, decStep }: { incStep: ClickHandler, decStep: ClickHandler }) => {
  return (
    <>
      <button onClick={ decStep }>{ "<<" }</button>
      { " " }
      <button onClick={ incStep }>{ ">>" }</button>
    </>
  )
};

const StepControlsContainer = connect(null, { decStep, incStep })(StepControls);

const ActiveTimers = ({ timers, clearTimer }: { timers: CookingTimer[], clearTimer: (t: CookingTimer) => void }) => {
  return <div>
    <h3>Active Timers</h3>
    { !timers.length ? "No timers." : timers.map(timer =>
      <div>{ timer.label }
        <span onClick={ () => clearTimer(timer) }> [X]</span>
      </div>
    ) }
  </div>
};

const ActiveTimersContainer = connect(
  ({ cookingSession }: RootState) => ({ timers: cookingSession.activeTimers }),
  { clearTimer }
)(ActiveTimers);

const CookingActivity = (props: CookingSessionState) => {
  return <div>
    <CurrentStepContainer/>
    <StepControlsContainer/>
    <ActiveTimersContainer/>
  </div>
};
const CookingActivityContainer = connect((state: RootState) => state.cookingSession)(CookingActivity);

export default CookingActivityContainer
