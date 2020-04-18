import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { selectCurrentStepTimers } from "../../redux/selectors/cookingSession.selectors";
import React from "react";
import { StepTimers } from "./StepTimers";

const StepTimersContainer = () => {
  const timers = useSelector((state: RootState) => selectCurrentStepTimers(state))
  return <StepTimers timers={ timers }/>
}
export default StepTimersContainer;
