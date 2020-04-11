import React from 'react'
import { connect } from "react-redux";
import StepTimersContainer from "./StepTimers";
import StepsCarouselContainer from "../StepsCarousel/StepsCarouselContainer";
import styled from "@emotion/styled";
import { CenterFlexRow } from "../UtilityComponents";

const CurrentStepWrapper = styled.div({
  margin: '10px'
})

const CurrentStep = () =>
  <CurrentStepWrapper>
    <StepsCarouselContainer/>
    <CenterFlexRow bordered vMargin style={ { alignItems: 'flex-start' } }>
      <CenterFlexRow bordered fullWidth margin padding fullHeight>
        <StepTimersContainer/>
      </CenterFlexRow>
      <CenterFlexRow bordered padding margin fullWidth>
        <div>
          <h3>Ingredients</h3>
        </div>
      </CenterFlexRow>
    </CenterFlexRow>
  </CurrentStepWrapper>

const CurrentStepContainer = connect()(CurrentStep);

export default CurrentStepContainer
