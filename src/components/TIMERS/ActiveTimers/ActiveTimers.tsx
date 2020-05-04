import React from "react";
import { CenterFlexRow } from "../../UtilityComponents";
import StepTimerComponent from "../StepTimers/StepTimer";
import { AppStepTimer } from "../../../redux/state/stateMap";

type Props = {
  timers: AppStepTimer[],
}

export const ActiveTimers = ({ timers }: Props) =>
  <CenterFlexRow padding data-testid={ 'active-timers-container' }> {
    timers.map(timer =>
      <StepTimerComponent timer={ timer } key={ timer.id }/>
    )
  } </CenterFlexRow>;
