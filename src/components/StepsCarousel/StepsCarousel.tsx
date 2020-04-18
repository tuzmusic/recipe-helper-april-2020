import CookingStepContainer from "../CookingStep/CookingStep";
import React from "react";
import styled from "@emotion/styled";
import { Instruction } from "../../models/Models";
import { ClickHandler } from "../../types/utility.types";
import { CenterFlexColumn, CenterFlexRow } from "../UtilityComponents";

// const CarouselWrapper = styled(CenterFlexRow)({})

const CarouselWrapper = ({ children }: any) =>
  <CenterFlexRow bordered padding fullWidth
                 children={ children }/>

const Arrow = styled(CenterFlexRow)({
  width: '40px',
  height: '40px',
  fontSize: '30px',
  borderRadius: '200%',
  // fontWeight: 'bold',
  border: 'black solid thin',
  userSelect: 'none',
})

const StepsWrapper = styled(CenterFlexColumn)({
  width: '100%',
  height: '200px',
  margin: '10px',
  overflow: 'hidden'
})

type Props = {
  steps: Instruction[]
  incStep: ClickHandler
  decStep: ClickHandler
  currentStepIndex: number
  indexAtWhichToDisplayCurrentStep: number
}

const ArrowsWrapper = styled(CenterFlexColumn)()

const StepsCarousel = ({ steps, incStep, decStep, currentStepIndex, indexAtWhichToDisplayCurrentStep }: Props) => {
  return <CarouselWrapper>
    <StepsWrapper>{
      steps.map((step, i) => <CookingStepContainer step={ step } key={ i }/>)
    }</StepsWrapper>
    <ArrowsWrapper>
      <Arrow onClick={ decStep } vMargin>{ "⬆" }</Arrow>
      <Arrow onClick={ incStep } vMargin>{ "⬇" }</Arrow>
    </ArrowsWrapper>
  </CarouselWrapper>;
}

export default StepsCarousel
