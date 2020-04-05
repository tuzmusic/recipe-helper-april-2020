import React, { MouseEvent } from 'react'
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Instruction } from "../models/Models";
import { decStep, incStep } from "../redux/cookingSessionSlice"

const CurrentStep = (props: { step: Instruction }) => {
  return <div>
    <h3>Current Step</h3>
    <p>{ props.step.text }</p>
  </div>
};

const CurrentStepContainer = connect(
  (state: RootState) => ({ step: state.cookingSession.instructions[state.cookingSession.currentStepIndex] })
)(CurrentStep);

type ClickHandler = (event: MouseEvent) => void

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

const CookingActivity = (props: CookingSessionState) => {
  return <div>
    {/* timers */ }
    <CurrentStepContainer/>
    <StepControlsContainer/>
  </div>
};
const CookingActivityContainer = connect((state: RootState) => state.cookingSession)(CookingActivity);

export default CookingActivityContainer
