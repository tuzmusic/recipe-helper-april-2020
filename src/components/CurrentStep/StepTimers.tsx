import { TimerContainer } from "../Timer/Timer";
import React from "react";
import { CookingTimer } from "../../models/Models";
import { connect } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { selectCurrentStepTimers } from "../../redux/selectors/cookingSession.selectors";
import { CenterFlexColumn } from "../UtilityComponents";

type Props = { timers: CookingTimer[] }

const StepTimers = ({ timers }: Props) =>
  <CenterFlexColumn bordered padding>
    <h3>Timers:</h3>
    { timers.map((t, i) => <TimerContainer key={ i } timer={ t }/>) }
  </CenterFlexColumn>

const selectProps = (state: RootState) => ({ timers: selectCurrentStepTimers(state) })
const StepTimersContainer = connect(selectProps)(StepTimers)

export default StepTimersContainer
