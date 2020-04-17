import StepTimerComponent from "../Timer/StepTimer";
import React from "react";
import { CookingTimer } from "../../models/Models";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { selectCurrentStepTimers } from "../../redux/selectors/cookingSession.selectors";
import { CenterFlexColumn } from "../UtilityComponents";
import { startTimer } from "../../redux/cookingSessionSlice";

type Props = { timers: CookingTimer[], startTimer: Function }

const StepTimers = ({ timers, startTimer }: Props) =>
  <CenterFlexColumn bordered padding>
    { timers.map((t, i) =>
      <StepTimerComponent key={ i } timer={ t } startTimer={ startTimer.bind(null, t) }/>
    ) }
  </CenterFlexColumn>

const selectProps = (state: RootState) => ({ timers: selectCurrentStepTimers(state) })
const StepTimersContainer = connect(selectProps, { startTimer })(StepTimers)

export default StepTimersContainer
