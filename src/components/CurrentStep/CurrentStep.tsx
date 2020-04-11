import React from 'react'
import { connect } from "react-redux";
import StepTimersContainer from "./StepTimers";
import StepsCarouselContainer from "../StepsCarousel/StepsCarouselContainer";
import styled from "@emotion/styled";
import { CenterFlexColumn, CenterFlexRow } from "../UtilityComponents";
import { ActiveTimersContainer } from "../ActiveTimers/ActiveTimersContainer";

const CurrentStepWrapper = styled(CenterFlexColumn)({
  width: '100%'
})

const CarouselWrapper = styled(CenterFlexRow)({
  // height: '100%',
  width: '100%'
})

const TimersWrapper = styled(CenterFlexRow)({
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
})

const CurrentStep = () =>
  <CurrentStepWrapper>
    
    <CarouselWrapper>
      <StepsCarouselContainer/>
    </CarouselWrapper>
    
    <TimersWrapper bordered>
      <StepTimersContainer/>
      <ActiveTimersContainer/>
    </TimersWrapper>
  </CurrentStepWrapper>

const CurrentStepContainer = connect()(CurrentStep);

export default CurrentStepContainer
