import { ActiveTimersContainer } from "../ActiveTimers/ActiveTimersContainer";
import React from "react";
import { connect } from "react-redux";
import CurrentStepContainer from "../CurrentStep/CurrentStep";
import styled from "@emotion/styled";

const ActivityWrapper = styled('div')({
  border: 'solid black thin',
  display: 'flex'
});
const StepsWrapper = styled('div')({
  height: '300px',
  width: '80%',
})
const TimersWrapper = styled('div')({})
const CookingActivity = () =>
  <ActivityWrapper>
    <StepsWrapper>
      <CurrentStepContainer/>
    </StepsWrapper>
    <TimersWrapper>
      <ActiveTimersContainer/>
    </TimersWrapper>
  </ActivityWrapper>;

const CookingActivityContainer = connect(
  // (state: RootState) => state.cookingSession
)(CookingActivity);

export default CookingActivityContainer;
