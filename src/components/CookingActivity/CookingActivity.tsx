import { SimpleBorderedContainer } from "../UtilityComponents";
import { ActiveTimersContainer } from "../ActiveTimers/ActiveTimersContainer";
import React from "react";
import { connect } from "react-redux";
import CurrentStepContainer from "../CurrentStep/CurrentStep";

const CookingActivity = () => {
  return <SimpleBorderedContainer style={ { padding: 0 } }>
    <ActiveTimersContainer/>
    <CurrentStepContainer/>
  </SimpleBorderedContainer>;
};

const CookingActivityContainer = connect(
  // (state: RootState) => state.cookingSession
)(CookingActivity);

export default CookingActivityContainer;
