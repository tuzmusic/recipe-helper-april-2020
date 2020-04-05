import React from 'react'
import { CookingSessionState } from "../redux/state/stateMap";
import { connect } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Instruction } from "../models/Models";

const CurrentStep = (props: { step: Instruction }) => {
  return <div>
    <p>{ props.step.text }</p>
  </div>
};

const CurrentStepContainer = connect(
  (state: RootState) => ({ step: state.cookingSession.instructions[state.cookingSession.currentStepIndex] })
)(CurrentStep);

const CookingActivity = (props: CookingSessionState) => {
  return <div>
    {/* timers */ }
    <CurrentStepContainer/>
    {/* step controls */ }
  </div>
};
const CookingActivityContainer = connect((state: RootState) => state.cookingSession)(CookingActivity);

export default CookingActivityContainer
