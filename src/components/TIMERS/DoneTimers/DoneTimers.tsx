import StepTimerContainer from "../StepTimers/StepTimer";
import React from "react";
import { StepTimer } from "../../../models/Models";
import { CenterFlexColumn } from "../../UtilityComponents";

type Props = { timers: StepTimer[] }

export const StepTimers = ({ timers }: Props) =>
  <CenterFlexColumn bordered padding> {
    timers.map((t, i) =>
      <StepTimerContainer key={ i } timer={ t }/>
    )
  }  </CenterFlexColumn>


