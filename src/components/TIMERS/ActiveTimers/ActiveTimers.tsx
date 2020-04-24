import { StepTimer } from "../../../models/Models";
import React from "react";
import { CenterFlexColumn } from "../../UtilityComponents";
import StepTimerComponent from "../StepTimers/StepTimer";

type Props = {
  timers: StepTimer[],
}

export const ActiveTimers = ({ timers }: Props) =>
  <CenterFlexColumn padding> {
    timers.length ? timers.map((timer, i) =>
      <StepTimerComponent timer={ timer } key={ i }/>
    ) : "No timers."
  } </CenterFlexColumn>;
