import React from "react";
import { CenterFlexRow } from "../../UtilityComponents";
import StepTimerComponent from "../StepTimers/StepTimer";
import { AppStepTimer } from "../../../redux/state/stateMap";

type Props = {
  timers: AppStepTimer[],
}

export const ActiveTimers = ({ timers }: Props) =>
  <CenterFlexRow padding data-testid={ 'active-timers-container' }> {
    timers.map((timer, i) =>
      <StepTimerComponent timer={ timer } key={ i }/>
    )
  } </CenterFlexRow>;
