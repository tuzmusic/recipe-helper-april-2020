import React from 'react';
import { Instruction } from "../../models/Models";
import { RootState } from "../../redux/rootReducer";
import { Currentness, getCurrentness } from "../../redux/selectors/cookingSession.selectors";
import { connect } from "react-redux";
import styled from "@emotion/styled";

// render differently based on whether it's the current step?
// whether it's higher or lower than the current step?

type Props = {
  step: Instruction
  currentness?: Currentness
}
export const CookingStep = ({ step, currentness }: Props) => {
  
  const StepWrapper = styled.div({
    width: '100%',
    background: 'lightgrey',
    height: '100px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '1s ease',
    left: currentness! * 100 + '%'
  })
  
  return <StepWrapper children={ step.text }/>
}

/* CONTAINER */

const selectProps = (state: RootState, ownProps: Props) =>
  ({ currentness: getCurrentness(ownProps.step)(state) })

const CookingStepContainer = connect(selectProps)(CookingStep)

export default CookingStepContainer
