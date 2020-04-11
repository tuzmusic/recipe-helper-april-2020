import React from "react";
import { connect } from "react-redux";
import CurrentStepContainer from "../CurrentStep/CurrentStep";
import styled from "@emotion/styled";
import { CenterFlexRow } from "../UtilityComponents";

const ActivityWrapper = styled(CenterFlexRow)({ width: '100%' });
const StepsWrapper = styled(CenterFlexRow)({
  height: '300px',
  width: '100%',
})
const TimersWrapper = styled('div')({})
const CookingActivity = () =>
  <div>
    {/*<StepsWrapper>*/ }
    <CurrentStepContainer/>
    {/*</StepsWrapper>*/ }
    {/*<TimersWrapper>*/ }
    {/*  <ActiveTimersContainer/>*/ }
    {/*</TimersWrapper>*/ }
  </div>;

const CookingActivityContainer = connect(
  // (state: RootState) => state.cookingSession
)(CookingActivity);

export default CookingActivityContainer;
