import CookingStepContainer from "../CookingStep/CookingStep";
import React from "react";
import styled from "@emotion/styled";
import { Instruction } from "../../models/Models";
import { ClickHandler } from "../../types/utility.types";

const CenterFlexRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
})

const CarouselWrapper = styled(CenterFlexRow)({
  border: 'solid red'
})

const Arrow = styled(CenterFlexRow)({
  border: 'solid blue',
  width: '10%',
  userSelect: 'none'
})

const StepsContainer = styled(CenterFlexRow)({
  width: '100%',
  height: '100px',
  overflow: 'hidden'
})

type Props = {
  steps: Instruction[]
  incStep: ClickHandler
  decStep: ClickHandler
}

const StepsCarousel = ({ steps, incStep, decStep }: Props) =>
  <CarouselWrapper>
    <Arrow onClick={ incStep }>{ "<" }</Arrow>
    
    <StepsContainer>{
      steps.map((step, i) =>
        <CookingStepContainer step={ step } key={ i }/>
      )
    }</StepsContainer>
    <Arrow onClick={ decStep }>{ ">" }</Arrow>
  </CarouselWrapper>

export default StepsCarousel
