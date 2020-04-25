import StepTimerContainer from "../StepTimers/StepTimer";
import React from "react";
import { CenterFlexColumn } from "../../UtilityComponents";
import { AppStepTimer } from "../../../redux/state/stateMap";

type Props = { timers: AppStepTimer[] }

export const StepTimers = ({ timers }: Props) =>
  <CenterFlexColumn bordered padding> {
    timers.map((t, i) =>
      <StepTimerContainer key={ i } timer={ t }/>
    )
  }  </CenterFlexColumn>


