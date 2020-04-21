import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getDingingTimers } from "../../redux/selectors/cookingSession.selectors";
import React from "react";
import DoneTimer from "../TIMERS/DoneTimer/DoneTimer";

const DoneTimersContainer = () => {
  const timers = useSelector((state: RootState) => getDingingTimers(state))
  return <>{ timers.map(timer => <DoneTimer timer={ timer }/>) }</>
}
export default DoneTimersContainer;
