import React from "react";
import { CenterFlexColumn } from "../../UtilityComponents";
import StepTimerComponent from "../StepTimers/StepTimer";
import { AppStepTimer } from "../../../redux/state/stateMap";

type Props = {
  timers: AppStepTimer[],
}

export const ActiveTimers = ({ timers }: Props) =>
  <CenterFlexColumn padding data-testid={ 'active-timers-container' }> {
    timers.map((timer, i) =>
      <StepTimerComponent timer={ timer } key={ i }/>
    )
  } </CenterFlexColumn>;
