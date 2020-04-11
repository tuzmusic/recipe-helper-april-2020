import CookingStepContainer from "../CookingStep/CookingStep";
import React from "react";
import styled from "@emotion/styled";
import { Instruction } from "../../models/Models";
import { ClickHandler } from "../../types/utility.types";
import { CenterFlexRow } from "../UtilityComponents";

// const CarouselWrapper = styled(CenterFlexRow)({})

const CarouselWrapper = ({ children }: any) =>
  <CenterFlexRow bordered padding children={ children }/>

const Arrow = styled(CenterFlexRow)({
  width: '100px',
  height: '60px',
  fontSize: '50px',
  borderRadius: '200%',
  fontWeight: 'bold',
  color: 'grey',
  userSelect: 'none',
  background: 'lightblue',
})

const StepsWrapper = styled(CenterFlexRow)({
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
