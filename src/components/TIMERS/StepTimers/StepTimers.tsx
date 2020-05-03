import StepTimerContainer from "./StepTimer";
import React from "react";
import { CenterFlexRow } from "../../UtilityComponents";
import { AppStepTimer, CookingTimerState } from "../../../redux/state/stateMap";

type Props = { timers: AppStepTimer[] }

const placeHolderTimer: AppStepTimer = {
  state: CookingTimerState.Pending,
  id: -1, durationSec: 0,
  label: "placeholder", stepIndex: 10000
};

// to keep the height of the timer section when there are no timers,
// add a hidden, zero-width timer to the container.
const PlaceholderTimer = () =>
  <div style={ { visibility: 'hidden', width: 0 } }>
    <StepTimerContainer timer={ placeHolderTimer }/>
  </div>

export const StepTimers = ({ timers }: Props) =>
  <CenterFlexRow padding data-testid={ 'pending-timers-container' }>
    <PlaceholderTimer/>
    { timers.map((t, i) => <StepTimerContainer key={ i } timer={ t }/>) }
  </CenterFlexRow>


