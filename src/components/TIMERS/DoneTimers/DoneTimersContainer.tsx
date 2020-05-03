import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getDoneTimers } from "../../../redux/selectors/timers.selectors";
import React from "react";
import DoneTimer from "./DoneTimer";
import { CenterFlexColumn } from "../../UtilityComponents";
import styled from "@emotion/styled";

const DoneTimersWrapper = styled(CenterFlexColumn)({})

const DoneTimersContainer = () => {
  const timers = useSelector((state: RootState) => getDoneTimers(state))
  
  return (
    <DoneTimersWrapper fullWidth>
      { timers.map((timer, i) => <DoneTimer timer={ timer } key={ i }/>) }
    </DoneTimersWrapper>
  )
}
export default DoneTimersContainer;
