import StepTimerComponent from "../Timer/StepTimer";
import React from "react";
import { StepTimer } from "../../models/Models";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { selectCurrentStepTimers } from "../../redux/selectors/cookingSession.selectors";
import { CenterFlexColumn } from "../UtilityComponents";

type Props = { timers: StepTimer[] }

const StepTimers = ({ timers }: Props) =>
  <CenterFlexColumn bordered padding> {
    timers.map((t, i) =>
      <StepTimerComponent key={ i } timer={ t }/>
    )
  }  </CenterFlexColumn>

const selectProps = (state: RootState) => ({ timers: selectCurrentStepTimers(state) })
const StepTimersContainer = connect(selectProps)(StepTimers)

export default StepTimersContainer
