import CookingStepContainer from "../CookingStep/CookingStep";
import React from "react";
import styled from "@emotion/styled";
import { Instruction } from "../../models/Models";
import { ClickHandler } from "../../types/utility.types";

export const CenterFlex = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
})
export const CenterFlexColumn = styled(CenterFlex)({ flexDirection: 'column' })
const CarouselWrapper = styled(CenterFlex)({})

const Arrow = styled(CenterFlex)({
  width: '100px',
  height: '60px',
  fontSize: '50px',
  borderRadius: '200%',
  fontWeight: 'bold',
  color: 'grey',
  userSelect: 'none',
  background: 'lightblue',
})

const StepsWrapper = styled(CenterFlex)({
  width: '100%',
  height: '100px',
  margin: '10px',
  overflow: 'hidden'
})

type Props = {
  steps: Instruction[]
  incStep: ClickHandler
  decStep: ClickHandler
}

const StepsCarousel = ({ steps, incStep, decStep }: Props) =>
  <CarouselWrapper>
    <Arrow onClick={ incStep }>{ "←" }</Arrow>
    <StepsWrapper>{
      steps.map((step, i) =>
        <CookingStepContainer step={ step } key={ i }/>
      )
    }</StepsWrapper>
    <Arrow onClick={ decStep }>{ "→" }</Arrow>
  </CarouselWrapper>

export default StepsCarousel
