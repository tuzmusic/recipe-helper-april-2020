import { CookingTimer } from "../../models/Models";
import React from "react";
import { CenterFlexColumn } from "../UtilityComponents";
import StepTimerComponent from "../Timer/StepTimer";

export const ActiveTimers = ({ timers, clearTimer }: { timers: CookingTimer[], clearTimer: (t: CookingTimer) => void }) => {
  return <CenterFlexColumn bordered padding>
    { !timers.length ? "No timers." : timers.map((timer, i) =>
      <StepTimerComponent timer={ timer } key={ i }/>
    ) }
  </CenterFlexColumn>
};
