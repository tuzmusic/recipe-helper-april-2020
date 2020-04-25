import StepTimerContainer from "./StepTimer";
import React from "react";
import { CenterFlexColumn } from "../../UtilityComponents";
import { AppStepTimer } from "../../../redux/state/stateMap";

type Props = { timers: AppStepTimer[] }

export const StepTimers = ({ timers }: Props) =>
  <CenterFlexColumn padding> {
    timers.map((t, i) =>
      <StepTimerContainer key={ i } timer={ t }/>
    )
  }  </CenterFlexColumn>


