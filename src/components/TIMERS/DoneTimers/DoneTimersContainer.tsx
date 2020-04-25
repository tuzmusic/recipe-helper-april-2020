import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getDoneTimers } from "../../../redux/selectors/timers.selectors";
import React from "react";
import DoneTimer from "./DoneTimer";

const DoneTimersContainer = () => {
  const timers = useSelector((state: RootState) => getDoneTimers(state))
  return <>{ timers.map((timer, i) => <DoneTimer timer={ timer } key={ i }/>) }</>
}
export default DoneTimersContainer;
