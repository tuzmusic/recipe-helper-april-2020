import { connect } from "react-redux";
import { startTimer } from "../../redux/cookingSessionSlice";
import { CookingTimer } from "../../models/Models";
import { TimerAction } from "../../types/utility.types";
import React from "react";

const Timer = ({ timer, startTimer }: { timer: CookingTimer, startTimer: TimerAction }) => (
  <button onClick={ () => startTimer(timer) }>Start "{ timer.label }"</button>
)
export const TimerContainer = connect(
  null,
  { startTimer }
)(Timer)
