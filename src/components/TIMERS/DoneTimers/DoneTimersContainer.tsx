import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getDoneTimers } from "../../../redux/selectors/cookingSession.selectors";
import React from "react";
import DoneTimer from "./DoneTimer";

const DoneTimersContainer = () => {
  const timers = useSelector((state: RootState) => getDoneTimers(state))
  return <>{ timers.map(timer => <DoneTimer timer={ timer }/>) }</>
}
export default DoneTimersContainer;
