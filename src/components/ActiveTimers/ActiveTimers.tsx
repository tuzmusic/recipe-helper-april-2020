import { CookingTimer, StepTimer } from "../../models/Models";
import React from "react";
import { CenterFlexColumn } from "../UtilityComponents";
import StepTimerComponent from "../Timer/StepTimer";

type Props = {
  timers: StepTimer[],
  clearTimer: (t: CookingTimer) => void
}

export const ActiveTimers = ({ timers, clearTimer }: Props) =>
  <CenterFlexColumn bordered padding> {
    timers.length ? timers.map((timer, i) =>
      <StepTimerComponent timer={ timer } key={ i }/>
    ) : "No timers."
  } </CenterFlexColumn>;
