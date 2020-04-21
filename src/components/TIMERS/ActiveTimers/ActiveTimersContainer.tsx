import React from 'react'
import { connect } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { ActiveTimers } from "./ActiveTimers";
import { getActiveTimers } from "../../../redux/selectors/cookingSession.selectors";

const ActiveTimersContainer = connect(
  (state: RootState) => ({ timers: getActiveTimers(state) })
)(ActiveTimers)

export default ActiveTimersContainer
