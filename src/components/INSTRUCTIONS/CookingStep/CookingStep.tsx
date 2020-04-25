import React from 'react';
import { FillerStep } from "../../../models/Models";
import { RootState } from "../../../redux/rootReducer";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { AppInstruction } from "../../../redux/state/stateMap";
import {
  Currentness,
  getIsStepTheCurrentStep,
  getNumberForStep,
  getShouldShowStep
} from "../../../redux/selectors/instructions.selectors";

// render differently based on whether it's the current step?
// whether it's higher or lower than the current step?

type Props = {
  step: AppInstruction
  pos?: Currentness
  number?: number
  isCurrentStep?: boolean
}
export const StepWrapper = styled.div<{ pos: Currentness, isCurrent: boolean }>({
  width: '100%',
  height: '100px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  transition: 'font-size 0.75s ease',
  // transition: 'top 2s ease',
}, ({ pos, isCurrent }) => ({
  fontWeight: isCurrent ? 'bold' : 'normal',
  fontSize: isCurrent ? 'x-large' : 'medium',
  top: pos * 100 + '%',
  position: pos === Currentness.Current ? 'relative' : 'absolute'
}))

const FillerDiv = styled.div<{ pos: Currentness }>({
    height: '100px',
  // border: 'solid blue thin',
    margin: '1px',
    width: '100%'
  }, ({ pos }) => ({
    top: pos * 100 + '%',
    position: pos === Currentness.Current ? 'relative' : 'absolute'
  })
)
export const CookingStep = ({ step, pos, number, isCurrentStep }: Props) =>
  (step instanceof FillerStep) ?
    <FillerDiv pos={ pos! }/> :
    <StepWrapper pos={ pos! } isCurrent={ isCurrentStep! }>
      { number! }. { step.text }
    </StepWrapper>

/* REDUX CONTAINER */

const selectProps = (state: RootState, { step }: Props) => ({
  pos: getShouldShowStep(step)(state),
  isCurrentStep: getIsStepTheCurrentStep(step)(state),
  number: getNumberForStep(step)(state)
})

const CookingStepContainer = connect(selectProps)(CookingStep)

export default CookingStepContainer
