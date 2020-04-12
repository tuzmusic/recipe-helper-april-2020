import React from 'react';
import { Instruction } from "../../models/Models";
import { RootState } from "../../redux/rootReducer";
import { Currentness, getShouldShowStep } from "../../redux/selectors/cookingSession.selectors";
import { connect } from "react-redux";
import styled from "@emotion/styled";

// render differently based on whether it's the current step?
// whether it's higher or lower than the current step?

type Props = {
  step: Instruction
  currentness?: Currentness,
  number: number
}
const StepWrapper = styled.div<{ currentness: Currentness }>({
  width: '100%',
  height: '100px',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  transition: '0.5s ease',
}, ({ currentness }) => ({ top: currentness * 100 + '%' }))

export const CookingStep = ({ step, currentness, number }: Props) =>
  <StepWrapper currentness={ currentness! }
               children={ `${ number }. ${ step.text }` }
  />

/* CONTAINER */

const selectProps = (state: RootState, ownProps: Props) =>
  ({ currentness: getShouldShowStep(ownProps.step)(state) })

const CookingStepContainer = connect(selectProps)(CookingStep)

export default CookingStepContainer
