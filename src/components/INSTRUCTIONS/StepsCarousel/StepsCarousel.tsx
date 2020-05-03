import CookingStepContainer from "../CookingStep/CookingStep";
import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { ClickHandler } from "../../../types/utility.types";
import { CenterFlexColumn, CenterFlexRow } from "../../UtilityComponents";
import { AppInstruction } from "../../../redux/state/stateMap";

// const CarouselWrapper = styled(CenterFlexRow)({})

const CarouselWrapper = styled(CenterFlexRow)({})

const Arrow = styled(CenterFlexRow)({
  width: '40px',
  height: '40px',
  fontSize: '30px',
  borderRadius: '200%',
  border: 'black solid thin',
  userSelect: 'none',
  margin: '10px'
})

const StepsWrapper = styled(CenterFlexColumn)({
  width: '100%',
  height: '200px',
  margin: '10px',
  overflow: 'hidden'
})

type Props = {
  steps: AppInstruction[]
  incStep: ClickHandler
  decStep: ClickHandler
  currentStepIndex: number
  indexAtWhichToDisplayCurrentStep: number
}

const ArrowsWrapper = styled(CenterFlexColumn)()

const StepsCarousel = ({ steps, incStep, decStep }: Props) => {
  
  useEffect(() => {
    window.addEventListener('keydown', (e => {
      if (e.key === 'ArrowUp') decStep()
      if (e.key === 'ArrowDown') incStep()
    }))
  }, [incStep, decStep])
  
  return <CarouselWrapper fullWidth>
    <StepsWrapper>{
      steps.map((step, i) => <CookingStepContainer step={ step } key={ i }/>)
    }</StepsWrapper>
    <ArrowsWrapper>
      <Arrow onClick={ decStep } data-testid={ 'up arrow' }>{ "⬆" }</Arrow>
      <Arrow onClick={ incStep } data-testid={ 'down arrow' }>{ "⬇" }</Arrow>
    </ArrowsWrapper>
  </CarouselWrapper>;
}

export default StepsCarousel
